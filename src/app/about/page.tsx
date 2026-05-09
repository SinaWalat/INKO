"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import TransitionLink from "@/components/TransitionLink";
import Image from "next/image";
import Footer from "@/components/Footer";

/* ── Animation Variants ── */

const fadeIn = {
  hidden: { opacity: 0, z: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    z: 0,
    transition: { duration: 1, delay, ease: "easeOut" as const },
  }),
};

const lineReveal = {
  hidden: { scaleX: 0, z: 0 },
  visible: (delay: number) => ({
    scaleX: 1,
    z: 0,
    transition: { duration: 1.2, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

const wordVariants = {
  hidden: { opacity: 0, y: 20, z: 0 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    z: 0,
    transition: {
      duration: 1.2,
      delay: 0.3 + i * 0.12,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#ecebe5]">
      {/* Navigation */}
      <nav className="relative z-50 w-full px-6 py-8 md:px-12 flex justify-between items-center">
        <TransitionLink href="/" className="flex items-center">
          <Image src="/Logo.svg" alt="INKO Company" width={160} height={58} className="w-32 md:w-40 object-contain" />
        </TransitionLink>

        <TransitionLink
          href="/"
          className="text-[#333] hover:opacity-70 transition-opacity cursor-pointer"
        >
          <svg
            width="56"
            height="26"
            viewBox="0 0 56 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="55"
              height="25"
              stroke="currentColor"
              strokeWidth="1"
            />
            <line
              x1="16"
              y1="11.5"
              x2="40"
              y2="11.5"
              stroke="currentColor"
              strokeWidth="1"
            />
            <line
              x1="16"
              y1="15.5"
              x2="40"
              y2="15.5"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </TransitionLink>
      </nav>

      {/* Hero Header */}
      <section className="w-full px-6 md:px-16 pt-16 md:pt-24 pb-20 md:pb-32">
        <div className="max-w-[1400px]">
          {/* Eyebrow */}
          <motion.p
            custom={0}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-[#a21d2b] text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-8"
          >
            About Us
          </motion.p>

          {/* Title — word by word */}
          <h1 className="text-[2.5rem] md:text-[5rem] lg:text-[6rem] leading-[1] font-medium tracking-tight text-[#333] mb-0">
            {(() => {
              const words = ["INKO"];
              return words.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.25em]"
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {word}
                </motion.span>
          ));
            })()}
        </h1>

        {/* Divider */}
        <motion.div
          className="w-full h-px bg-[#333]/20 my-10 md:my-16 origin-left"
          custom={0.6}
          variants={lineReveal}
          initial="hidden"
          animate="visible"
        />

        {/* Subtitle */}
        <motion.h2
          custom={0.8}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="text-xl md:text-3xl lg:text-4xl font-light text-[#333] leading-snug max-w-[900px]"
        >
          Swedish Quality in Flagpoles, Flags and Sign Systems
        </motion.h2>
      </div>
    </section>

      {/* Main Content */ }
  <section className="w-full px-6 md:px-16 pb-24 md:pb-40">
    <div className="max-w-[1400px]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
        {/* Left Column — Main Copy */}
        <div className="md:col-span-7">
          <motion.div
            custom={1}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <p className="text-[#333] font-light text-lg md:text-xl leading-relaxed mb-8">
              INKO is a Swedish-origin company headquartered in
              Dubai, United Arab Emirates, specializing in high-quality
              flagpoles, flags, signage, and professional sign systems for
              governmental, commercial, public, architectural, and corporate
              projects.
            </p>

            <p className="text-[#333] font-light text-lg md:text-xl leading-relaxed mb-8">
              Our work is based on quality, reliability, responsibility, and
              long-term customer satisfaction. From the first consultation
              and project planning to delivery, installation, and
              after-sales support, INKO provides professional solutions that
              meet international standards and are adapted to the needs of
              each project.
            </p>

            <p className="text-[#333] font-light text-lg md:text-xl leading-relaxed">
              At INKO, we believe that every project must be completed with
              care, precision, and professional follow-up. Our goal is to
              deliver products that are not only functional, but also
              elegant, durable, and suitable for prestigious environments.
            </p>
          </motion.div>
        </div>

        {/* Right Column — Key Values */}
        <div className="md:col-span-5 md:pt-4">
          <motion.div
            custom={1.3}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="space-y-10"
          >
            {[
              { label: "Quality", desc: "Swedish engineering standards" },
              {
                label: "Reliability",
                desc: "Trusted long-term partnerships",
              },
              {
                label: "Precision",
                desc: "Attention to every detail",
              },
              {
                label: "Elegance",
                desc: "Designed for prestigious environments",
              },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#a21d2b] shrink-0"></div>
                  <h3 className="text-[#333] font-medium text-lg tracking-wide uppercase">
                    {item.label}
                  </h3>
                </div>
                <p className="text-[#888] font-light text-sm pl-5">
                  {item.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  </section>

  {/* Mission Section */ }
  <section className="w-full bg-[#333] text-[#ecebe5]">
    <div className="px-6 md:px-16 py-24 md:py-40 max-w-[1400px]">
      <motion.div
        initial={{ opacity: 0, z: 0 }}
        whileInView={{ opacity: 1, z: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" as const }}
      >
        <p className="text-[#a21d2b] text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-8">
          Our Mission
        </p>

        <motion.div
          className="w-full h-px bg-white/20 mb-12 md:mb-16 origin-left"
          initial={{ scaleX: 0, z: 0 }}
          whileInView={{ scaleX: 1, z: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
          }}
        />

        <p className="font-light text-2xl md:text-4xl leading-snug mb-10 max-w-[1000px]">
          Our mission is to provide elegant, reliable, and long-lasting
          solutions in flagpoles, flags, signage, and advertising systems.
        </p>

        <p className="font-light text-lg md:text-xl leading-relaxed text-[#ecebe5]/70 max-w-[900px]">
          We aim to support our customers with products that combine Swedish
          quality, international experience, and professional service. Our
          goal is to become a trusted partner for flagpoles, flags, sign
          systems, and advertising solutions in Kurdistan, Iraq, and the
          wider region.
        </p>
      </motion.div>
    </div>
  </section>

  {/* CTA Section */ }
  <section className="w-full px-6 md:px-16 py-24 md:py-32">
    <div className="max-w-[1400px] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
      <motion.div
        initial={{ opacity: 0, z: 0 }}
        whileInView={{ opacity: 1, z: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl md:text-5xl font-medium text-[#333] tracking-tight mb-3">
          Let&apos;s work together
        </h3>
        <p className="text-[#888] font-light text-lg">
          Contact us to discuss your next project.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, z: 0 }}
        whileInView={{ opacity: 1, z: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex gap-4"
      >
        <TransitionLink href="/#collections" className="group cursor-pointer bg-[#a21d2b] hover:bg-[#333] text-[#ecebe5] transition-colors duration-300 py-3 px-5 flex justify-between items-center text-[10px] md:text-xs font-medium tracking-widest">
          <span className="text-left">
            EXPLORE
            <br />
            PRODUCTS
          </span>
          <div className="bg-white/20 group-hover:bg-white rounded-full p-1 ml-4 transition-colors duration-300">
            <ArrowRight
              size={14}
              className="text-[#ecebe5] group-hover:text-[#333]"
            />
          </div>
        </TransitionLink>
        <TransitionLink href="/contact" className="group cursor-pointer bg-[#333] hover:bg-[#111] text-[#ecebe5] transition-colors duration-300 py-3 px-5 flex justify-between items-center text-[10px] md:text-xs font-medium tracking-widest uppercase">
          <span className="text-left">CONTACT</span>
          <div className="bg-white/20 group-hover:bg-white rounded-full p-1 ml-4 transition-colors duration-300">
            <ArrowRight
              size={14}
              className="text-[#ecebe5] group-hover:text-[#333]"
            />
          </div>
        </TransitionLink>
      </motion.div>
    </div>
  </section>

  <Footer />
    </main >
  );
}
