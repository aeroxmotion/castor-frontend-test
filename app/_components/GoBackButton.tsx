"use client";

import { type FC } from "react";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

export const GoBackButton: FC = () => {
  const onGoBackClick = () => {
    history.back();
  };

  return (
    <Button variant="link" className="mb-8" onClick={onGoBackClick}>
      <ChevronLeftIcon />
      Regresar
    </Button>
  );
};
