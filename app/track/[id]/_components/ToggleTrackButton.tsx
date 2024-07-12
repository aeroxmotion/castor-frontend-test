"use client";

import { type FC } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { SpotifyID } from "@/client/spotify/types";
import { toggleSavedTrackOnSpotify } from "../actions";

interface ToggleTrackButtonProps {
  trackID: SpotifyID;
  isInitiallySaved: boolean;
}

export const ToggleTrackButton: FC<ToggleTrackButtonProps> = ({
  trackID,
  isInitiallySaved,
}) => {
  const [formState, toggleSavedTrack] = useFormState(
    toggleSavedTrackOnSpotify,
    {
      isSaved: isInitiallySaved,
    }
  );

  return (
    <form action={toggleSavedTrack}>
      <input name="is_saved" type="hidden" value={Number(formState.isSaved)} />
      <input name="track_id" type="hidden" value={trackID} />

      <ToggleButton isSaved={formState.isSaved} />
    </form>
  );
};

const ToggleButton: FC<{ isSaved: boolean }> = ({ isSaved }) => {
  const { pending: isToggling } = useFormStatus();

  return (
    <Button loading={isToggling}>
      {isSaved ? "Quitar canción" : "Guardar canción"}
    </Button>
  );
};
