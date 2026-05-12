"use client";

import { motion, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TransitionLink from "@/components/TransitionLink";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Footer from "@/components/Footer";
import gsap from "gsap";

const flagpoleProducts = [
  {
    id: 1,
    title: "Classic Series",
    image: "https://pub-9346dd0d7d8d4a61bbf08e53903451d4.r2.dev/images/FLAGPOLES/Flagpole1/1.webp",
    href: "/products/flagpoles/classic-series",
  },
  {
    id: 2,
    title: "Architectural Series",
    image: "https://pub-9346dd0d7d8d4a61bbf08e53903451d4.r2.dev/images/FLAGPOLES/Flagpole2/1.webp",
    href: "/products/flagpoles/architectural-series",
  },
  {
    id: 3,
    title: "Internal Halyard",
    image: "https://pub-9346dd0d7d8d4a61bbf08e53903451d4.r2.dev/images/FLAGPOLES/Flagpole3/1.webp",
    href: "/products/flagpoles/internal-halyard",
  },
  {
    id: 6,
    title: "Wall Mounted",
    image: "https://pub-9346dd0d7d8d4a61bbf08e53903451d4.r2.dev/images/FLAGPOLES/Flagpole6/1.webp",
    href: "/products/flagpoles/wall-mounted",
  },
  {
    id: 8,
    title: "Prestige Gold",
    image: "https://pub-9346dd0d7d8d4a61bbf08e53903451d4.r2.dev/images/FLAGPOLES/Flagpole8/1.webp",
    href: "/products/flagpoles/prestige-gold",
  },
  {
    id: 9,
    title: "Commercial Grade",
    image: "https://pub-9346dd0d7d8d4a61bbf08e53903451d4.r2.dev/images/FLAGPOLES/Flagpole9/1.webp",
    href: "/products/flagpoles/commercial-grade",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.1,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function FlagpoleCollectionPage() {
  const [columns, setColumns] = useState(3);

  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descLinesRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power2.out", delay: 0.2 }
      );

      // Description lines reveal
      descLinesRef.current.forEach((line, i) => {
        if (!line) return;
        gsap.fromTo(line,
          { opacity: 0, y: 20, filter: "blur(3px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, delay: 0.4 + (i * 0.1), ease: "power2.out" }
        );
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setColumns(3);
      else if (window.innerWidth >= 768) setColumns(2);
      else setColumns(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="min-h-screen bg-white">

      {/* Header Section (Matching AboutSection Layout) */}
      <section ref={headerRef} className="pt-24 pb-20 px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-24">
          {/* Left — Title */}
          <div className="lg:w-[30%] shrink-0">
            <h1
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.2] text-[#ed1c24] uppercase"
              style={{ opacity: 0 }}
            >
              Flagpole <br /> Collection
            </h1>
          </div>

          {/* Right — Description */}
          <div className="lg:flex-1">
            <div className="text-xl md:text-[1.55rem] font-light leading-[1.55] tracking-tight text-black w-full">
              <span
                ref={(el) => { descLinesRef.current[0] = el; }}
                className="block mb-1"
                style={{ opacity: 0 }}
              >
                Discover our comprehensive range of Swedish-engineered flagpoles, designed for durability and architectural excellence.
              </span>
              <span
                ref={(el) => { descLinesRef.current[1] = el; }}
                className="block mb-1"
                style={{ opacity: 0 }}
              >
                Each INKO flagpole is a testament to our commitment to quality, reliability, and long-term customer satisfaction across prestigious global projects.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="pb-32 px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-x-6 lg:gap-x-12 gap-y-8 items-start w-full">
          {Array.from({ length: columns }).map((_, colIndex) => {
            const columnProducts = flagpoleProducts.filter((_, i) => i % columns === colIndex);

            return (
              <div key={colIndex} className="flex-1 flex flex-col gap-y-8 md:gap-y-12 w-full">
                {columnProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="group w-full cursor-pointer"
                  >
                    <TransitionLink href={product.href} className="block w-full">
                      <div
                        className="relative w-full aspect-square mb-4 overflow-hidden rounded-[8px] bg-[#ed1c24]/5"
                        style={{ transform: "translateZ(0)" }}
                      >
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        />
                      </div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-[#ed1c24] font-medium text-lg">
                          {product.title}
                        </h3>
                        <div className="w-2 h-2 rounded-full bg-[#ed1c24] mt-2 shrink-0"></div>
                      </div>
                    </TransitionLink>
                  </motion.div>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
