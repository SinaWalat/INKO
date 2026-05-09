"use client";

import {
  createContext,
  useContext,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";

interface TransitionContextType {
  triggerTransition: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  triggerTransition: () => {},
});

export const usePageTransition = () => useContext(TransitionContext);

export default function TransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isAnimating = useRef(false);

  const triggerTransition = useCallback(
    (href: string) => {
      if (href === pathname || isAnimating.current) return;

      if (href.startsWith("#") || (href.startsWith("/#") && pathname === "/")) {
        const hash = href.replace("/", "");
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        return;
      }

      isAnimating.current = true;

      const overlay = document.getElementById("page-transition-overlay");
      const curtain = overlay?.querySelector(".transition-curtain");
      const pageContent = document.getElementById("page-content");

      if (!overlay || !curtain || !pageContent) {
        router.push(href);
        isAnimating.current = false;
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
        },
      });

      // ── EXIT PHASE ──
      
      // 1. White curtain slides UP (Faster duration to feel more responsive)
      tl.to(curtain, {
        y: "0%",
        duration: 0.45,
        ease: "power2.inOut",
      });

      // 2. Perform the route swap exactly when the screen is covered
      tl.call(() => {
        router.push(href);
        window.scrollTo(0, 0);
      });

      // 3. Very brief hold to ensure Next.js starts rendering
      tl.to({}, { duration: 0.1 });

      // ── ENTER PHASE ──

      // 4. Slide the curtain AWAY to reveal the new page
      tl.to(curtain, {
        y: "-100%",
        duration: 0.5,
        ease: "power2.inOut",
      });

      // 5. Reset curtain position for next transition
      tl.set(curtain, { y: "100%" });
    },
    [pathname, router]
  );

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}
