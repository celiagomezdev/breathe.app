import type { Route } from "./+types/home";
import { getVenues } from "../lib/supabase.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "breathe.app" },
    { name: "description", content: "Smoke-free bars in Berlin." },
  ];
}

export async function loader() {
  const venues = await getVenues();
  return { venues };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { venues } = loaderData;

  return (
    <div className="p-5">
      <p className="text-neutral-400 text-sm">{venues.length} bars loaded.</p>
    </div>
  );
}
