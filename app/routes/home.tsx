import { useState } from "react";
import type { Route } from "./+types/home";
import { getVenues, type Venue } from "../lib/supabase.server";
import VenueMap from "../components/VenueMap";
import VenueSheet from "../components/VenueSheet";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "breathe" },
    { name: "description", content: "Smoke-free bars in Berlin." },
  ];
}

export async function loader() {
  const venues = await getVenues();
  return { venues };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { venues } = loaderData;
  const [selected, setSelected] = useState<Venue | null>(null);

  return (
    <div className="flex-1 relative overflow-hidden">
      <VenueMap venues={venues} onSelect={setSelected} />
      <VenueSheet venue={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
