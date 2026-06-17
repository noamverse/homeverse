"use client";

import { createContext, useContext, useRef, useState } from "react";

const HouseMapCtx = createContext(null);

export function HouseMapProvider({ children }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  function openMap(trigger) {
    triggerRef.current = trigger ?? null;
    setOpen(true);
  }

  function closeMap() {
    setOpen(false);
    triggerRef.current?.focus();
    triggerRef.current = null;
  }

  return (
    <HouseMapCtx.Provider value={{ open, openMap, closeMap }}>
      {children}
    </HouseMapCtx.Provider>
  );
}

export function useHouseMap() {
  const ctx = useContext(HouseMapCtx);
  if (!ctx) throw new Error("useHouseMap must be inside HouseMapProvider");
  return ctx;
}
