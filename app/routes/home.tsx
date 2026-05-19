import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "breathe.app" },
    { name: "description", content: "Smoke-free bars in Berlin." },
  ];
}

export default function Home() {
  return (
    <div className="p-5">
      <p className="text-neutral-400 text-sm">Berlin map coming soon.</p>
    </div>
  );
}
