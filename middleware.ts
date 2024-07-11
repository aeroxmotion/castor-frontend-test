import type { NextRequest } from "next/server";
import { NextResponse, type MiddlewareConfig } from "next/server";

export function middleware({ cookies, url }: NextRequest) {
  const inLogin = url.includes("/login");
  const isLogged = !!cookies.get("SPOTIFY_TOKEN");

  let targetRedirection = "";

  if (isLogged && inLogin) {
    targetRedirection = "/";
  }

  if (!isLogged && !inLogin) {
    targetRedirection = "/login";
  }

  return targetRedirection
    ? NextResponse.redirect(new URL(targetRedirection, url))
    : NextResponse.next();
}

export const config: MiddlewareConfig = {
  // Ignore `_next` specific files and auth callback (Spotify API)
  matcher: ["/((?!_next|callback))"],
};
