"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function TrackDetailError() {
  const router = useRouter();

  const onGoBackClick = () => {
    router.back();
  };

  return (
    <main className="pt-32 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-4">Error al cargar</h1>

      <p className="mb-8">
        Ocurrió un error al cargar la información de la canción.
      </p>

      <Button onClick={onGoBackClick}>Regresar</Button>
    </main>
  );
}
