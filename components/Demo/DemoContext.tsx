"use client";

import { createContext, useCallback, useContext, useState } from "react";
import DemoModal from "./DemoModal";

const DemoContext = createContext<{ open: () => void }>({
  open: () => {},
});

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <DemoContext.Provider value={{ open }}>
      {children}
      {isOpen && <DemoModal onClose={close} />}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  return useContext(DemoContext);
}
