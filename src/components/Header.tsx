"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";
import TransitionLink from "@/components/TransitionLink";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mountedTimer = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(mountedTimer);
  }, []);

  return (
    <>
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
              {/* Left Side (Red Panel) */}
              <motion.div
                variants={{
                  hidden: { y: "-100%" },
                  visible: { y: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } },
                  exit: { y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }
                }}
                className="fixed left-0 top-0 bottom-0 hidden lg:flex w-2/5 bg-[#ed1c24] flex-col justify-between p-16 text-black pointer-events-auto overflow-hidden"
              >

                <div className="relative z-10">
                  <Image src="/NEWNEWNEW.svg" alt="INKO" width={160} height={58} className="object-contain brightness-0 filter" />
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
                    <h4 className="text-[10px] tracking-[0.3em] uppercase text-black/40 mb-4">Headquarters</h4>
                    <p className="font-light text-xl md:text-2xl leading-relaxed">
                      Dubai, UAE<br />
                      Global Delivery
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[10px] tracking-[0.3em] uppercase text-black/40 mb-4">Direct Contact</h4>
                    <p className="font-light text-xl md:text-2xl leading-relaxed hover:text-black/70 transition-colors cursor-pointer">
                      info@inko-reklam.se
                    </p>
                    <p className="font-light text-xl md:text-2xl leading-relaxed mt-2 hover:text-black/70 transition-colors cursor-pointer">
                      +46 (0) 8 123 45 67
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Side (Off-white Navigation Panel) */}
              <motion.div
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } },
                  exit: { y: "100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }
                }}
                className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 bg-white flex flex-col p-8 md:p-16 text-black pointer-events-auto overflow-y-auto"
              >
                {/* Header */}
                <div className="flex justify-between items-center w-full">
                  {/* Close Button */}
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="ml-auto group cursor-pointer flex items-center gap-4 text-black text-xs font-semibold tracking-[0.2em] uppercase"
                  >
                    <span className="hidden md:block">Close</span>
                    <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                      <X size={20} strokeWidth={1} />
                    </div>
                  </button>
                </div>

                {/* Links */}
                <div className="flex-1 flex flex-col justify-center mt-12 md:mt-0">
                  <ul className="space-y-4 md:space-y-6">
                    {[
                      { title: "Products", number: "01", href: "/#products" },
                      { title: "About Us", number: "02", href: "/about" },
                      { title: "Contact", number: "03", href: "/contact" }
                    ].map((item, i) => (
                      <motion.li
                        key={item.title}
                        variants={{
                          hidden: { y: 80, opacity: 0, rotate: 5 },
                          visible: { y: 0, opacity: 1, rotate: 0, transition: { duration: 0.8, delay: 0.4 + i * 0.1, ease: [0.76, 0, 0.24, 1] } },
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
                          <span className="text-6xl md:text-[7rem] lg:text-[8rem] xl:text-[9rem] leading-[0.85] font-light tracking-tighter text-black transition-all duration-500">
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
                  className="flex flex-col sm:flex-row gap-8 justify-between text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium text-black/60 mt-12"
                >
                  <div className="flex flex-wrap gap-6 md:gap-8">
                    {['LinkedIn', 'Instagram', 'Facebook'].map(social => (
                      <a key={social} href="#" className="hover:text-black transition-colors relative group overflow-hidden">
                        {social}
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black transform -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                      </a>
                    ))}
                  </div>
                  <div className="lg:hidden text-black/40">
                    INKO AB © {new Date().getFullYear()}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Navigation Bar */}
      <motion.nav className="relative z-50 w-full px-6 py-8 md:px-12 flex justify-between items-center bg-white">
        <TransitionLink href="/" className="flex items-center">
          <Image
            src="/NEWNEWNEW.svg"
            alt="INKO Company"
            width={160}
            height={58}
            className="w-32 h-auto md:w-40 object-contain"
          />
        </TransitionLink>

        <button
          onClick={() => setIsMenuOpen(true)}
          className="group text-[#ed1c24] transition-all duration-500 ease-[0.76, 0, 0.24, 1] cursor-pointer z-[60]"
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
              className="transition-all duration-500 ease-[0.76, 0, 0.24, 1] group-hover:fill-[#ed1c24] group-hover:stroke-[#ed1c24]"
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
    </>
  );
}
