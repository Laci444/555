import {
  isRouteErrorResponse,
  Links,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Header from "./layout/header";
import Footer from "./layout/footer";
import { ThemeProvider } from "./components/themeProvider";
import createAuthStore from "react-auth-kit/store/createAuthStore";
import AuthProvider from "react-auth-kit/AuthProvider";
import { Toaster } from "./components/ui/sonner";
import type { UserState } from "./types/auth";
import { refresh } from "./lib/authTokenRefresh";
import createRefresh from "react-auth-kit/refresh/createRefresh";

const base = import.meta.env.BASE_URL;

export const links: Route.LinksFunction = () => [
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "apple-touch-icon",
    href: base + "/apple-touch-icon.png",
    sizes: "180x180",
  },
  {
    rel: "icon",
    href: base + "/favicon-32x32.png",
    sizes: "32x32",
    type: "image/png",
  },
  {
    rel: "icon",
    href: base + "/favicon-16x16.png",
    sizes: "16x16",
    type: "image/png",
  },
  {
    rel: "manifest",
    href: base + "/site.webmanifest",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className="bg-background!">
      <head>
        <title>555</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/*
export function HydrateFallback() {
  return <p>Loading...</p>;
}
*/

export default function App() {
  const authStore = createAuthStore<UserState>("localstorage", {
    authName: "auth",
    refresh: createRefresh(refresh),
    //debug: true,
  });
  return (
    <ThemeProvider>
      <AuthProvider store={authStore}>
        <Header />
        <main className="flex-1 p-5 sm:px-20">
          <Outlet />
        </main>
        <Footer />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
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
    <main className="container p-4 pt-16 mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="overflow-x-auto p-4 w-full">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
