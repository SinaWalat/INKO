"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * A single, full-screen white curtain overlay.
 * We've restored this as per user preference, ensuring it covers the page
 * cleanly without showing the dark background.
 */
export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const curtain = overlayRef.current?.querySelector(".transition-curtain");
    if (curtain) {
      gsap.set(curtain, { y: "100%" });
    }
  }, []);

  return (
    <div
      id="page-transition-overlay"
      ref={overlayRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
    >
      <div
        className="transition-curtain absolute inset-0 will-change-transform"
        style={{ backgroundColor: "#ffffff" }}
      />
    </div>
  );
}
