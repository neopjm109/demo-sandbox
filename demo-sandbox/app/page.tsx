'use client';

import useLink from "@/hooks/useLink";
import { useEffect } from "react";

export default function Home() {
  const { onLink } = useLink();

  useEffect(() => {
    onLink("/home");
  }, []);

  return <></>;
}