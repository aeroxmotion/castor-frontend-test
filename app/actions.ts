"use server";

import { cookies } from "next/headers";

import {
  SpotifyAPIErrorResponse,
  SpotifyAPISearchResponse,
  SpotifySearchType,
} from "@/lib/types";

const SEARCH_TYPES = [
  SpotifySearchType.Album,
  SpotifySearchType.Artist,
  SpotifySearchType.Track,
];

export async function searchOnSpotify(
  _: any,
  formData: FormData
): Promise<SpotifyAPISearchResponse | SpotifyAPIErrorResponse | null> {
  const params = new URLSearchParams({
    q: formData.get("search") as string,
    type: SEARCH_TYPES.join(),
  });

  const response = await fetch(
    `${process.env.SPOTIFY_API_BASE_URL}/search?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${cookies().get("SPOTIFY_TOKEN")?.value}`,
      },
    }
  );

  if (!response.ok) {
    return { error: await response.text() };
  }

  return response.json();
}
