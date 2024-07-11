import { Button } from "@/components/ui/button";

import { startSpotifyLogin } from "./actions";

export default function Login() {
  return (
    <main className="flex flex-col text-center min-h-screen justify-center items-center">
      <h1 className="mb-4 scroll-m-20 text-3xl font-extrabold tracking-tight">
        Inicia sesión
      </h1>

      <p className="mb-16">
        Antes de continuar, inicia sesión en tu cuenta de Spotify.
      </p>

      <form action={startSpotifyLogin}>
        <Button className="font-bold" size="lg">
          Iniciar sesión aquí
        </Button>
      </form>
    </main>
  );
}
