import Image from "next/image";

import { SpotifyID } from "@/client/spotify/types";
import { SpotifyPlayer } from "@/components/SpotifyPlayer";
import { GoBackButton } from "@/app/_components/GoBackButton";
import { ToggleTrackButton } from "./_components/ToggleTrackButton";
import { checkSpotifyUserSavedTrack, getSpotifyTrack } from "@/client/spotify";

interface TrackDetailProps {
  params: { id: SpotifyID };
}

export default async function TrackDetail({ params }: TrackDetailProps) {
  const [track, isTrackSaved] = await Promise.all([
    getSpotifyTrack(params.id),
    checkSpotifyUserSavedTrack(params.id),
  ]);

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

          <p className="mb-4">© {track.album.release_date.split("-")[0]}</p>

          <div className="mb-8">
            <ToggleTrackButton
              trackID={params.id}
              isInitiallySaved={isTrackSaved}
            />
          </div>

          <SpotifyPlayer path={`/track/${params.id}`} width={400} height={80} />
        </div>
      </main>
    </div>
  );
}
