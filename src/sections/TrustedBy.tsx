import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import carouselBg1 from '@/assets/carousel-bg-1.png';
import carouselBg2 from '@/assets/carousel-bg-2.png';
import VideoModal from '@/components/VideoModal';
import videoUrl from '@/assets/video/Energy_Intelligence.mp4';

const slides = [
    {
        id: 1,
        title: "Predict Machine Failures Before They Happen.",
        description: "Avoid costly downtime with AI-driven predictive analytics. Monitor vibration, temperature, and acoustics to detect anomalies early and schedule maintenance only when needed.",
        image: carouselBg1,
    },
    {
        id: 2,
        title: "Cut Industrial Energy Waste in Real-Time.",
        description: "Continuously monitor compressors and utilities to detect hidden energy losses, predict failures, and deliver actionable insights for immediate savings.",
        image: carouselBg2,
    }
];

export default function TrustedBy() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const nextSlide = () => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 7000);
        return () => clearInterval(timer);
    }, []);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <section className="relative py-8 md:py-16 lg:py-24 px-4 overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-gray-900 aspect-[3/5] md:aspect-[21/9] min-h-[550px]">

                    {/* Background Slider */}
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentSlide}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="absolute inset-0"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/40 md:to-transparent" />
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Content Layer */}
                    <div className="absolute inset-0 z-10 flex flex-col p-6 md:p-12 lg:px-20 lg:py-12">
                        {/* Text Content */}
                        <div className="max-w-2xl mt-4 md:mt-8 relative z-20">
                            <motion.h2
                                key={`title-${currentSlide}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight"
                            >
                                {slides[currentSlide].title}
                            </motion.h2>
                            <motion.p
                                key={`desc-${currentSlide}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-base md:text-xl text-white/70 mb-8 md:mb-10 leading-relaxed max-w-xl"
                            >
                                {slides[currentSlide].description}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-wrap gap-4"
                            >
                                <Button
                                    size="lg"
                                    onClick={() => toast.info("Coming Soon!", {
                                        description: "Demo requests will be available shortly.",
                                        style: {
                                            background: 'rgba(2, 12, 27, 0.8)',
                                            backdropFilter: 'blur(16px)',
                                            border: '1px solid rgba(6, 182, 212, 0.2)',
                                            color: '#fff',
                                        }
                                    })}
                                    className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-base md:text-lg font-bold w-full md:w-auto"
                                >
                                    Request a Demo
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                                {/* Desktop 'See How It Works' Button */}
                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={() => setIsVideoOpen(true)}
                                    className="hidden md:inline-flex border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-semibold backdrop-blur-sm"
                                >
                                    <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center mr-3">
                                        <Play className="w-4 h-4 fill-white ml-0.5" />
                                    </div>
                                    See How It Works
                                </Button>
                            </motion.div>
                        </div>

                        {/* Bottom Controls Bar (Unified for Mobile) */}
                        <div className="absolute bottom-6 left-0 right-0 px-4 md:px-0 flex flex-col md:flex-row items-center gap-6 justify-center md:justify-center md:static md:mt-auto z-30">

                            {/* Navigation Pills - Dark background container */}
                            <div className="flex flex-col md:flex-row items-center bg-black/80 backdrop-blur-xl rounded-[2rem] p-5 md:px-6 md:py-3 border border-white/10 w-full max-w-[320px] md:max-w-none md:w-auto md:bg-black/60 md:rounded-full">

                                {/* Arrows & Dots Group - Top Row on Mobile */}
                                <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-4">
                                    <button
                                        onClick={prevSlide}
                                        className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                                        aria-label="Previous slide"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>

                                    <div className="flex gap-2">
                                        {slides.map((_, i) => (
                                            <div
                                                key={i}
                                                onClick={() => {
                                                    setDirection(i > currentSlide ? 1 : -1);
                                                    setCurrentSlide(i);
                                                }}
                                                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/30'
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        onClick={nextSlide}
                                        className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                                        aria-label="Next slide"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Divider Line */}
                                <div className="md:hidden w-full h-px bg-white/10 my-4" />

                                {/* Mobile Video Button - Bottom Row */}
                                <button
                                    onClick={() => setIsVideoOpen(true)}
                                    className="md:hidden flex items-center justify-center gap-3 w-full md:w-auto group"
                                >
                                    <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center group-active:scale-95 transition-transform">
                                        <Play className="w-4 h-4 fill-white ml-0.5" />
                                    </div>
                                    <span className="text-white font-semibold text-lg">See How It Works</span>
                                </button>
                            </div>
                        </div>
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
