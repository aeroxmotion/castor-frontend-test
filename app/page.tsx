"use client";

import { useFormState } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchOnSpotify } from "./actions";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TracksTab } from "./components/TracksTab";
import { SpotifySearchType } from "@/lib/types";
import { ArtistsTab } from "./components/ArtistsTab";
import { AlbumsTab } from "./components/AlbumsTab";

export default function Home() {
  const [searchResult, sendSearch] = useFormState(searchOnSpotify, null);

  console.log({ searchResult });

  return (
    <main className="flex flex-col items-center pt-16">
      <form className="w-full flex" action={sendSearch}>
        <Input
          type="search"
          name="search"
          className="grow"
          placeholder="Busca una canción, artista, álbum..."
        />

        <Button className="ml-2">Buscar</Button>
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
