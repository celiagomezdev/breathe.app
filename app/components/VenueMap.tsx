import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import type { Map as MaplibreMap } from "maplibre-gl";
import type { Venue } from "../helpers/supabase.server";

const BERLIN: [number, number] = [13.405, 52.52];
const STYLE_URL = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

const MARKER_COLORS: Record<Venue["smokingType"], string> = {
  nonsmo: "var(--color-nonsmo)",
  sepnonsmo: "var(--color-sepnonsmo)",
  sepsmo: "var(--color-sepsmo)",
};

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

    import("maplibre-gl").then((maplibregl) => {
      const map = createMap(maplibregl, el, venues, onSelect);
      cleanup = () => map.remove();
    });

    return () => cleanup?.();
  }, []);

  return <div ref={containerRef} className="h-full w-full isolate" />;
}

function createMap(
  maplibregl: typeof import("maplibre-gl"),
  el: HTMLDivElement,
  venues: Venue[],
  onSelect: (v: Venue) => void,
): MaplibreMap {
  const map = new maplibregl.Map({ container: el, style: STYLE_URL, center: BERLIN, zoom: 12 });

  venues.forEach((venue) => {
    const markerEl = makeMarkerEl(MARKER_COLORS[venue.smokingType]);
    markerEl.addEventListener("click", () => onSelect(venue));
    new maplibregl.Marker({ element: markerEl, anchor: "center" })
      .setLngLat([venue.longitude, venue.latitude])
      .addTo(map);
  });

  return map;
}

function makeMarkerEl(color: string): HTMLElement {
  const el = document.createElement("div");
  el.style.cursor = "pointer";
  el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
    <circle cx="9" cy="9" r="7" fill="${color}" stroke="white" stroke-width="2.5"/>
  </svg>`;
  return el;
}
