import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ImageLoaderProps {
    src: string;
    alt: string;
    className?: string;
    imgClassName?: string;
    placeholderClassName?: string;
    priority?: boolean;
    style?: React.CSSProperties;
    animate?: any;
    transition?: any;
}

export default function ImageLoader({
    src,
    alt,
    className = '',
    imgClassName = '',
    placeholderClassName = '',
    priority = false,
    style,
    animate,
    transition,
}: ImageLoaderProps) {
    const [isLoaded, setIsLoaded] = useState(priority);
    const [isInView, setIsInView] = useState(priority);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (priority) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '100px',
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [priority]);

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            {/* Placeholder */}
            {!isLoaded && !priority && (
                <div
                    className={`absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 animate-pulse ${placeholderClassName}`}
                />
            )}

            {/* Actual Image */}
            {(isInView || priority) && (
                <motion.img
                    src={src}
                    alt={alt}
                    className={`w-full h-full object-contain ${imgClassName}`}
                    style={style}
                    initial={priority ? { opacity: 1 } : { opacity: 0 }}
                    animate={animate || { opacity: isLoaded ? 1 : 0 }}
                    transition={transition || { duration: 0.3 }}
                    onLoad={() => setIsLoaded(true)}
                    loading={priority ? "eager" : "lazy"}
                />
            )}
        </div>
    );
}
