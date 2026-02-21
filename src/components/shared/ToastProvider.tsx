"use client";

import { createContext, useContext, useState } from "react";

import { StatefulToast, ToastCore } from "@/types";

type Props = {
  children: React.ReactNode;
};

type ToastContextType = {
  toast: StatefulToast;
  notify: (Toast: ToastCore) => void;
  dismiss: () => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const DefaultToast: StatefulToast = {
  type: "info",
  dismissed: true,
  dismissable: true,
  heading: "",
};

export function ToastProvider({ children }: Props) {
  const [toast, setToast] = useState<StatefulToast>(DefaultToast);

  function dismiss() {
    setToast((t) => ({ ...t, dismissed: true }));
  }

  function notify(toast: ToastCore) {
    setToast({ fullScreen: false, ...toast, dismissed: false });
  }

  return (
    <ToastContext.Provider value={{ toast, notify, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToasts() {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToasts must be called from a child of ToastProvider");
  }

  return context;
}
