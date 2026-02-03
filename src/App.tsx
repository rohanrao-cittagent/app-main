import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import FactoryOps from './sections/FactoryOps';
import RealTimeInsights from './sections/RealTimeInsights';
import CustomerReviews from './sections/CustomerReviews';
import TrustedBy from './sections/TrustedBy';
import Footer from './sections/Footer';
import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ y: backgroundY }}
      >
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      {/* Main Content */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <Navbar />
            <main className="flex flex-col items-center w-full">
              <Hero />
              <About />
              <FactoryOps />
              <RealTimeInsights />
              <CustomerReviews />
              <TrustedBy />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
