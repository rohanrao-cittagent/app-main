import { useEffect, useState, lazy, Suspense } from 'react';
import { Toaster } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import FactoryOps from './sections/FactoryOps';
import TrustedBy from './sections/TrustedBy';
import Footer from './sections/Footer';
import './App.css';

// Lazy load heavy sections
const RealTimeInsights = lazy(() => import('./sections/RealTimeInsights'));
const CustomerReviews = lazy(() => import('./sections/CustomerReviews'));

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // Initialize Lenis smooth scroll with lerp-based smoothing
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
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
      </div>

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
              <Suspense fallback={
                <div className="w-full py-32 flex items-center justify-center">
                  <div className="skeleton w-full max-w-7xl h-96 rounded-3xl" />
                </div>
              }>
                <RealTimeInsights />
              </Suspense>
              <Suspense fallback={
                <div className="w-full py-32 flex items-center justify-center">
                  <div className="skeleton w-full max-w-4xl h-96 rounded-3xl" />
                </div>
              }>
                <CustomerReviews />
              </Suspense>
              <TrustedBy />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
}

export default App;
