import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cpu, Zap, BarChart3, Shield, Phone } from 'lucide-react';
import logo from '@/assets/logo.png';

const navLinks = [
  { name: 'About', href: '#about', icon: Cpu, color: 'text-blue-400' },
  { name: 'FactoryOps', href: '#factoryops', icon: Zap, color: 'text-amber-400' },
  { name: 'Insights', href: '#insights', icon: BarChart3, color: 'text-purple-400' },
  { name: 'Reviews', href: '#reviews', icon: Shield, color: 'text-emerald-400' },
  { name: 'Contact', href: '#contact', icon: Phone, color: 'text-rose-400' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-[#020c1b]/80 backdrop-blur-xl border-b border-cyan-500/10 py-2'
          : 'bg-gradient-to-b from-[#020c1b]/90 to-transparent py-4'
          }`}
      >
        {/* Ambient Background Particles Container */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Subtle Gradient Overlay */}
          {isScrolled && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#020c1b] via-[#0a192f] to-[#020c1b] opacity-50" />
          )}

          {/* Floating Nodes Animation */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/20 rounded-full blur-[1px]"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0,
              }}
              animate={{
                y: ["0%", "100%"],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 15,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between h-20">

            {/* Logo Section - Preserving User Configuration */}
            <motion.a
              href="#"
              className="flex items-center gap-2 group relative z-20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative h-20 w-auto flex items-center justify-center">
                <motion.img
                  src={logo}
                  alt="FactoryOps Logo"
                  // Preserving exact user transforms: scale-[3.5] origin-left translate-y-5 -translate-x-4
                  className="h-full w-auto object-contain scale-[3.5] origin-left translate-y-5 -translate-x-12"
                  animate={{
                    filter: [
                      "drop-shadow(0 0 2px rgba(6,182,212,0))",
                      "drop-shadow(0 0 12px rgba(6,182,212,0.4))",
                      "drop-shadow(0 0 2px rgba(6,182,212,0))"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.a>

            {/* Desktop Navigation - Right Aligned */}
            <div className="hidden lg:flex items-center gap-8 mr-16">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="relative group px-1 py-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <span className={`flex items-center gap-2 text-base font-medium text-slate-400 group-hover:${link.color.replace('text-', 'text-')} transition-colors duration-300`}>
                    {/* Icons are optional in this minimal design, but implied by "Minimal icons paired..." */}
                    <link.icon className={`w-5 h-5 ${link.color} opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300`} />
                    <span className="-ml-7 group-hover:ml-0 transition-all duration-300">{link.name}</span>
                  </span>

                  {/* Hover Line */}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-300 group-hover:w-full" />

                  {/* Hover Glow */}
                  <span className="absolute inset-0 bg-cyan-500/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                </motion.button>
              ))}


            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-cyan-400 transition-colors z-20"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-0 top-20 z-40 lg:hidden bg-[#020c1b]/95 backdrop-blur-xl border-b border-cyan-500/10 shadow-2xl overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 w-full p-4 rounded-xl hover:bg-cyan-500/5 text-slate-300 hover:text-cyan-400 border border-transparent hover:border-cyan-500/10 transition-all group"
                >
                  <link.icon className={`w-5 h-5 text-slate-500 group-hover:${link.color} transition-colors`} />
                  <span className="font-medium">{link.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
