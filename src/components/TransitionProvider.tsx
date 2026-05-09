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
      
      // 1. White curtain slides UP + Content fades out
      tl.to(curtain, {
        y: "0%",
        duration: 0.4,
        ease: "power2.inOut",
      });

      tl.to(pageContent, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
      }, 0.1);

      // 2. Perform the actual route swap while covered
      tl.call(() => {
        router.push(href);
        window.scrollTo(0, 0);
      });

      // 3. Short buffer to allow Next.js to start rendering the new component tree
      tl.to({}, { duration: 0.2 });

      // ── ENTER PHASE ──

      // 4. Slide the curtain AWAY and fade the new content IN
      tl.to(curtain, {
        y: "-100%",
        duration: 0.5,
        ease: "power2.inOut",
      });

      tl.fromTo(pageContent, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          ease: "power2.out",
          clearProps: "all" // Ensure we don't leave inline styles that break layout
        },
        "-=0.3"
      );

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
