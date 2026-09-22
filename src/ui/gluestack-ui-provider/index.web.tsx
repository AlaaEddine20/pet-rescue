"use client";
import { OverlayProvider } from "@gluestack-ui/core/overlay/creator";
import { ToastProvider } from "@gluestack-ui/core/toast/creator";
import React, { useEffect, useLayoutEffect } from "react";

export const useSafeLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function GluestackUIProvider({
  ...props
}: {
  children?: React.ReactNode;
}) {
  useSafeLayoutEffect(() => {
    const documentElement = document.documentElement;
    if (documentElement) {
      documentElement.classList.add("light");
      documentElement.style.colorScheme = "light";
    }
  }, []);

  return (
    <OverlayProvider>
      <ToastProvider>{props.children}</ToastProvider>
    </OverlayProvider>
  );
}
