"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export const SearchButton = () => {
  const { pending } = useFormStatus();

  return <Button loading={pending}>Buscar</Button>;
};
