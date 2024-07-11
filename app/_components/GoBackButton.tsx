"use client";

import { type FC } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

export const GoBackButton: FC = () => {
  const router = useRouter();

  const onGoBackClick = () => {
    router.back();
  };

  return (
    <Button variant="link" className="mb-8" onClick={onGoBackClick}>
      <ChevronLeftIcon />
      Regresar
    </Button>
  );
};
