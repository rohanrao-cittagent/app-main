import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, PlayCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import carouselBg1 from '@/assets/carousel-bg-1.png';
import carouselBg2 from '@/assets/carousel-bg-2.png';
import VideoModal from '@/components/VideoModal';
import videoUrl from '@/assets/video/Energy_Intelligence.mp4';
import ImageLoader from '@/components/ImageLoader';

const slides = [
    {
        headline: <>Cut Industrial Energy Waste in Real-Time.<br />Improve Uptime.<br />Reduce Operating Cost.</>,
        description: "Cittagent’s Digital Energy Supervisor continuously monitors your compressors and utilities, detects hidden energy losses, predicts failures, and delivers actionable insights to operators and maintenance teams.",
        image: carouselBg2 // Mapped to existing asset
    },
    {
        headline: <>Predict Machine Failures<br />Before They Happen.</>,
        description: "Avoid costly downtime with AI-driven predictive analytics. Monitor vibration, temperature, and acoustics to detect anomalies early and schedule maintenance only when needed.",
        image: carouselBg1 // Mapped to existing asset
    },
    {
        headline: <>Optimize Production Flow<br />with Real-Time Visibility.</>,
        description: "Get a digital twin of your factory floor. Track OEE, identify bottlenecks, and streamline operations for maximum throughput and efficiency.",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" // New slide, using Unsplash
    }
];

export default function TrustedBy() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-24 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="relative rounded-[2.5rem] overflow-hidden min-h-[500px] bg-black text-white shadow-2xl flex items-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 z-0"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-black/40 z-10" />
                            <ImageLoader
                                src={slides[currentIndex].image}
                                alt="Slide Background"
                                className="absolute inset-0 w-full h-full opacity-80 transition-all duration-1000"
                                imgClassName="object-cover"
                            />
                        </motion.div>
                    </AnimatePresence>

                    <div className="relative z-20 w-full h-full px-6 pt-12 pb-32 md:p-16">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full w-full"
                            >
                                {/* Left Column: Headline + CTAs */}
                                <div className="flex flex-col justify-center space-y-8">
                                    <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold leading-tight">
                                        {slides[currentIndex].headline}
                                    </h2>

                                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                                        <Button
                                            size="lg"
                                            className="h-14 px-8 text-lg font-semibold bg-white text-black hover:bg-white/90 shadow-xl transition-all rounded-full w-full sm:w-auto"
                                            onClick={() => toast.info("Coming Soon!", {
                                                description: "Demo requests will be available shortly.",
                                                style: {
                                                    background: 'rgba(2, 12, 27, 0.8)',
                                                    backdropFilter: 'blur(16px)',
                                                    border: '1px solid rgba(6, 182, 212, 0.2)',
                                                    color: '#fff',
                                                }
                                            })}
                                        >
                                            Request a Demo <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="h-14 px-8 text-lg rounded-full border-white/50 text-white hover:bg-white/10 backdrop-blur-sm w-full sm:w-auto"
                                            onClick={() => setIsVideoOpen(true)}
                                        >
                                            <PlayCircle className="mr-2 h-5 w-5" /> See How It Works
                                        </Button>
                                    </div>
                                </div>

                                {/* Right Column: Description */}
                                <div className="flex flex-col justify-center space-y-6 lg:pl-12 lg:border-l border-white/10">
                                    <p className="text-xl md:text-2xl font-light leading-relaxed text-white/90">
                                        {slides[currentIndex].description}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Controls (Arrows + Indicators) */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-30">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all border border-white/10"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <div className="flex gap-3">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-8 bg-cyan-400" : "w-2 bg-white/30 hover:bg-white/50"
                                        }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all border border-white/10"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            <VideoModal
                isOpen={isVideoOpen}
                onClose={() => setIsVideoOpen(false)}
                videoSrc={videoUrl}
            />
        </section>
    );
}
