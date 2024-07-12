"use server";

import {
  saveSpotifyUserTrack,
  removeSpotifyUserSavedTrack,
} from "@/client/spotify";

export async function toggleSavedTrackOnSpotify(
  _: any,
  formData: FormData
): Promise<{ isSaved: boolean; error?: string }> {
  const trackID = formData.get("track_id") as string;
  const isSaved = (formData.get("is_saved") as string) === "1";

  try {
    if (isSaved) {
      await removeSpotifyUserSavedTrack(trackID);
    } else {
      await saveSpotifyUserTrack(trackID);
    }

    return { isSaved: !isSaved };
  } catch (error: any) {
    console.log(
      "An error ocurred while triying to save the track:",
      await error.response.json(),
      String(error)
    );

    return { isSaved, error: String(error) };
  }
}
