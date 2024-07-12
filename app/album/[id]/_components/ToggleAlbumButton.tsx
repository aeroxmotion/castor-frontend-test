"use client";

import { type FC } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { SpotifyID } from "@/client/spotify/types";
import { toggleSavedAlbumOnSpotify } from "../actions";

interface ToggleAlbumButtonProps {
  albumID: SpotifyID;
  isInitiallySaved: boolean;
}

export const ToggleAlbumButton: FC<ToggleAlbumButtonProps> = ({
  albumID,
  isInitiallySaved,
}) => {
  const [formState, toggleSavedAlbum] = useFormState(
    toggleSavedAlbumOnSpotify,
    {
      isSaved: isInitiallySaved,
    }
  );

  return (
    <form action={toggleSavedAlbum}>
      <input name="is_saved" type="hidden" value={Number(formState.isSaved)} />
      <input name="album_id" type="hidden" value={albumID} />

      <ToggleButton isSaved={formState.isSaved} />
    </form>
  );
};

const ToggleButton: FC<{ isSaved: boolean }> = ({ isSaved }) => {
  const { pending: isToggling } = useFormStatus();

  return (
    <Button loading={isToggling}>
      {isSaved ? "Quitar álbum" : "Guardar álbum"}
    </Button>
  );
};
