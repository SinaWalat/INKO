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

const FAQItem = ({ question, answer, isOpen, onClick, index }: { question: string, answer: string, isOpen: boolean, onClick: () => void, index: number }) => {
  const num = (index + 1).toString().padStart(2, '0');
  return (
    <div className="mb-4">
      <button
        onClick={onClick}
        className={`w-full p-6 md:p-8 rounded-[8px] flex items-center justify-between text-left focus:outline-none group cursor-pointer transition-all duration-500 border ${isOpen ? 'bg-[#ed1c24] border-[#ed1c24] text-white shadow-xl shadow-[#ed1c24]/20' : 'bg-[#f8f8f8] border-transparent hover:border-[#ed1c24]/20 hover:bg-[#fafafa]'}`}
      >
        <div className="flex items-center gap-6 md:gap-8">
          <span className={`text-sm md:text-base font-medium font-mono ${isOpen ? 'text-white/70' : 'text-[#ed1c24]'}`}>
            {num}
          </span>
          <span className={`text-xl md:text-2xl font-light tracking-tight transition-colors duration-300 pr-4 ${isOpen ? 'text-white' : 'text-[#111] group-hover:text-[#ed1c24]'}`}>
            {question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" as const }}
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-white/20 text-white' : 'border border-[#111]/10 bg-white text-[#111] group-hover:border-[#ed1c24] group-hover:text-[#ed1c24]'}`}
        >
          <Plus size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="p-6 md:p-8 pt-0 md:pt-0 mt-4 text-[#111]/70 font-light text-lg leading-relaxed max-w-3xl border-l-2 border-[#ed1c24] ml-6 md:ml-8 pl-6 md:pl-8">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
        className={`relative w-full ${aspect} mb-4 overflow-hidden rounded-[8px] bg-[#ed1c24]/5 ${isDisabled ? 'grayscale brightness-[0.9]' : ''}`}
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
            <div className="absolute inset-0 bg-[#ed1c24]/10 mix-blend-multiply pointer-events-none" />
          )}
        </div>
      </div>

      {/* Text */}
      <div className={`flex justify-between items-start ${isDisabled ? 'opacity-50' : ''}`}>
        <div>
          <h3 className="text-[#ed1c24] font-medium text-lg">
            {product.title}
          </h3>
        </div>
        <div className="w-2 h-2 rounded-full bg-[#ed1c24] mt-2 shrink-0"></div>
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
  const [columns, setColumns] = useState(2);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setColumns(1);
      else setColumns(2);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const heroRef = useRef<HTMLElement>(null);

  return (
    <ReactLenis root>
      <main className="min-h-screen bg-black">
        {/* Hero Section */}
        <section ref={heroRef} className="relative w-full bg-white overflow-hidden">

          <div className="w-full px-6 md:px-12 py-12 md:py-16">
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
                <source src="/videos/VIVI.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        </section>

        {/* ── About INKO Section ── */}
        <AboutSection />

        {/* Dynamic Products Grid */}
        <section id="products" className="bg-white py-12 md:py-16">
          <div className="w-full px-6 md:px-12">
            {/* Section Header */}
            <motion.div
              variants={sectionHeaderVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-24"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#ed1c24] tracking-tight uppercase">
                Collection
              </h2>
            </motion.div>

            {/* Grid Section */}
            <div className="flex flex-col md:flex-row gap-x-6 lg:gap-x-12 gap-y-8 items-start w-full">
              {Array.from({ length: columns }).map((_, colIndex) => {
                const columnProducts = products.filter((_, i) => i % columns === colIndex);

                return (
                  <div key={colIndex} className="flex-1 flex flex-col gap-y-8 md:gap-y-12 w-full">
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
        <section className="bg-white py-12 md:py-16 relative z-10">
          <div className="w-full px-6 md:px-12">
            <div className="flex flex-col lg:flex-row gap-20">
              {/* FAQ Header */}
              <div className="lg:w-1/3">
                <div>
                  <h2 className="text-xs tracking-[0.3em] uppercase text-[#111]/40 mb-6">
                    Frequently Asked
                  </h2>
                  <h3 className="text-4xl md:text-6xl font-medium tracking-tight text-[#ed1c24] mb-8 leading-[1.1]">
                    Questions &<br />
                    Answers
                  </h3>
                  <p className="text-[#111]/60 font-light text-lg max-w-md">
                    Everything you need to know about our products, processes, and commitment to quality. Can&apos;t find the answer you&apos;re looking for? Feel free to reach out.
                  </p>
                </div>
              </div>

              {/* FAQ Items */}
              <div className="lg:w-2/3">
                <div className="flex flex-col">
                  {faqs.map((faq, index) => (
                    <FAQItem
                      key={index}
                      index={index}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openFaqIndex === index}
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </ReactLenis>
  );
}
