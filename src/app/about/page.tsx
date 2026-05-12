"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import TransitionLink from "@/components/TransitionLink";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function AboutPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Immediate Hero Reveal
      const heroElements = gsap.utils.toArray<HTMLElement>('.hero-reveal');
      heroElements.forEach((el) => {
        const delay = el.dataset.delay ? parseFloat(el.dataset.delay) : 0;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power3.out",
            delay: delay + 0.2
          }
        );
      });

      // 2. Story Reveal (starts after Hero finishes)
      const storyElements = gsap.utils.toArray<HTMLElement>('.story-reveal');
      storyElements.forEach((el, i) => {
        const baseDelay = 0.8; // Overlaps with Hero description for a fluid feel
        const stagger = i * 0.1;
        
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power2.out",
            delay: baseDelay + stagger
          }
        );
      });

      // 3. Mission Reveal
      const missionElements = gsap.utils.toArray<HTMLElement>('.mission-reveal');
      missionElements.forEach((el, i) => {
        const baseDelay = 1.8; // Overlaps with the end of Story section
        const stagger = i * 0.15;
        
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power3.out",
            delay: baseDelay + stagger
          }
        );
      });

      // 4. CTA Reveal
      const ctaElements = gsap.utils.toArray<HTMLElement>('.cta-reveal');
      ctaElements.forEach((el, i) => {
        const baseDelay = 2.5; // Starts toward the end of Mission
        const stagger = i * 0.15;
        
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power2.out",
            delay: baseDelay + stagger
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-white selection:bg-[#ed1c24] selection:text-white overflow-x-hidden">
      {/* Hero Header */}
      <section className="relative w-full px-6 md:px-12 pt-12 md:pt-20 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-[30%_1fr] gap-x-10 md:gap-x-24 items-end">
          {/* Row 1: Eyebrow */}
          <div className="mb-8">
            <div className="hero-reveal flex items-center gap-4 opacity-0">
              <p className="text-[#ed1c24] text-xs md:text-sm font-medium tracking-[0.2em] uppercase">
                Company Profile
              </p>
            </div>
          </div>
          <div className="hidden md:block"></div>

          {/* Row 2: Title & Description */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-light tracking-tight text-[#111]">
              {["Swedish", "Quality,", "Global", "Reach."].map((word, i) => (
                <span
                  key={i}
                  data-delay={0.1 + i * 0.1}
                  className="hero-reveal inline-block mr-[0.25em] opacity-0"
                >
                  {word}
                </span>
              ))}
            </h1>
          </div>

          <div>
            <div className="max-w-2xl">
              <p className="hero-reveal text-lg md:text-2xl font-light text-[#555] leading-relaxed opacity-0" data-delay={0.6}>
                INKO is a Swedish-origin company headquartered in Dubai, specializing in high-quality flagpoles, flags, and professional sign systems for prestigious environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Story */}
      <section className="w-full px-6 md:px-12 pb-32 md:pb-48 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-[30%_1fr] gap-x-10 md:gap-x-24 items-end">
          {/* Row 1: Heading & First Paragraph */}
          <div className="shrink-0">
            <h3 className="story-reveal text-4xl md:text-5xl lg:text-6xl font-light leading-[1.2] text-[#111] opacity-0">
              Crafting<br />Excellence
            </h3>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="story-reveal text-[#333] font-light text-xl md:text-3xl leading-snug opacity-0">
              Our work is based on quality, reliability, responsibility, and
              long-term customer satisfaction. 
            </p>
          </div>
        </div>

        {/* Row 2: Line & Location */}
        <div className="grid grid-cols-1 md:grid-cols-[30%_1fr] gap-x-10 md:gap-x-24">
          <div className="shrink-0">
            <p className="story-reveal text-sm font-medium text-[#888] uppercase tracking-widest opacity-0 mt-6">
              Dubai, UAE
            </p>
          </div>
          <div className="hidden md:block"></div>
        </div>

        {/* Row 3: Secondary Narrative */}
        <div className="grid grid-cols-1 md:grid-cols-[30%_1fr] gap-x-10 md:gap-x-24 mt-8 md:mt-12">
          <div className="hidden md:block"></div>
          
          <div className="md:flex-1">
            <div className="prose prose-lg max-w-none">
              <p className="story-reveal text-[#666] font-light text-lg md:text-xl leading-relaxed mb-8 opacity-0">
                From the first consultation
                and project planning to delivery, installation, and
                after-sales support, INKO provides professional solutions that
                meet international standards and are adapted to the needs of
                each project.
              </p>

              <p className="story-reveal text-[#666] font-light text-lg md:text-xl leading-relaxed opacity-0">
                At INKO, we believe that every project must be completed with
                care, precision, and professional follow-up. Our goal is to
                deliver products that are not only functional, but also
                elegant, durable, and suitable for prestigious environments.
              </p>
            </div>

            {/* Key Values Grid */}
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
              {[
                { label: "Quality", desc: "Swedish engineering standards", num: "01" },
                { label: "Reliability", desc: "Trusted long-term partnerships", num: "02" },
                { label: "Precision", desc: "Attention to every detail", num: "03" },
                { label: "Elegance", desc: "Designed for prestigious environments", num: "04" },
              ].map((item, i) => (
                <div 
                  key={i}
                  className="story-reveal relative border-t border-black/10 pt-6 opacity-0"
                >
                  <span className="absolute top-6 right-0 text-xs font-medium text-[#ed1c24]">{item.num}</span>
                  <h4 className="text-[#ed1c24] font-medium text-xl mb-3">{item.label}</h4>
                  <p className="text-[#666] font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full bg-[#f8f8f8] border-y border-black/5 py-32 md:py-48 px-6 md:px-12 overflow-hidden relative">
        <div className="max-w-[1400px] relative z-10 text-left">
          <p className="mission-reveal text-[#ed1c24] text-xs md:text-sm font-medium tracking-[0.2em] uppercase mb-12 opacity-0">
            Our Mission
          </p>
          <h2 className="mission-reveal text-3xl md:text-5xl lg:text-7xl font-light text-[#111] leading-[1.1] max-w-[1200px] tracking-tight mb-16 opacity-0">
            To provide elegant, reliable, and long-lasting solutions in flagpoles, flags, signage, and advertising systems.
          </h2>
          <p className="mission-reveal text-[#666] font-light text-lg md:text-2xl max-w-[800px] leading-relaxed opacity-0">
            Combining Swedish quality, international experience, and professional service to become the trusted partner in the region.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-6 md:px-12 py-32 md:py-48">
        <div className="max-w-[1400px] text-left flex flex-col items-start">
          <h3 className="cta-reveal text-4xl md:text-6xl font-light text-[#111] tracking-tight mb-6 opacity-0">
            Let&apos;s work together
          </h3>
          <p className="cta-reveal text-[#666] font-light text-xl mb-12 opacity-0">
            Contact us to discuss your next prestigious project.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="cta-reveal opacity-0">
              <TransitionLink 
                href="/#collections" 
                className="group cursor-pointer bg-[#ed1c24] hover:bg-[#8e1925] text-white transition-colors duration-500 py-4 px-8 flex justify-between items-center text-xs font-medium tracking-[0.2em] uppercase rounded-[8px]"
              >
                <span className="mr-6">Explore Products</span>
                <div className="bg-white/10 group-hover:bg-white/20 rounded-full p-1.5 transition-colors duration-500">
                  <ArrowRight size={14} className="text-white" />
                </div>
              </TransitionLink>
            </div>
            
            <div className="cta-reveal opacity-0">
              <TransitionLink 
                href="/contact" 
                className="group cursor-pointer bg-white border border-[#e5e5e5] hover:border-[#111] text-[#111] transition-colors duration-500 py-4 px-8 flex justify-between items-center text-xs font-medium tracking-[0.2em] uppercase rounded-[8px]"
              >
                <span className="mr-6">Contact Us</span>
                <div className="bg-[#f5f5f5] group-hover:bg-[#111] rounded-full p-1.5 transition-colors duration-500">
                  <ArrowRight size={14} className="text-[#111] group-hover:text-white" />
                </div>
              </TransitionLink>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
