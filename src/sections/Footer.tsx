import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Youtube,
  ArrowRight,
  Shield,
  FileText,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import logo from '@/assets/logo.png';

const footerLinks = {
  product: [
    { name: 'Features', href: '#about' },
    { name: 'FactoryOps', href: '#factoryops' },
    { name: 'Real-time Insights', href: '#insights' },
    { name: 'Pricing', href: '#' },
    { name: 'API', href: '#' },
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Partners', href: '#' },
    { name: 'Contact', href: '#contact' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Case Studies', href: '#reviews' },
    { name: 'Webinars', href: '#' },
    { name: 'Support', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#', icon: Shield },
    { name: 'Terms of Service', href: '#', icon: FileText },
    { name: 'Cookie Policy', href: '#', icon: HelpCircle },
  ],
};

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <footer
      ref={containerRef}
      id="contact"
      className="relative pt-16 lg:pt-24 pb-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="section-content relative z-10">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass-enhanced rounded-3xl p-8 lg:p-12 border border-white/10 mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Ready to Transform Your
                <span className="text-gradient"> Factory Operations?</span>
              </h2>
              <p className="text-white/60 mb-6">
                Join 500+ manufacturers already using FactoryOps AI to optimize their operations
                and reduce costs. Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/5"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
            <div className="lg:pl-8">
              <div className="bg-white/5 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Subscribe to Updates</h3>
                <p className="text-white/60 text-sm mb-4">
                  Get the latest news and insights on industrial AI and smart manufacturing.
                </p>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-cyan-400"
                  />
                  <Button className="bg-cyan-500 hover:bg-cyan-400 text-white px-6">
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12 pt-50"
        >
          {/* Brand Column */}
          <div className="col-span-2">
            <a href="#" className="flex items-start gap-2 mb-2 -mt-10">
              <div className="relative h-28 w-auto flex items-start">
                <img src={logo} alt="FactoryOps Logo" className="h-full w-auto object-contain" />
              </div>
            </a>
            <p className="text-white/60 text-sm mb-6 max-w-xs -mt-5">
              AI-powered industrial intelligence platform for modern manufacturing operations.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>CA Site, 1, HAL 3rd Stage EXTN,
                  behind Hotel Leela Palace, HAL 2nd Stage,
                  Kodihalli, Bengaluru, Karnataka 560008

                  Platform</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>+91 90087 63311</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>support@cittagent.com</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-cyan-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-cyan-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-cyan-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-cyan-400 transition-colors flex items-center gap-2"
                  >
                    <link.icon className="w-3 h-3" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-white/50 text-center md:text-left">
              © {new Date().getFullYear()} Cittagent Technologies. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Security Badge */}
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>HTTPS Secured</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
