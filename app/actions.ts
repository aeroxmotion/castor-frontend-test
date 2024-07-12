"use server";

import {
  SpotifySearchType,
  GetSpotifySearchResponse,
} from "@/client/spotify/types";
import { getSpotifySearch } from "@/client/spotify";

const SEARCH_TYPES = [
  SpotifySearchType.Album,
  SpotifySearchType.Artist,
  SpotifySearchType.Track,
];

export async function searchOnSpotify(
  _: any,
  formData: FormData
): Promise<GetSpotifySearchResponse | { error: any } | null> {
  try {
    return await getSpotifySearch({
      q: formData.get("search") as string,
      type: SEARCH_TYPES,
    });
  } catch (error: any) {
    console.log("Error while searching:", String(error));

    return { error: String(error) };
  }
}
