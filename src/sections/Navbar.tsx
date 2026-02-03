import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cpu, Zap, BarChart3, Shield, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

const navLinks = [
  { name: 'About', href: '#about', icon: Cpu },
  { name: 'FactoryOps', href: '#factoryops', icon: Zap },
  { name: 'Insights', href: '#insights', icon: BarChart3 },
  { name: 'Reviews', href: '#reviews', icon: Shield },
  { name: 'Contact', href: '#contact', icon: Phone },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
          }`}
      >
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <motion.a
                href="#"
                className="flex self-start gap-2 group -mt-11"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative h-48 w-auto flex items-center justify-center">
                  <img src={logo} alt="FactoryOps Logo" className="h-full w-auto object-contain" />
                </div>
              </motion.a>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5 group"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <span className="flex items-center gap-2">
                      <link.icon className="w-4 h-4 text-cyan-400/70 group-hover:text-cyan-400 transition-colors" />
                      {link.name}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* CTA Button */}
              <div className="hidden lg:flex items-center gap-3">
                <Button
                  variant="ghost"
                  className="text-white/70 hover:text-white hover:bg-white/5"
                >
                  Sign In
                </Button>
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0"
                >
                  Get Started
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
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
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden"
          >
            <div className="w-full flex justify-center">
              <div className="w-full max-w-[1400px] mx-auto px-4">
                <div className="bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
                  <div className="flex flex-col gap-2">
                    {navLinks.map((link, index) => (
                      <motion.button
                        key={link.name}
                        onClick={() => scrollToSection(link.href)}
                        className="flex items-center gap-3 px-4 py-3 text-left text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                          <link.icon className="w-5 h-5 text-cyan-400" />
                        </div>
                        <span className="font-medium">{link.name}</span>
                      </motion.button>
                    ))}
                    <div className="border-t border-white/10 mt-2 pt-4 flex flex-col gap-2">
                      <Button
                        variant="outline"
                        className="w-full border-white/20 text-white hover:bg-white/5"
                      >
                        Sign In
                      </Button>
                      <Button
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0"
                      >
                        Get Started
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
