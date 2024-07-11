import Image from "next/image";
import { cookies } from "next/headers";

import { SpotifyArtist, SpotifyID } from "@/lib/types";
import { GoBackButton } from "@/app/_components/GoBackButton";

interface ArtistDetailProps {
  params: { id: SpotifyID };
}

async function getAlbumDetail(artistID: SpotifyID): Promise<SpotifyArtist> {
  const response = await fetch(
    `${process.env.SPOTIFY_API_BASE_URL}/artists/${encodeURIComponent(
      artistID
    )}`,
    {
      headers: {
        Authorization: `Bearer ${cookies().get("SPOTIFY_TOKEN")?.value}`,
      },
    }
  );

  if (!response.ok) {
    console.log(await response.text());
    throw new Error("Invalid response");
  }

  return response.json();
}

export default async function ArtistDetail({ params }: ArtistDetailProps) {
  const artist = await getAlbumDetail(params.id);

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
