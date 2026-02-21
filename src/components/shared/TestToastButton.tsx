"use client";

import { useToasts } from "@/components/shared/ToastProvider";

import { ToastCore } from "@/types";

export function TestToastButton() {
  const { notify } = useToasts();

  const Toast: ToastCore = {
    type: "success",
    heading: "Yeehaw!",
    body: `Excellent shid pardner`,
    dismissable: true,
    fullScreen: false,
    emoji: "💩",
  };

  return <button onClick={() => notify(Toast)}>Test</button>;
}
