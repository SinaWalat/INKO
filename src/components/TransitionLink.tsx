"use client";

import { ReactNode, MouseEvent } from "react";
import { usePageTransition } from "./TransitionProvider";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Drop-in <a> replacement that triggers the cinematic GSAP page transition
 * instead of a standard navigation. Falls back to normal behavior for
 * external URLs and hash-only links on the same page.
 */
export default function TransitionLink({
  href,
  children,
  className,
  onClick,
}: TransitionLinkProps) {
  const { triggerTransition } = usePageTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Allow external links and new-tab clicks to pass through
    if (
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      e.metaKey ||
      e.ctrlKey
    ) {
      return;
    }

    e.preventDefault();

    // Fire any additional onClick handler (e.g. closing a menu)
    if (onClick) onClick();

    // Trigger the cinematic transition
    triggerTransition(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
