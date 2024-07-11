import Image from "next/image";
import { cookies } from "next/headers";

import { SpotifyAlbum, SpotifyID } from "@/lib/types";
import { GoBackButton } from "@/app/_components/GoBackButton";

interface AlbumDetailProps {
  params: { id: SpotifyID };
}

async function getAlbumDetail(albumID: SpotifyID): Promise<SpotifyAlbum> {
  const response = await fetch(
    `${process.env.SPOTIFY_API_BASE_URL}/albums/${encodeURIComponent(albumID)}`,
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

export default async function AlbumDetail({ params }: AlbumDetailProps) {
  const album = await getAlbumDetail(params.id);

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
