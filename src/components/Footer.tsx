"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import TransitionLink from "./TransitionLink";

export default function Footer() {
  return (
    <footer className="bg-[#a21d2b] text-[#ecebe5] relative overflow-hidden">
      {/* CTA Section */}
      <div className="px-6 md:px-16 pt-32 pb-24 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12"
          >
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.3em] uppercase text-[#ecebe5]/40 mb-6">
                Start a project
              </p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05]">
                Ready to elevate
                <br />
                your environment
                <span className="text-[#ecebe5]/40">?</span>
              </h2>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <TransitionLink
                href="/contact"
                className="group flex items-center gap-4 border border-[#ecebe5]/20 hover:border-[#ecebe5]/60 rounded-none py-4 px-8 transition-all duration-500 cursor-pointer hover:bg-[#ecebe5]/5"
              >
                <span className="text-sm font-medium tracking-widest uppercase">
                  Get in touch
                </span>
                <div className="w-8 h-8 rounded-none bg-[#ecebe5] flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                  <ArrowRight size={14} className="text-[#a21d2b] group-hover:text-[#a21d2b] transition-colors duration-500" />
                </div>
              </TransitionLink>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Columns */}
      <div className="px-6 md:px-16 py-20 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8"
          >
            {/* Column 1 */}
            <div>
              <h4 className="text-xs tracking-[0.3em] uppercase text-[#ecebe5]/40 mb-8">
                Products
              </h4>
              <ul className="space-y-4">
                {["Flagpoles", "Lighting Columns", "Flags & Pennants", "Accessories", "City Environment"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-[#ecebe5]/70 hover:text-[#ecebe5] transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-xs tracking-[0.3em] uppercase text-[#ecebe5]/40 mb-8">
                Company
              </h4>
              <ul className="space-y-4">
                {["About INKO", "Our Mission", "Sustainability", "Partners", "Careers"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-[#ecebe5]/70 hover:text-[#ecebe5] transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="text-xs tracking-[0.3em] uppercase text-[#ecebe5]/40 mb-8">
                Support
              </h4>
              <ul className="space-y-4">
                {["Contact Us", "FAQ", "Installation Guide", "Maintenance", "Warranty"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-[#ecebe5]/70 hover:text-[#ecebe5] transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — Contact */}
            <div>
              <h4 className="text-xs tracking-[0.3em] uppercase text-[#ecebe5]/40 mb-8">
                Get in Touch
              </h4>
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-[#ecebe5]/40 mb-1 uppercase tracking-wider">Email</p>
                  <a href="mailto:info@inko.se" className="text-sm text-[#ecebe5]/70 hover:text-[#ecebe5] transition-colors duration-300">
                    info@inko.se
                  </a>
                </div>
                <div>
                  <p className="text-xs text-[#ecebe5]/40 mb-1 uppercase tracking-wider">Phone</p>
                  <a href="tel:+46123456789" className="text-sm text-[#ecebe5]/70 hover:text-[#ecebe5] transition-colors duration-300">
                    +46 123 456 789
                  </a>
                </div>
                <div>
                  <p className="text-xs text-[#ecebe5]/40 mb-1 uppercase tracking-wider">Location</p>
                  <p className="text-sm text-[#ecebe5]/70">
                    Erbil, Kurdistan Region
                    <br />
                    Iraq
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-6 md:px-16 py-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-8">
            <p className="text-xs text-[#ecebe5]/30 tracking-wider">
              © {new Date().getFullYear()} INKO Company. All rights reserved.
            </p>
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-xs text-[#ecebe5]/30 hover:text-[#ecebe5]/70 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-[#ecebe5]/30 hover:text-[#ecebe5]/70 transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
