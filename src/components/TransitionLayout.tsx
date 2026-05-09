"use client";

import { ReactNode } from "react";
import TransitionProvider from "./TransitionProvider";
import PageTransition from "./PageTransition";

/**
 * Client-side layout wrapper that:
 * 1. Provides the transition context to all children
 * 2. Renders the cinematic overlay
 * 3. Wraps page content in a targetable container
 */
export default function TransitionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <TransitionProvider>
      <PageTransition />
      <div id="page-content" style={{ willChange: "transform, opacity" }}>
        {children}
      </div>
    </TransitionProvider>
  );
}
