"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useHouseMap } from "./HouseMapProvider";
import { isImmersiveRoute } from "@/lib/immersive-routes";

export default function ImmersiveNav() {
  const pathname = usePathname();
  const { openMap } = useHouseMap();
  const btnRef = useRef(null);
  const isLobby = pathname === "/";

  // M key shortcut — open map from anywhere in the room
  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === "m" || e.key === "M") && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = document.activeElement?.tagName;
        const editable = document.activeElement?.isContentEditable;
        if (tag !== "INPUT" && tag !== "TEXTAREA" && !editable) {
          openMap(btnRef.current);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMap]);

  if (!isImmersiveRoute(pathname)) return null;

  const cls = [
    "immersive-nav",
    isLobby && "immersive-nav--lobby",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={cls} aria-label="House navigation">
      <Link href="/" className="immersive-nav__mark" aria-label="Return to the Lobby">
        <Image src="/home-icon.png" alt="HOME" width={28} height={28} priority />
      </Link>

      {!isLobby && (
        <Link href="/" className="immersive-nav__return">
          Return to Lobby
        </Link>
      )}

      <button
        ref={btnRef}
        type="button"
        className="immersive-nav__map-btn"
        onClick={() => openMap(btnRef.current)}
        aria-label="Open House Map"
        aria-haspopup="dialog"
      >
        House Map
      </button>
    </nav>
  );
}
