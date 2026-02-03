import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import carouselBg1 from '@/assets/carousel-bg-1.png';
import carouselBg2 from '@/assets/carousel-bg-2.png';

const slides = [
    {
        id: 1,
        title: "Predict Machine Failures Before They Happen.",
        description: "Avoid costly downtime with AI-driven predictive analytics. Monitor vibration, temperature, and acoustics to detect anomalies early and schedule maintenance only when needed.",
        image: carouselBg1,
    },
    {
        id: 2,
        title: "Cut Industrial Energy Waste in Real-Time. Improve Uptime. Reduce Operating Cost.",
        description: "Cittagent's Digital Energy Supervisor continuously monitors your compressors and utilities, detects hidden energy losses, predicts failures, and delivers actionable insights to operators and maintenance teams.",
        image: carouselBg2,
    }
];

export default function TrustedBy() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);

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
        <section className="relative py-16 lg:py-24">
            <div className="section-content">
                {/* Carousel Container */}
                <div className="relative overflow-hidden rounded-3xl" style={{ minHeight: '500px' }}>
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
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                            />

                            {/* Content Overlay */}
                            <div className="relative z-10 h-full flex items-center px-8 lg:px-16 py-12">
                                <div className="max-w-4xl">
                                    <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                                        {slides[currentSlide].title}
                                    </h2>

                                    <p className="text-lg lg:text-xl text-white/80 mb-8 max-w-2xl">
                                        {slides[currentSlide].description}
                                    </p>

                                    <div className="flex flex-wrap gap-4">
                                        <Button
                                            size="lg"
                                            className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-6 text-lg font-semibold h-auto"
                                        >
                                            Request a Demo
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-semibold h-auto backdrop-blur-sm"
                                        >
                                            <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center mr-3">
                                                <Play className="w-4 h-4 fill-white ml-0.5" />
                                            </div>
                                            See How It Works
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Carousel Controls */}
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
                                <button
                                    onClick={prevSlide}
                                    className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                                    aria-label="Previous slide"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                <div className="flex gap-2">
                                    {slides.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                setDirection(i > currentSlide ? 1 : -1);
                                                setCurrentSlide(i);
                                            }}
                                            className={`h-1 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40'
                                                }`}
                                            aria-label={`Go to slide ${i + 1}`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={nextSlide}
                                    className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                                    aria-label="Next slide"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
