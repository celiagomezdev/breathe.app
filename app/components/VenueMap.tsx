import { lazy, Suspense, useEffect, useState } from "react";
import type { Venue } from "../lib/supabase.server";

const LeafletMap = lazy(() => import("./LeafletMap"));

export default function VenueMap({
  venues,
  onSelect,
}: {
  venues: Venue[];
  onSelect: (v: Venue) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="h-full w-full">
      {mounted && (
        <Suspense fallback={null}>
          <LeafletMap venues={venues} onSelect={onSelect} />
        </Suspense>
      )}
    </div>
  );
}
