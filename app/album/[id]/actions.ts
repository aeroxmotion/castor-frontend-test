"use server";

import {
  saveSpotifyUserAlbum,
  removeSpotifyUserSavedAlbum,
} from "@/client/spotify";

export async function toggleSavedAlbumOnSpotify(
  _: any,
  formData: FormData
): Promise<{ isSaved: boolean; error?: string }> {
  const albumID = formData.get("album_id") as string;
  const isSaved = (formData.get("is_saved") as string) === "1";

  try {
    if (isSaved) {
      await removeSpotifyUserSavedAlbum(albumID);
    } else {
      await saveSpotifyUserAlbum(albumID);
    }

    return { isSaved: !isSaved };
  } catch (error: any) {
    console.log(
      "An error ocurred while triying to save the album:",
      await error.response.json(),
      String(error)
    );

    return { isSaved, error: String(error) };
  }
}
