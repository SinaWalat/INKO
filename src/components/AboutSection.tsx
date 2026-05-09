"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const aboutLines = [
  "INKO is a Swedish-origin company headquartered in Dubai, United Arab Emirates, specializing in high-quality flagpoles, flags, signage, and professional sign systems for governmental, commercial, public, architectural, and corporate projects.",
  "Our work is based on quality, reliability, responsibility, and long-term customer satisfaction. From the first consultation and project planning to delivery, installation, and after-sales support, INKO provides professional solutions that meet international standards and are adapted to the needs of each project.",
  "At INKO, we believe that every project must be completed with care, precision, and professional follow-up. Our goal is to deliver products that are not only functional, but also elegant, durable, and suitable for prestigious environments.",
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal — fade-up with blur (same as description lines)
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      // Lines reveal — staggered fade-up with slight blur
      linesRef.current.forEach((line, i) => {
        if (!line) return;
        gsap.fromTo(
          line,
          {
            opacity: 0,
            y: 30,
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            delay: i * 0.08,
          }
        );
      });

      // Image reveal — scale up
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.05, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-28 md:py-36 overflow-hidden">
      {/* Text area — padding matches nav (px-6 md:px-12) */}
      <div className="w-full px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-24 mb-16 md:mb-24">
          {/* Left — Title */}
          <div className="lg:w-[30%] shrink-0">
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.2] text-[#a21d2b]"
              style={{ opacity: 0 }}
            >
              About INKO
            </h2>
          </div>

          {/* Right — Body text, line by line */}
          <div className="lg:flex-1">
            <div className="text-xl md:text-[1.55rem] font-light leading-[1.55] tracking-tight text-black">
              {aboutLines.map((line, i) => (
                <span
                  key={i}
                  ref={(el) => { linesRef.current[i] = el; }}
                  className="block mb-1"
                  style={{ opacity: 0 }}
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
