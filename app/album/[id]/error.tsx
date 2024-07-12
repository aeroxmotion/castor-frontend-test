"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function AlbumDetailError() {
  const router = useRouter();

  const onGoBackClick = () => {
    router.back();
  };

  return (
    <main className="pt-32 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-4">Error al cargar</h1>

      <p className="mb-8">
        Ocurrió un error al cargar la información del álbum.
      </p>

      <Button onClick={onGoBackClick}>Regresar</Button>
    </main>
  );
}
