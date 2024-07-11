import Image from "next/image";
import { cookies } from "next/headers";

import { SpotifyID, SpotifyTrack } from "@/lib/types";
import { GoBackButton } from "@/app/_components/GoBackButton";
import { SpotifyPlayer } from "@/components/SpotifyPlayer";

interface TrackDetailProps {
  params: { id: SpotifyID };
}

async function getTrackDetail(trackID: SpotifyID): Promise<SpotifyTrack> {
  const response = await fetch(
    `${process.env.SPOTIFY_API_BASE_URL}/tracks/${encodeURIComponent(trackID)}`,
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

export default async function TrackDetail({ params }: TrackDetailProps) {
  const track = await getTrackDetail(params.id);

  return (
    <div className="pt-16">
      <GoBackButton />

      <main className="flex flex-row">
        <Image
          src={track.album.images[0].url}
          width={300}
          height={300}
          alt={track.name}
        />

        <div className="pl-8">
          <h1 className="text-4xl font-extrabold">{track.name}</h1>
          <p className="mb-4">
            {track.artists.map((artist) => artist.name).join(", ")}
          </p>

          <p>
            <strong>Álbum:</strong> {track.album.name}
          </p>

          <p className="mb-8">© {track.album.release_date.split("-")[0]}</p>

          <SpotifyPlayer path={`/track/${params.id}`} width={400} height={80} />
        </div>
      </main>
    </div>
  );
}
