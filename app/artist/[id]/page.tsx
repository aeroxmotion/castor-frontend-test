import Image from "next/image";

import { SpotifyID } from "@/client/spotify/types";
import { getSpotifyArtist } from "@/client/spotify";
import { GoBackButton } from "@/app/_components/GoBackButton";

interface ArtistDetailProps {
  params: { id: SpotifyID };
}

export default async function ArtistDetail({ params }: ArtistDetailProps) {
  const artist = await getSpotifyArtist(params.id);

  return (
    <div className="pt-16">
      <GoBackButton />

      <main className="flex flex-row mb-8">
        <Image
          src={artist.images[0].url}
          width={300}
          height={300}
          alt={artist.name}
        />

        <div className="pl-8">
          <h1 className="text-4xl font-extrabold mb-2">{artist.name}</h1>

          <p className="mb-4">
            {artist.followers.total} <strong>seguidores</strong>
          </p>

          <p>
            <strong>Popularidad:</strong> {artist.popularity}%
          </p>
        </div>
      </main>
    </div>
  );
}
