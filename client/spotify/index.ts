"use server";

import ky from "ky";

import type {
  SpotifyID,
  SpotifyAlbum,
  GetSpotifySearchParams,
  GetSpotifySearchResponse,
  GetSpotifyTokenParams,
  GetSpotifyTokenResponse,
  SpotifyArtist,
  SpotifyTrack,
} from "./types";
import { injectTokenHook } from "./hooks";

const spotifyAuthClient = ky.extend({
  prefixUrl: process.env.SPOTIFY_AUTH_API_BASE_URL,
});

const spotifyClient = ky.extend({
  prefixUrl: process.env.SPOTIFY_API_BASE_URL,
  hooks: {
    beforeRequest: [injectTokenHook],
  },
});

export async function getSpotifyToken(
  params: GetSpotifyTokenParams
): Promise<GetSpotifyTokenResponse> {
  const token = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  return spotifyAuthClient
    .post("api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${token}`,
      },
      body: new URLSearchParams({
        ...params,
        grant_type: "authorization_code",
      }).toString(),
    })
    .json();
}

export async function getSpotifySearch(
  params: GetSpotifySearchParams
): Promise<GetSpotifySearchResponse> {
  return spotifyClient
    .get("search", {
      searchParams: {
        ...params,
        type: params.type.join(),
      },
    })
    .json();
}

export async function getSpotifyAlbum(
  albumID: SpotifyID
): Promise<SpotifyAlbum> {
  return spotifyClient.get(`albums/${encodeURIComponent(albumID)}`).json();
}

export async function checkSpotifyUserSavedAlbum(
  albumID: SpotifyID
): Promise<boolean> {
  const result = await spotifyClient
    .get("me/albums/contains", { searchParams: { ids: albumID } })
    .json<boolean[]>();

  return result[0];
}

export async function saveSpotifyUserAlbum(albumID: SpotifyID): Promise<any> {
  return spotifyClient.put("me/albums", { json: { ids: [albumID] } }).json();
}

export async function removeSpotifyUserSavedAlbum(
  albumID: SpotifyID
): Promise<any> {
  return spotifyClient.delete("me/albums", { json: { ids: [albumID] } }).json();
}

export async function getSpotifyArtist(
  artistID: SpotifyID
): Promise<SpotifyArtist> {
  return spotifyClient.get(`artists/${encodeURIComponent(artistID)}`).json();
}

export async function getSpotifyTrack(
  trackID: SpotifyID
): Promise<SpotifyTrack> {
  return spotifyClient.get(`tracks/${encodeURIComponent(trackID)}`).json();
}

export async function checkSpotifyUserSavedTrack(
  trackID: SpotifyID
): Promise<boolean> {
  const result = await spotifyClient
    .get("me/tracks/contains", { searchParams: { ids: trackID } })
    .json<boolean[]>();

  return result[0];
}

export async function saveSpotifyUserTrack(trackID: SpotifyID): Promise<any> {
  return spotifyClient.put("me/tracks", { json: { ids: [trackID] } }).json();
}

export async function removeSpotifyUserSavedTrack(
  trackID: SpotifyID
): Promise<any> {
  return spotifyClient.delete("me/tracks", { json: { ids: [trackID] } }).json();
}
