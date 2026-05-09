"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import TransitionLink from "@/components/TransitionLink";
import Image from "next/image";
import { useState } from "react";
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset after showing success
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ fullName: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-white">
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
      <section className="w-full px-6 md:px-16 pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="max-w-[1400px]">
          {/* Eyebrow */}
          <motion.p
            custom={0}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-[#a21d2b] text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-8"
          >
            Contact Us
          </motion.p>

          {/* Title — word by word */}
          <h1 className="text-[2.5rem] md:text-[5rem] lg:text-[6rem] leading-[1] font-medium tracking-tight text-[#333] mb-0">
            {(() => {
              const words = "Get in Touch".split(" ");
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
          <motion.p
            custom={0.8}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-xl md:text-2xl font-light text-[#333]/70 leading-snug max-w-[700px]"
          >
            We&apos;d love to hear from you. Fill out the form below and our team
            will get back to you shortly.
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="w-full px-6 md:px-16 pb-24 md:pb-40">
        <div className="max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
            {/* Left — Form */}
            <motion.div
              className="md:col-span-7"
              custom={1}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-[#333] text-xs font-medium tracking-[0.2em] uppercase mb-3"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="Your full name"
                    className="w-full bg-transparent border-b border-[#333]/30 focus:border-[#a21d2b] text-[#333] text-lg font-light py-3 outline-none transition-colors duration-300 placeholder:text-[#333]/30"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[#333] text-xs font-medium tracking-[0.2em] uppercase mb-3"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-b border-[#333]/30 focus:border-[#a21d2b] text-[#333] text-lg font-light py-3 outline-none transition-colors duration-300 placeholder:text-[#333]/30"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[#333] text-xs font-medium tracking-[0.2em] uppercase mb-3"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us about your project..."
                    className="w-full bg-transparent border-b border-[#333]/30 focus:border-[#a21d2b] text-[#333] text-lg font-light py-3 outline-none transition-colors duration-300 placeholder:text-[#333]/30"
                    style={{ resize: "none" }}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[#a21d2b] font-medium text-lg tracking-wide"
                    >
                      ✓ Message sent successfully
                    </motion.div>
                  ) : (
                    <button
                      type="submit"
                      className="group cursor-pointer bg-[#a21d2b] hover:bg-[#333] text-[#ecebe5] transition-colors duration-300 py-4 px-8 flex items-center gap-4 text-xs md:text-sm font-medium tracking-widest uppercase"
                    >
                      Send Message
                      <div className="bg-white/20 group-hover:bg-white rounded-full p-1.5 transition-colors duration-300">
                        <Send
                          size={14}
                          className="text-[#ecebe5] group-hover:text-[#333]"
                        />
                      </div>
                    </button>
                  )}
                </div>
              </form>
            </motion.div>

            {/* Right — Contact Info */}
            <motion.div
              className="md:col-span-5 md:pt-4"
              custom={1.3}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <div className="space-y-12">
                {/* Location */}
                <div>
                  <h3 className="text-[#333] text-xs font-medium tracking-[0.2em] uppercase mb-3">
                    Headquarters
                  </h3>
                  <p className="text-[#333] font-light text-lg leading-relaxed">
                    Dubai, United Arab Emirates
                  </p>
                </div>

                {/* Email */}
                <div>
                  <h3 className="text-[#333] text-xs font-medium tracking-[0.2em] uppercase mb-3">
                    Email
                  </h3>
                  <a
                    href="mailto:info@inkoreklam.com"
                    className="text-[#333] font-light text-lg hover:text-[#a21d2b] transition-colors duration-300"
                  >
                    info@inkoreklam.com
                  </a>
                </div>

                {/* Working Hours */}
                <div>
                  <h3 className="text-[#333] text-xs font-medium tracking-[0.2em] uppercase mb-3">
                    Working Hours
                  </h3>
                  <p className="text-[#333] font-light text-lg leading-relaxed">
                    Sunday – Thursday
                    <br />
                    9:00 AM – 6:00 PM
                  </p>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-[#333]/10"></div>

                {/* Quick note */}
                <p className="text-[#888] font-light text-sm leading-relaxed">
                  We typically respond within 24 hours. For urgent inquiries,
                  please mention it in your message.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
