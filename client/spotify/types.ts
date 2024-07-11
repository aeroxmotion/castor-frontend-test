export type SpotifyID = string;

export interface GetSpotifyTokenParams {
  code: string;
  redirect_uri: string;
}

export interface GetSpotifyTokenResponse {
  access_token: string;
}

export interface GetSpotifySearchParams {
  q: string;
  type: SpotifySearchType[];
}

export interface GetSpotifySearchResponse {
  tracks: { items: SpotifyTrack[] };
  artists: { items: SpotifyArtist[] };
  albums: { items: SpotifyAlbum[] };
}

export enum SpotifySearchType {
  Album = "album",
  Artist = "artist",
  Track = "track",
}

export interface SpotifyTrack {
  id: SpotifyID;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  popularity: number;
}

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyArtist {
  id: SpotifyID;
  name: string;
  genres: string[];
  images: SpotifyImage[];
  popularity: number;
  followers: {
    total: number;
  };
}

export interface SpotifyAlbum {
  id: SpotifyID;
  images: SpotifyImage[];
  name: string;
  artists: SpotifyArtist[];
  release_date: string;
  release_date_precision: string;
}
