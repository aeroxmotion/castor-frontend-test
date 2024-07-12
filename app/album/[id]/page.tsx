import Image from "next/image";

import { SpotifyID } from "@/client/spotify/types";
import { GoBackButton } from "@/app/_components/GoBackButton";
import { ToggleAlbumButton } from "./_components/ToggleAlbumButton";
import { checkSpotifyUserSavedAlbum, getSpotifyAlbum } from "@/client/spotify";

interface AlbumDetailProps {
  params: { id: SpotifyID };
}

export default async function AlbumDetail({ params }: AlbumDetailProps) {
  const [album, isAlbumSaved] = await Promise.all([
    getSpotifyAlbum(params.id),
    checkSpotifyUserSavedAlbum(params.id),
  ]);

  return (
    <div className="pt-16">
      <GoBackButton />

      <main className="flex flex-row mb-8">
        <Image
          src={album.images[0].url}
          width={300}
          height={300}
          alt={album.name}
        />

        <div className="pl-8">
          <h1 className="text-4xl font-extrabold">{album.name}</h1>

          <p className="mb-4">
            {album.artists.map((artist) => artist.name).join(", ")}
          </p>

          <p className="mb-4">© {album.release_date.split("-")[0]}</p>

          <ToggleAlbumButton
            albumID={params.id}
            isInitiallySaved={isAlbumSaved}
          />
        </div>
      </main>
    </div>
  );
}
