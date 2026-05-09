"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ReactLenis } from "lenis/react";
import TransitionLink from "@/components/TransitionLink";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import gsap from "gsap";

const products = [
  {
    id: 1,
    title: "Flagpoles",
    subtitle: "Flaggstänger",
    image: "https://pub-9346dd0d7d8d4a61bbf08e53903451d4.r2.dev/images/FLAGPOLES/Flagpole1/1.webp",
    href: "/products/flagpoles/collection",
  },
  {
    id: 2,
    title: "Lighting Columns",
    subtitle: "Belysningsstolpar",
    image: "/images/2.JPG",
  },
  {
    id: 3,
    title: "Accessories",
    subtitle: "Flaggstångstillbehör",
    image: "/images/3.jpg",
  },
  {
    id: 4,
    title: "Flags & Pennants",
    subtitle: "Flaggor och vimplar",
    image: "/images/2.JPG",
  },
  {
    id: 5,
    title: "City Environment",
    subtitle: "Park och stadsmiljö",
    image: "/images/3.jpg",
  },
  {
    id: 6,
    title: "Custom Projects",
    subtitle: "Specialprojekt",
    image: "/images/1.JPG",
  },
  {
    id: 7,
    title: "Eco Solutions",
    subtitle: "Ekologiska lösningar",
    image: "/images/2.JPG",
  },
  {
    id: 8,
    title: "Industrial Design",
    subtitle: "Industridesign",
    image: "/images/3.jpg",
  },
  {
    id: 9,
    title: "Urban Spaces",
    subtitle: "Urbana miljöer",
    image: "/images/1.JPG",
  },
];

type Product = (typeof products)[number] & { href?: string };

/* ── Animation Variants ── */

const heroImageVariants = {
  hidden: { opacity: 0, z: 0 },
  visible: {
    opacity: 1,
    z: 0,
    transition: { duration: 1.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

const sectionHeaderVariants = {
  hidden: { opacity: 0, y: 30, z: 0 },
  visible: {
    opacity: 1,
    y: 0,
    z: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const faqs = [
  {
    question: "What types of environments are your flagpoles suitable for?",
    answer: "Our premium flagpoles are engineered to withstand extreme weather conditions. From high-wind coastal areas to urban public squares, we use high-grade materials and aerodynamic designs to ensure maximum durability and stability in any climate."
  },
  {
    question: "Do you offer custom installations and bespoke designs?",
    answer: "Absolutely. We specialize in custom projects. Our design and engineering teams work closely with architects and urban planners to create bespoke lighting and flagpole solutions tailored to the unique aesthetic and structural requirements of your environment."
  },
  {
    question: "What are your sustainability practices?",
    answer: "Sustainability is at the core of our manufacturing process. We source eco-friendly materials, employ energy-efficient production methods, and ensure our products are fully recyclable at the end of their long lifecycle. We are committed to minimizing our carbon footprint."
  },
  {
    question: "How do I request a quotation for a commercial project?",
    answer: "You can reach out to our dedicated sales team via the contact form on this website, or directly through email. We typically require site plans, structural requirements, and any specific design preferences to provide a comprehensive and accurate quotation within 48 hours."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-[#111]/10">
      <button
        onClick={onClick}
        className="w-full py-8 md:py-10 flex justify-between items-center text-left focus:outline-none group cursor-pointer"
      >
        <span className="text-xl md:text-3xl font-light tracking-tight text-[#111] group-hover:text-[#a21d2b] transition-colors duration-300 pr-8">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" as const }}
          className="flex-shrink-0 w-10 h-10 rounded-full border border-[#111]/20 flex items-center justify-center group-hover:border-[#a21d2b] group-hover:bg-[#a21d2b]/5 transition-all duration-300"
        >
          <Plus size={20} className="text-[#111] group-hover:text-[#a21d2b] transition-colors duration-300" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        className="overflow-hidden"
      >
        <div className="pb-10 pr-12 text-[#111]/60 font-light text-lg leading-relaxed max-w-3xl">
          {answer}
        </div>
      </motion.div>
    </div>
  );
};

const ProductCard = ({
  product,
  aspect,
}: {
  product: Product;
  aspect: string;
}) => {
  const isDisabled = !["Flagpoles"].includes(product.title);

  const content = (
    <>
      <div
        className={`relative w-full ${aspect} mb-4 overflow-hidden rounded-[8px] bg-[#a21d2b]/5 ${isDisabled ? 'grayscale brightness-[0.9]' : ''}`}
        style={{ transform: "translateZ(0)" }}
      >
        <div className="absolute inset-0">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className={`object-cover transition-transform duration-700 ${!isDisabled ? 'group-hover:scale-105' : ''}`}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
          {isDisabled && (
            <div className="absolute inset-0 bg-[#a21d2b]/10 mix-blend-multiply pointer-events-none" />
          )}
        </div>
      </div>

      {/* Text */}
      <div className={`flex justify-between items-start ${isDisabled ? 'opacity-50' : ''}`}>
        <div>
          <h3 className="text-[#a21d2b] font-medium text-lg">
            {product.title}
          </h3>
        </div>
        <div className="w-2 h-2 rounded-full bg-[#a21d2b] mt-2 shrink-0"></div>
      </div>
    </>
  );

  return (
    <motion.div
      className={`group w-full ${isDisabled ? 'pointer-events-none' : 'cursor-pointer'}`}
    >
      {product.href && !isDisabled ? (
        <TransitionLink href={product.href} className="block w-full h-full">
          {content}
        </TransitionLink>
      ) : (
        content
      )}
    </motion.div>
  );
};

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [columns, setColumns] = useState(3);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mountedTimer = window.setTimeout(() => setMounted(true), 0);
    const handleResize = () => {
      if (window.innerWidth < 768) setColumns(1);
      else if (window.innerWidth < 1024) setColumns(2);
      else setColumns(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.clearTimeout(mountedTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mounted) {
      const chars = heroTextRef.current?.querySelectorAll(".hero-char");
      if (chars) {
        const tl = gsap.timeline({ delay: 0.3 });

        tl.fromTo(chars,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.015,
            ease: "power3.out",
          }
        );

        const redChars = heroTextRef.current?.querySelectorAll(".hero-char-red");
        if (redChars) {
          tl.fromTo(redChars,
            { color: "#111" },
            { color: "#a21d2b", duration: 0.3, stagger: 0.02, ease: "power2.out" },
            "-=0.2"
          );
        }
      }
    }
  }, [mounted]);

  return (
    <ReactLenis root>
      <main className="min-h-screen bg-black">
        {/* Full Screen Menu */}
        {mounted && createPortal(
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                key="fullscreen-menu"
                className="fixed inset-0 z-[100] pointer-events-none"
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Left Side (Dark Indigo Panel) */}
                <motion.div
                  variants={{
                    hidden: { y: "-100%" },
                    visible: { y: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } },
                    exit: { y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } }
                  }}
                  className="fixed left-0 top-0 bottom-0 hidden lg:flex w-2/5 bg-[#a21d2b] flex-col justify-between p-16 text-[#ecebe5] pointer-events-auto overflow-hidden"
                >

                  <div className="relative z-10">
                    <Image src="/Logo.svg" alt="INKO" width={160} height={58} className="object-contain invert brightness-0 filter" />
                  </div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { delay: 0.8 } },
                      exit: { opacity: 0 }
                    }}
                    className="relative z-10 space-y-12"
                  >
                    <div>
                      <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#ecebe5]/40 mb-4">Headquarters</h4>
                      <p className="font-light text-xl md:text-2xl leading-relaxed">
                        Stockholm, Sweden<br />
                        Global Delivery
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#ecebe5]/40 mb-4">Direct Contact</h4>
                      <p className="font-light text-xl md:text-2xl leading-relaxed hover:text-white transition-colors cursor-pointer">
                        info@inko-reklam.se
                      </p>
                      <p className="font-light text-xl md:text-2xl leading-relaxed mt-2 hover:text-white transition-colors cursor-pointer">
                        +46 (0) 8 123 45 67
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Right Side (Off-white Navigation Panel) */}
                <motion.div
                  variants={{
                    hidden: { y: "100%" },
                    visible: { y: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } },
                    exit: { y: "100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } }
                  }}
                  className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 bg-[#ecebe5] flex flex-col p-8 md:p-16 text-[#a21d2b] pointer-events-auto overflow-y-auto"
                >
                  {/* Header */}
                  <div className="flex justify-between items-center w-full">
                    {/* Close Button */}
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="ml-auto group cursor-pointer flex items-center gap-4 text-[#a21d2b] text-xs font-semibold tracking-[0.2em] uppercase"
                    >
                      <span className="hidden md:block">Close</span>
                      <div className="w-12 h-12 rounded-full border border-[#a21d2b] flex items-center justify-center group-hover:bg-[#a21d2b] group-hover:text-[#ecebe5] transition-colors duration-300">
                        <X size={20} strokeWidth={1} />
                      </div>
                    </button>
                  </div>

                  {/* Links */}
                  <div className="flex-1 flex flex-col justify-center mt-12 md:mt-0">
                    <ul className="space-y-4 md:space-y-6">
                      {[
                        { title: "Products", number: "01", href: "/#collections" },
                        { title: "Projects", number: "02", href: "#" },
                        { title: "About Us", number: "03", href: "/about" },
                        { title: "Contact", number: "04", href: "/contact" }
                      ].map((item, i) => (
                        <motion.li
                          key={item.title}
                          variants={{
                            hidden: { y: 80, opacity: 0, rotate: 5 },
                            visible: { y: 0, opacity: 1, rotate: 0, transition: { duration: 0.8, delay: 0.4 + i * 0.1, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } },
                            exit: { y: 50, opacity: 0, transition: { duration: 0.4 } }
                          }}
                          className="group cursor-pointer overflow-hidden origin-left"
                        >
                          <TransitionLink
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-start gap-4 md:gap-8 inline-block"
                          >
                            <span className="text-sm md:text-lg font-mono opacity-30 mt-3 md:mt-6 group-hover:opacity-100 transition-opacity">
                              {item.number}
                            </span>
                            <span className="text-6xl md:text-[7rem] lg:text-[8rem] xl:text-[9rem] leading-[0.85] font-light tracking-tighter text-[#a21d2b] transition-all duration-500">
                              {item.title}
                            </span>
                          </TransitionLink>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { delay: 1.2 } },
                      exit: { opacity: 0 }
                    }}
                    className="flex flex-col sm:flex-row gap-8 justify-between text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium text-[#a21d2b]/60 mt-12"
                  >
                    <div className="flex flex-wrap gap-6 md:gap-8">
                      {['LinkedIn', 'Instagram', 'Facebook'].map(social => (
                        <a key={social} href="#" className="hover:text-[#a21d2b] transition-colors relative group overflow-hidden">
                          {social}
                          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#a21d2b] transform -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                        </a>
                      ))}
                    </div>
                    <div className="lg:hidden text-[#a21d2b]/40">
                      INKO AB © {new Date().getFullYear()}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

        {/* Hero Section */}
        <section ref={heroRef} className="relative w-full bg-white overflow-hidden">
          {/* Navigation */}
          <motion.nav className="relative z-50 w-full px-6 py-8 md:px-12 flex justify-between items-center">
            <div className="flex items-center">
              <Image
                src="/Logo.svg"
                alt="INKO Company"
                width={160}
                height={58}
                className="w-32 h-auto md:w-40 object-contain"
              />
            </div>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="group text-[#a21d2b] transition-all duration-500 ease-[0.76, 0, 0.24, 1] cursor-pointer z-[60]"
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
                  rx="8"
                  ry="8"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="transition-all duration-500 ease-[0.76, 0, 0.24, 1] group-hover:fill-[#a21d2b] group-hover:stroke-[#a21d2b]"
                />
                <line
                  x1="16"
                  y1="11.5"
                  x2="40"
                  y2="11.5"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="transition-all duration-500 ease-[0.76, 0, 0.24, 1] group-hover:stroke-white"
                />
                <line
                  x1="16"
                  y1="15.5"
                  x2="40"
                  y2="15.5"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="transition-all duration-500 ease-[0.76, 0, 0.24, 1] group-hover:stroke-white"
                />
              </svg>
            </button>
          </motion.nav>

          <div className="w-full px-6 md:px-12 pt-24 md:pt-36 pb-16 md:pb-24">
            {/* Brand Slogan */}
            <div className="text-center mb-16 md:mb-24">
              <h1
                ref={heroTextRef}
                className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.15] text-[#111] max-w-5xl mx-auto"
              >
                {"Redefining the vertical space of".split("").map((char, i) => (
                  <span key={`a${i}`} className="hero-char inline-block" style={{ opacity: 0 }}>
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
                <br />
                {"modern ".split("").map((char, i) => (
                  <span key={`b${i}`} className="hero-char inline-block" style={{ opacity: 0 }}>
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
                {"architectural".split("").map((char, i) => (
                  <span key={`c${i}`} className="hero-char hero-char-red inline-block" style={{ opacity: 0 }}>
                    {char}
                  </span>
                ))}
                <span className="hero-char inline-block" style={{ opacity: 0 }}>{"\u00A0"}</span>
                {"environments.".split("").map((char, i) => (
                  <span key={`d${i}`} className="hero-char inline-block" style={{ opacity: 0 }}>
                    {char}
                  </span>
                ))}
              </h1>
            </div>

            <motion.div
              variants={heroImageVariants}
              initial="hidden"
              animate="visible"
              className="relative w-full h-[calc(100vh-120px)] min-h-[760px] overflow-hidden rounded-[8px]"
              style={{ transform: "translateZ(0)" }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover scale-[1.05]"
              >
                <source src="/videos/HeroVideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        </section>

        {/* ── About INKO Section ── */}
        <AboutSection />

        {/* Dynamic Products Grid */}
        <section id="products" className="py-32 bg-white">
          <div className="w-full px-8 md:px-16">
            {/* Section Header */}
            <motion.div
              variants={sectionHeaderVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-24"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#a21d2b] tracking-tight uppercase">
                Collection
              </h2>
            </motion.div>

            {/* Parallax Staggered Grid Layout */}
            <div className="flex flex-col md:flex-row gap-x-6 lg:gap-x-12 gap-y-8 items-start w-full">
              {Array.from({ length: columns }).map((_, colIndex) => {
                // Filter products that belong in this specific column
                const columnProducts = products.filter((_, i) => i % columns === colIndex);

                // Determine top padding per column for the stagger effect
                let ptClass = "pt-0";

                if (columns === 3) {
                  if (colIndex === 0) { ptClass = "lg:pt-0"; }
                  else if (colIndex === 1) { ptClass = "lg:pt-32"; }
                  else { ptClass = "lg:pt-16"; }
                } else if (columns === 2) {
                  if (colIndex === 0) { ptClass = "md:pt-0"; }
                  else { ptClass = "md:pt-24"; }
                } else {
                  ptClass = "pt-0";
                }

                return (
                  <div
                    key={colIndex}
                    className={`flex-1 flex flex-col w-full gap-y-8 md:gap-y-12 ${ptClass} transition-all duration-500`}
                  >
                    {columnProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        aspect="aspect-square"
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-32 relative z-10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16">
            <div className="flex flex-col lg:flex-row gap-20">
              {/* FAQ Header */}
              <div className="lg:w-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="sticky top-32"
                >
                  <h2 className="text-xs tracking-[0.3em] uppercase text-[#111]/40 mb-6">
                    Frequently Asked
                  </h2>
                  <h3 className="text-4xl md:text-6xl font-medium tracking-tight text-[#a21d2b] mb-8 leading-[1.1]">
                    Questions &<br />
                    Answers
                  </h3>
                  <p className="text-[#111]/60 font-light text-lg max-w-md">
                    Everything you need to know about our products, processes, and commitment to quality. Can&apos;t find the answer you&apos;re looking for? Feel free to reach out.
                  </p>
                </motion.div>
              </div>

              {/* FAQ Items */}
              <div className="lg:w-2/3">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="border-t border-[#111]/10"
                >
                  {faqs.map((faq, index) => (
                    <FAQItem
                      key={index}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openFaqIndex === index}
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </ReactLenis>
  );
}
