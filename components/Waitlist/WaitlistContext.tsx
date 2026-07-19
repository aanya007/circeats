"use client";

import { createContext, useCallback, useContext, useState } from "react";
import WaitlistModal from "./WaitlistModal";

const WaitlistContext = createContext<{ open: () => void }>({
  open: () => {},
});

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <WaitlistContext.Provider value={{ open }}>
      {children}
      {isOpen && <WaitlistModal onClose={close} />}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  return useContext(WaitlistContext);
}
