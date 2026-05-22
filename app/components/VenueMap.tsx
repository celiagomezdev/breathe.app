import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import type { Venue } from "../lib/supabase.server";

const BERLIN: [number, number] = [52.52, 13.405];

export default function VenueMap({
  venues,
  onSelect,
}: {
  venues: Venue[];
  onSelect: (v: Venue) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-full w-full" />;

  return (
    <div className="h-full w-full">
      <MapContainer
        center={BERLIN}
        zoom={12}
        scrollWheelZoom
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        <MapSetup />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {venues.map((venue) => (
          <Marker
            key={venue.id}
            position={[venue.latitude, venue.longitude]}
            icon={makeIcon(MARKER_COLORS[venue.smokingType])}
            eventHandlers={{ click: () => onSelect(venue) }}
          />
        ))}
      </MapContainer>
    </div>
  );
}

function MapSetup() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    map.attributionControl.setPrefix("");
  }, [map]);
  return null;
}

function makeIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
      <circle cx="9" cy="9" r="7" fill="${color}" stroke="white" stroke-width="2.5"/>
    </svg>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

const MARKER_COLORS: Record<Venue["smokingType"], string> = {
  nonsmo: "var(--color-nonsmo)",
  sepnonsmo: "var(--color-sepnonsmo)",
  sepsmo: "var(--color-sepsmo)",
};
