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

  const form = new URLSearchParams({
    code: searchParams.get("code")!,
    grant_type: "authorization_code",
    redirect_uri: new URL("/callback", request.url).toString(),
  });

  const response = await fetch(
    `${process.env.SPOTIFY_AUTH_API_BASE_URL}/api/token`,
    {
      method: "POST",
      body: form.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      cache: "no-cache",
    }
  );

  if (!response.ok) {
    console.log(await response.json());

    return new Response("Invalid auth", { status: 500 });
  }

  const result = await response.json();

  cookies().set("SPOTIFY_TOKEN", result.access_token);

  return Response.redirect(new URL("/", request.url));
}
