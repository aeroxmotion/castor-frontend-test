import { getSpotifyToken } from "@/client/spotify";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const state = cookies().get("SPOTIFY_AUTH_STATE")?.value;
  const { searchParams } = new URL(request.url);

  if (!state || state !== searchParams.get("state")) {
    return new Response("State mismatch");
  }

  cookies().delete("SPOTIFY_AUTH_STATE");

  const error = searchParams.get("error");

  if (error) {
    return new Response(`Auth error: ${error}`, { status: 403 });
  }

  try {
    const result = await getSpotifyToken({
      code: searchParams.get("code")!,
      redirect_uri: new URL("/callback", request.url).toString(),
    });

    cookies().set("SPOTIFY_TOKEN", result.access_token);

    return Response.redirect(new URL("/", request.url));
  } catch (error) {
    console.log("Error response:", error);

    return new Response("Invalid auth", { status: 500 });
  }
}
