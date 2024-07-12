"use server";

import { cookies } from "next/headers";
import { type BeforeRequestHook } from "ky";

export const injectTokenHook: BeforeRequestHook = (request) => {
  const nextRequest = request.clone();
  const token = cookies().get("SPOTIFY_TOKEN")!.value;

  nextRequest.headers.set("Authorization", `Bearer ${token}`);

  return nextRequest;
};
