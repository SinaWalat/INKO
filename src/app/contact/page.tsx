"use client";

import { motion } from "framer-motion";
import TransitionLink from "@/components/TransitionLink";
import Image from "next/image";
import { useState } from "react";
import Footer from "@/components/Footer";
import { ArrowRight, MapPin, Mail, Phone } from "lucide-react";

/* ── Animation Variants ── */
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ fullName: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-white text-[#111] relative selection:bg-[#ed1c24] selection:text-white">
      {/* Hero Section */}
      <section className="w-full px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <div className="w-full">
          <motion.h2 
            custom={0} variants={fadeIn} initial="hidden" animate="visible"
            className="text-xs tracking-[0.3em] uppercase text-[#111]/40 mb-6"
          >
            Contact
          </motion.h2>
          
          <motion.h1 
            custom={0.1} variants={fadeIn} initial="hidden" animate="visible"
            className="text-5xl md:text-7xl lg:text-[7rem] leading-[1] font-light tracking-tight text-[#111] mb-12"
          >
            Let&apos;s build<br />
            something <span className="text-[#ed1c24] font-medium">great.</span>
          </motion.h1>
          
          <motion.div 
            custom={0.2} variants={fadeIn} initial="hidden" animate="visible"
            className="w-full h-px bg-[#111]/10 mb-16"
          />

          <div className="flex flex-col lg:flex-row gap-20">
            {/* Left: Contact Info */}
            <motion.div 
              custom={0.3} variants={fadeIn} initial="hidden" animate="visible"
              className="lg:w-1/3 flex flex-col gap-12"
            >
              <div>
                <p className="text-[#111]/60 font-light text-lg md:text-xl leading-relaxed mb-10 max-w-md">
                  Whether you have a specific project in mind or just want to explore possibilities, we&apos;re here to help. Reach out to our team of experts.
                </p>
              </div>

              <div className="flex flex-col gap-8">
                <div className="group">
                  <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#111]/40 mb-3 flex items-center gap-2">
                    <MapPin size={12} />
                    Headquarters
                  </h4>
                  <p className="font-light text-lg">
                    Dubai, UAE<br />
                    Global Delivery
                  </p>
                </div>
                
                <div className="group">
                  <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#111]/40 mb-3 flex items-center gap-2">
                    <Mail size={12} />
                    Email
                  </h4>
                  <a href="mailto:info@inko-reklam.se" className="font-light text-lg hover:text-[#ed1c24] transition-colors">
                    info@inko-reklam.se
                  </a>
                </div>

                <div className="group">
                  <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#111]/40 mb-3 flex items-center gap-2">
                    <Phone size={12} />
                    Phone
                  </h4>
                  <a href="tel:+46081234567" className="font-light text-lg hover:text-[#ed1c24] transition-colors">
                    +46 (0) 8 123 45 67
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div 
              custom={0.4} variants={fadeIn} initial="hidden" animate="visible"
              className="lg:w-2/3"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium tracking-[0.2em] uppercase text-[#111]/60 px-2">First Name</label>
                    <input 
                      type="text" required
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full bg-[#f8f8f8] border border-transparent focus:border-[#ed1c24]/30 focus:bg-white text-[#111] px-6 py-4 rounded-[8px] outline-none transition-all duration-300 placeholder:text-[#111]/20 font-light"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium tracking-[0.2em] uppercase text-[#111]/60 px-2">Email Address</label>
                    <input 
                      type="email" required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-[#f8f8f8] border border-transparent focus:border-[#ed1c24]/30 focus:bg-white text-[#111] px-6 py-4 rounded-[8px] outline-none transition-all duration-300 placeholder:text-[#111]/20 font-light"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium tracking-[0.2em] uppercase text-[#111]/60 px-2">Subject</label>
                  <input 
                    type="text" required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-[#f8f8f8] border border-transparent focus:border-[#ed1c24]/30 focus:bg-white text-[#111] px-6 py-4 rounded-[8px] outline-none transition-all duration-300 placeholder:text-[#111]/20 font-light"
                    placeholder="How can we help?"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium tracking-[0.2em] uppercase text-[#111]/60 px-2">Message</label>
                  <textarea 
                    required rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-[#f8f8f8] border border-transparent focus:border-[#ed1c24]/30 focus:bg-white text-[#111] px-6 py-4 rounded-[8px] outline-none transition-all duration-300 placeholder:text-[#111]/20 font-light resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <div className="mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  {submitted ? (
                    <div className="flex items-center gap-3 text-[#ed1c24]">
                      <div className="w-2 h-2 rounded-full bg-[#ed1c24] animate-pulse" />
                      <span className="font-medium tracking-wide">Message sent successfully</span>
                    </div>
                  ) : (
                    <p className="text-xs text-[#111]/40 font-light max-w-[200px]">
                      By submitting this form, you agree to our privacy policy.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitted}
                    className="group flex items-center gap-4 border border-[#ed1c24] bg-[#ed1c24] rounded-[8px] py-4 px-8 transition-all duration-500 cursor-pointer hover:bg-[#d91921] hover:border-[#d91921] disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto justify-center md:justify-start"
                  >
                    <span className="text-sm font-medium tracking-widest uppercase text-white">
                      Send Message
                    </span>
                    <div className="w-8 h-8 rounded-[8px] bg-white flex items-center justify-center transition-colors duration-500 group-hover:scale-95">
                      <ArrowRight size={14} className="text-[#ed1c24] transition-colors duration-500 group-hover:translate-x-0.5" />
                    </div>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
