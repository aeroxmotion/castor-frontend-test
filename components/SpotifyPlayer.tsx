"use client";

import type { IframeHTMLAttributes, FC } from "react";

interface SpotifyPlayerProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  path: string;
}

export const SpotifyPlayer: FC<SpotifyPlayerProps> = ({
  path,
  allow = "encrypted-media",
  ...props
}) => {
  return (
    <iframe
      title="Spotify Web Player"
      src={`https://open.spotify.com/embed${path}`}
      allow={allow}
      {...props}
    />
  );
};
