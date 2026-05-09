"use client";

import {
  createContext,
  useContext,
  useRef,
  useCallback,
  useEffect,
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
  const pendingPath = useRef<string | null>(null);

  // Listen for route changes to trigger the "Enter" phase
  // This ensures the curtain only slides away AFTER the new content is ready
  useEffect(() => {
    if (pendingPath.current === pathname) {
      const overlay = document.getElementById("page-transition-overlay");
      const curtain = overlay?.querySelector(".transition-curtain");

      if (curtain) {
        gsap.to(curtain, {
          y: "-100%",
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(curtain, { y: "100%" });
            isAnimating.current = false;
            pendingPath.current = null;
          },
        });
      }
    }
  }, [pathname]);

  const triggerTransition = useCallback(
    (href: string) => {
      // Prevent double triggers or navigating to the current page
      if (href === pathname || isAnimating.current) return;

      // Handle same-page hash links
      if (href.startsWith("#") || (href.startsWith("/#") && pathname === "/")) {
        const hash = href.replace("/", "");
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        return;
      }

      isAnimating.current = true;
      pendingPath.current = href;

      const overlay = document.getElementById("page-transition-overlay");
      const curtain = overlay?.querySelector(".transition-curtain");

      // Fallback for missing overlay
      if (!overlay || !curtain) {
        router.push(href);
        isAnimating.current = false;
        pendingPath.current = null;
        return;
      }

      // EXIT PHASE: Slide curtain UP
      gsap.to(curtain, {
        y: "0%",
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          router.push(href);
          // Force scroll to top while screen is covered
          window.scrollTo(0, 0);
        },
      });
    },
    [pathname, router]
  );

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}
