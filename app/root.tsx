import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex justify-center bg-neutral-100 min-h-screen">
        {/* Mobile frame: max 430px, fills screen on real devices */}
        <div className="w-full max-w-[430px] min-h-screen bg-white flex flex-col shadow-xl shadow-black/10 relative">
          {children}
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="px-5 pt-12 pb-4 border-b border-neutral-100">
      <span className="text-xl font-semibold tracking-tight text-neutral-900">
        breathe.app
      </span>
    </header>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <>
      <Header />
      <main className="flex-1 p-5">
        <h1 className="text-xl font-semibold mb-2">{message}</h1>
        <p className="text-neutral-500 text-sm">{details}</p>
        {stack && (
          <pre className="mt-4 text-xs bg-neutral-50 p-4 rounded-xl overflow-x-auto">
            <code>{stack}</code>
          </pre>
        )}
      </main>
    </>
  );
}
