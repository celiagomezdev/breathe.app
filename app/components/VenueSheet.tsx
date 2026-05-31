import { useEffect, useRef } from "react";
import type { Venue } from "../helpers/supabase.server";

const SMOKING_TYPE: Record<Venue["smokingType"], { label: string; subLabel?: string; className: string }> = {
  nonsmo: { label: "Smoke-free inside", className: "bg-nonsmo text-blue-700" },
  sepnonsmo: { label: "Closed non-smoking room", subLabel: "You may need to walk through smoking areas to reach the bar or toilets.", className: "bg-sepnonsmo text-orange-700" },
  sepsmo: { label: "Closed smoking room", subLabel: "Smoking is only allowed in a separate room, but smoke may still drift through when the door opens.", className: "bg-sepsmo text-yellow-700" },
};

export default function VenueSheet({
  venue,
  onClose,
}: {
  venue: Venue | null;
  onClose: () => void;
}) {
  const handleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (venue) {
      handleRef.current?.focus({ preventScroll: true });
    }
  }, [venue]);

  return (
    <>
      {venue && (
        <div
          className="absolute inset-0 z-sheet-backdrop"
          role="button"
          aria-label="Close venue details"
          tabIndex={0}
          onClick={onClose}
          onKeyDown={(e) => (e.key === "Enter" || e.key === "Escape") && onClose()}
        />
      )}
      <div
        className={`absolute bottom-0 left-0 right-0 z-sheet bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-in-out ${
          venue ? "translate-y-0 pointer-events-auto" : "translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex justify-center pt-3 pb-1">
          <button
            ref={handleRef}
            className="w-full flex justify-center py-2 focus:outline-none"
            aria-label="Close"
            onClick={onClose}
            onKeyDown={(e) => e.key === "Escape" && onClose()}
          >
            <div className="w-10 h-1 rounded-full bg-neutral-200" />
          </button>
        </div>
        {venue && (
          <div className="px-5 pt-1" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 2.5rem)" }}>
            <p className="text-neutral-400 text-sm mb-0.5">{venue.neighbourhood}</p>
            <h2 className="text-xl font-semibold text-neutral-900 mb-1">{venue.name}</h2>
            <p className="text-neutral-500 text-sm mb-4">{venue.address}</p>
            <div>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${SMOKING_TYPE[venue.smokingType].className}`}>
                {SMOKING_TYPE[venue.smokingType].label}
              </span>
              {SMOKING_TYPE[venue.smokingType].subLabel && (
                <p className="text-xs text-neutral-400 mt-2">
                  {SMOKING_TYPE[venue.smokingType].subLabel}
                </p>
              )}
            </div>
            <hr className="my-4 border-neutral-100" />
            <p className="text-xs text-neutral-400">Something incorrect? <a href="mailto:hello@breathe-app.com" className="underline">Let us know!</a></p>
          </div>
        )}
      </div>
    </>
  );
}
