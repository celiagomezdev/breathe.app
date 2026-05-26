import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import type LeafletLib from "leaflet";
import type { Map as LeafletMap } from "leaflet";
import type { Venue } from "../helpers/supabase.server";

const BERLIN: [number, number] = [52.52, 13.405];
const TILE_URL = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export default function VenueMap({
  venues,
  onSelect,
}: {
  venues: Venue[];
  onSelect: (v: Venue) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cleanup: (() => void) | undefined;

    import("leaflet").then(({ default: leaflet }) => {
      const map = createMap(leaflet, el, venues, onSelect);
      cleanup = () => map.remove();
    });

    return () => cleanup?.();
  }, []);

  return <div ref={containerRef} className="h-full w-full isolate" />;
}

function createMap(
  leaflet: typeof LeafletLib,
  el: HTMLDivElement,
  venues: Venue[],
  onSelect: (v: Venue) => void,
): LeafletMap {
  const map = leaflet.map(el, { center: BERLIN, zoom: 12, zoomControl: false, scrollWheelZoom: true });

  leaflet.tileLayer(TILE_URL, { attribution: ATTRIBUTION }).addTo(map);
  map.attributionControl.setPrefix("");
  map.invalidateSize();

  const icons = {
    nonsmo: makeIcon(leaflet, "var(--color-nonsmo)"),
    sepnonsmo: makeIcon(leaflet, "var(--color-sepnonsmo)"),
    sepsmo: makeIcon(leaflet, "var(--color-sepsmo)"),
  };

  venues.forEach((venue) => {
    leaflet.marker([venue.latitude, venue.longitude], { icon: icons[venue.smokingType] })
      .on("click", () => onSelect(venue))
      .addTo(map);
  });

  return map;
}

function makeIcon(leaflet: typeof LeafletLib, color: string) {
  return leaflet.divIcon({
    className: "",
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
      <circle cx="9" cy="9" r="7" fill="${color}" stroke="white" stroke-width="2.5"/>
    </svg>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}
