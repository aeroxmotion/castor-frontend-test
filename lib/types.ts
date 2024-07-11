export type SpotifyID = string;

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

export interface SpotifyAPISearchResponse {
  tracks: { items: SpotifyTrack[] };
  artists: { items: SpotifyArtist[] };
  albums: { items: SpotifyAlbum[] };
}

export interface SpotifyAPIErrorResponse {
  error: string;
}
