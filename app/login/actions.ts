"use server";

import crypto from "node:crypto";

import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";

const LOGIN_SCOPES = [
  // Basics
  "user-read-private",
  "user-read-email",

  // Extras
  "user-library-read",
  "user-library-modify",
];

export async function startSpotifyLogin() {
  const state = crypto.randomBytes(60).toString("hex").slice(0, 16);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    scope: LOGIN_SCOPES.join(" "),
    redirect_uri: new URL("/callback", headers().get("origin")!).toString(),
    state,
  });

  cookies().set("SPOTIFY_AUTH_STATE", state);

  redirect(
    `${process.env.SPOTIFY_AUTH_API_BASE_URL}/authorize?${params.toString()}`
  );
}
