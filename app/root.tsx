import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import pickerStylesheetUrl from "./styles/picker.css";
import { getUser } from "./session.server";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: pickerStylesheetUrl },
    { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
  ];
};

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body className="flex h-full flex-col">
        <header className="flex items-center justify-between p-2 px-4 h-[6vh]">
          <h3 className="text-lg font-semibold"></h3>
          <nav>
            <div className="flex flex-row gap-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path fill="#333" d="M12 12a4 4 0 100-8 4 4 0 000 8z"></path>
                <path
                  fill="#333"
                  fillRule="evenodd"
                  d="M12 14c-3.333 0-10 1.667-10 5v1h20v-1c0-3.333-6.667-5-10-5zm-10-2c0-3.333 6.667-5 10-5s10 1.667 10 5v1h-20v-1zm20 2c0-2.667-4-4-10-4s-10 1.333-10 4v1h20v-1z"
                  clipRule="evenodd"
                ></path>
              </svg>

              <h3 className="text-lg font-semibold">Mick J.</h3>
            </div>
          </nav>
        </header>

        <div className="h-[94vh] flex flex-col">
        <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
