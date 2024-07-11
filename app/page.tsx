"use client";

import { useFormState } from "react-dom";

import { searchOnSpotify } from "./actions";
import { Input } from "@/components/ui/input";
import { TracksTab } from "./_components/TracksTab";
import { AlbumsTab } from "./_components/AlbumsTab";
import { ArtistsTab } from "./_components/ArtistsTab";
import { SearchButton } from "./_components/SearchButton";
import { SpotifySearchType } from "@/client/spotify/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [searchResult, sendSearch] = useFormState(searchOnSpotify, null);

  return (
    <main className="flex flex-col items-center py-16">
      <form className="w-full flex" action={sendSearch}>
        <Input
          type="search"
          name="search"
          className="grow mr-2"
          placeholder="Busca una canción, artista, álbum..."
        />

        <SearchButton />
      </form>

      {searchResult && !("error" in searchResult) && (
        <Tabs className="w-full mt-4" defaultValue={SpotifySearchType.Track}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value={SpotifySearchType.Track}>Canciones</TabsTrigger>
            <TabsTrigger value={SpotifySearchType.Artist}>Artistas</TabsTrigger>
            <TabsTrigger value={SpotifySearchType.Album}>Álbumes</TabsTrigger>
          </TabsList>

          <TracksTab tracks={searchResult.tracks.items} />
          <ArtistsTab artists={searchResult.artists.items} />
          <AlbumsTab albums={searchResult.albums.items} />
        </Tabs>
      )}
    </main>
  );
}
