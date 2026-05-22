import type { Venue } from "../lib/supabase.server";

const SMOKING_TYPE: Record<Venue["smokingType"], { label: string; className: string }> = {
  nonsmo: { label: "Smoke-free", className: "bg-blue-200 text-blue-700" },
  sepnonsmo: { label: "Non-smoking section", className: "bg-orange-200 text-orange-700" },
  sepsmo: { label: "Smoking area", className: "bg-yellow-200 text-yellow-700" },
};

export default function VenueSheet({
  venue,
  onClose,
}: {
  venue: Venue | null;
  onClose: () => void;
}) {
  return (
    <>
      {venue && (
        <div className="absolute inset-0 z-[1100]" onClick={onClose} />
      )}
      <div
        className={`absolute bottom-0 left-0 right-0 z-[1200] bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-in-out ${
          venue ? "translate-y-0 pointer-events-auto" : "translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex justify-center pt-3 pb-2 cursor-pointer" onClick={onClose}>
          <div className="w-10 h-1 rounded-full bg-neutral-200" />
        </div>
        {venue && (
          <div className="px-5 pt-1 pb-10">
            <p className="text-neutral-400 text-sm mb-0.5">{venue.neighbourhood}</p>
            <h2 className="text-xl font-semibold text-neutral-900 mb-1">{venue.name}</h2>
            <p className="text-neutral-500 text-sm mb-4">{venue.address}</p>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${SMOKING_TYPE[venue.smokingType].className}`}>
              {SMOKING_TYPE[venue.smokingType].label}
            </span>
          </div>
        )}
      </div>
    </>
  );
}
