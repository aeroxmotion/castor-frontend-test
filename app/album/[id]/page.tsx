import Image from "next/image";

import { getSpotifyAlbum } from "@/client/spotify";
import { SpotifyID } from "@/client/spotify/types";
import { GoBackButton } from "@/app/_components/GoBackButton";

interface AlbumDetailProps {
  params: { id: SpotifyID };
}

export default async function AlbumDetail({ params }: AlbumDetailProps) {
  const album = await getSpotifyAlbum(params.id);

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

          <p className="mb-8">© {album.release_date.split("-")[0]}</p>
        </div>
      </main>
    </div>
  );
}
