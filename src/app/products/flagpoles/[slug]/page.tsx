"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TransitionLink from "@/components/TransitionLink";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";

const flagpolesData = [
  { id: 1, slug: "classic-series", title: "Classic Series", images: ["1.webp", "2.webp", "3.webp"] },
  { id: 2, slug: "architectural-series", title: "Architectural Series", images: ["1.webp", "2.webp", "3.webp"] },
  { id: 3, slug: "internal-halyard", title: "Internal Halyard", images: ["1.webp", "2.webp", "3.webp"] },
  { id: 6, slug: "wall-mounted", title: "Wall Mounted", images: ["1.webp", "2.webp", "3.webp"] },
  { id: 8, slug: "prestige-gold", title: "Prestige Gold", images: ["1.webp", "2.webp"] },
  { id: 9, slug: "commercial-grade", title: "Commercial Grade", images: ["1.webp", "Cover_1.webp?v=2"] },
];

export default function FlagpoleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const product = flagpolesData.find(p => p.slug === slug) || flagpolesData[0];
  
  const images = product.images.map(img => 
    `https://pub-9346dd0d7d8d4a61bbf08e53903451d4.r2.dev/images/FLAGPOLES/Flagpole${product.id}/${img}`
  );

  const hasMultipleImages = images.length > 1;

  const [currentIndex, setCurrentIndex] = useState(hasMultipleImages ? images.length : 0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideWidth, setSlideWidth] = useState('85vw');
  const [gap, setGap] = useState('1.5rem');
  
  const isTransitioning = useRef(false);

  const extendedImages = hasMultipleImages ? [...images, ...images, ...images] : images;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlideWidth('45vw');
        setGap('3rem'); // 48px to match px-12 padding exactly
      } else if (window.innerWidth >= 768) {
        setSlideWidth('60vw');
        setGap('3rem'); // 48px to match px-12 padding exactly
      } else {
        setSlideWidth('85vw');
        setGap('1.5rem'); // 24px to match px-6 padding exactly
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = () => {
    if (!hasMultipleImages || isTransitioning.current) return;
    isTransitioning.current = true;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prev = () => {
    if (!hasMultipleImages || isTransitioning.current) return;
    isTransitioning.current = true;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleAnimationComplete = () => {
    if (!hasMultipleImages) return;
    
    // Unlock clicks since the slide animation finished
    isTransitioning.current = false;
    
    if (currentIndex >= images.length * 2) {
      setIsAnimating(false);
      setCurrentIndex(currentIndex - images.length);
    } else if (currentIndex <= 0) {
      setIsAnimating(false);
      setCurrentIndex(currentIndex + images.length);
    }
  };

  return (
    <main className="min-h-screen bg-white">

      {/* Carousel Section */}
      <section className="pt-12 overflow-hidden w-full relative">
        <motion.div 
          className="flex px-6 md:px-12"
          style={{ gap: gap }}
          initial={false}
          animate={{ x: `calc(${currentIndex} * (-${slideWidth} - ${gap}))` }}
          transition={{ duration: isAnimating ? 0.8 : 0, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          onAnimationComplete={handleAnimationComplete}
        >
          {extendedImages.map((src, i) => {
            return (
              <motion.div 
                key={i} 
                className="shrink-0 aspect-[4/5] md:aspect-[3/4] lg:aspect-[16/10] relative overflow-hidden rounded-[8px] bg-[#ed1c24]/5"
                style={{ width: slideWidth }}
                initial={false}
              >
                <Image 
                  src={src} 
                  alt={`${product.title} Image ${i + 1}`} 
                  fill 
                  className="object-cover" 
                  sizes="(min-width: 1024px) 45vw, (min-width: 768px) 60vw, 85vw"
                  priority={hasMultipleImages ? (i >= images.length && i < images.length * 2) : true}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="px-6 md:px-12 pt-12 pb-32">
        
        {/* Navigation Arrows */}
        {hasMultipleImages && (
          <div className="flex gap-8 mb-16">
            <button 
              onClick={prev} 
              className="flex items-center gap-2 text-sm tracking-widest uppercase hover:text-[#ed1c24] transition-colors text-gray-500 cursor-pointer"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
              Prev
            </button>
            <button 
              onClick={next} 
              className="flex items-center gap-2 text-sm tracking-widest uppercase hover:text-[#ed1c24] transition-colors text-gray-500 cursor-pointer"
            >
              Next
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        )}

        {/* Title and Description */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mt-8 lg:mt-0">
          <div className="lg:w-[30%] shrink-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#ed1c24] uppercase leading-[1.1]">
              {product.title}
            </h1>
          </div>
          
          <div className="lg:flex-1">
            <div className="text-xl md:text-[1.55rem] font-light leading-[1.55] tracking-tight text-black/80 w-full">
              <span className="block mb-8">
                Swedish Quality in Flagpoles, Flags and Sign Systems<br />
                INKO REKLAM is a Swedish-origin company headquartered in Dubai, United Arab Emirates, 
                specializing in high-quality flagpoles, flags, signage, and professional sign systems 
                for governmental, commercial, public, architectural, and corporate projects.
              </span>
              <span className="block">
                Our work is based on quality, reliability, responsibility, and long-term customer satisfaction. 
                From the first consultation and project planning to delivery.
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
