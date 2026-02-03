import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const reviews = [
  {
    id: 1,
    name: 'Plant Maintenance Manager',
    role: 'Automotive Factory',
    company: '',
    avatar: 'PM',
    rating: 5,
    content: 'The energy intelligence dashboard helped us identify continuous air leaks that were previously invisible. After implementing the recommendations, we reduced idle compressor running by 18–22% and improved overall system stability.',
    metrics: { 'Idle Reduction': '18-22%', 'Stability': 'Improved' },
  },
  {
    id: 2,
    name: 'Energy Manager',
    role: 'Food Processing Plant',
    company: '',
    avatar: 'EM',
    rating: 5,
    content: 'The system clearly showed how over-pressure and poor load control were increasing our energy cost. The root-cause classification helped us prioritise corrective actions and achieve an estimated 12–15% reduction in compressed air energy consumption.',
    metrics: { 'Energy Savings': '12-15%', 'Cost Impact': 'Reduced' },
  },
  {
    id: 3,
    name: 'Operations Head',
    role: 'Metal Fabrication Facility',
    company: '',
    avatar: 'OH',
    rating: 5,
    content: 'Instead of only seeing monthly energy reports, we now get real-time operational insights on compressor efficiency, leaks and abnormal power usage. This helped us justify maintenance interventions and realise 8–10% measurable energy savings within the first quarter.',
    metrics: { 'Q1 Savings': '8-10%', 'Real-time': 'Yes' },
  },
  {
    id: 4,
    name: 'Plant Engineering Manager',
    role: 'Electronics Assembly Facility',
    company: '',
    avatar: 'PE',
    rating: 5,
    content: 'The system provided a clear separation between equipment inefficiency and operational misuse. This helped our engineering team address root causes instead of repeatedly reacting to high energy bills.',
    metrics: { 'Root Cause': 'Identified', 'Efficiency': 'Improved' },
  },
  {
    id: 5,
    name: 'Reliability Engineer',
    role: 'Heavy Engineering Plant',
    company: '',
    avatar: 'RE',
    rating: 5,
    content: 'By correlating power, pressure and load patterns, the platform highlighted early signs of performance degradation in one of our compressors. This allowed us to plan maintenance before a breakdown and avoid unplanned downtime.',
    metrics: { 'Downtime': 'Prevented', 'Predictive': 'Yes' },
  },
];

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <div className="relative h-full glass-enhanced rounded-3xl p-8 lg:p-10 border border-white/10 hover:border-cyan-400/30 transition-all duration-500">
        {/* Quote Icon */}
        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
          <Quote className="w-6 h-6 text-cyan-400" />
        </div>

        {/* Rating */}
        <div className="flex gap-1 mb-6">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Content */}
        <p className="text-white/80 text-lg leading-relaxed mb-8">
          "{review.content}"
        </p>

        {/* Metrics */}
        <div className="flex gap-4 mb-8">
          {Object.entries(review.metrics).map(([key, value]) => (
            <div key={key} className="bg-white/5 rounded-xl px-4 py-2">
              <div className="text-cyan-400 font-bold">{value}</div>
              <div className="text-xs text-white/50 capitalize">{key}</div>
            </div>
          ))}
        </div>

        {/* Author */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
            {review.avatar}
          </div>
          <div>
            <div className="text-white font-semibold">{review.name}</div>
            <div className="text-sm text-white/60">{review.role}</div>
            <div className="text-sm text-cyan-400">{review.company}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CustomerReviews() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section
      ref={containerRef}
      id="reviews"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="section-content relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-white/70">Customer Reviews</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="heading-2 text-white mb-6"
          >
            Trusted by Industry
            <span className="text-gradient"> Leaders</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="body-large text-white/60"
          >
            See how leading manufacturers are transforming their operations
            with FactoryOps AI's intelligent industrial platform.
          </motion.p>
        </div>

        {/* Reviews Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          {/* Main Review Display */}
          <div className="max-w-4xl mx-auto mb-8">
            <AnimatePresence mode="wait">
              <ReviewCard key={currentIndex} review={reviews[currentIndex]} />
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevReview}
              className="w-12 h-12 rounded-full border-white/20 text-white hover:bg-white/10 hover:border-cyan-400/50"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                      ? 'w-8 bg-cyan-400'
                      : 'bg-white/30 hover:bg-white/50'
                    }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextReview}
              className="w-12 h-12 rounded-full border-white/20 text-white hover:bg-white/10 hover:border-cyan-400/50"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 lg:mt-20"
        >
          <div className="glass-enhanced rounded-2xl p-8 border border-white/10">
            <div className="text-center mb-8">
              <p className="text-white/60">Trusted by leading manufacturers across India</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {[
                'Tata Steel',
                'Reliance',
                'L&T',
                'Bharat Forge',
                'Mahindra',
                'Adani',
              ].map((company, index) => (
                <motion.div
                  key={company}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-white/40 font-semibold text-lg hover:text-white/60 transition-colors cursor-default">
                    {company}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
