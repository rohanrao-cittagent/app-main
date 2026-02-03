import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  TrendingUp,
  Brain,
  Plug
} from 'lucide-react';



export default function FactoryOps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={containerRef}
      id="factoryops"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      </motion.div>

      <div className="section-content relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="heading-2 text-white mb-6"
          >
            From Anest Iwata Compressors to Assembly Lines—
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
              We Monitor It All
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="body-large text-white/60 max-w-2xl mx-auto"
          >
            Deployment is simple. Our hardware-agnostic platform gets you live data without
            stopping your production line.
          </motion.p>
        </div>

        {/* Process Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Connection Line */}
          {/* Vertical Connection Line */}
          <div className="absolute left-[50%] -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10 hidden md:block" />

          {/* Step 1: Connect */}
          <div className="relative grid md:grid-cols-2 gap-12 items-center mb-24 last:mb-0">
            {/* Left Content - Icon */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pr-8 lg:pr-12 order-2 md:order-1 relative group"
            >
              {/* Horizontal Glow Line (Left) */}
              <div className="absolute top-1/2 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-emerald-500 hidden md:block -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto md:ml-auto md:mr-0">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 flex items-center justify-center backdrop-blur-sm">
                  <Plug className="w-12 h-12 md:w-16 md:h-16 text-emerald-400" />
                </div>
              </div>

              {/* Mobile Text */}
              <div className="mt-6 md:hidden text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white">1</div>
                  <h3 className="text-xl font-bold text-emerald-400">Connect</h3>
                </div>
                <p className="text-white/60">
                  Install non-intrusive sensors on your machinery in under 15 minutes. Plug-and-play compatibility.
                </p>
              </div>
            </motion.div>

            {/* Center Node */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-6 h-6 rounded-full bg-gray-900/50 backdrop-blur-md border-2 border-emerald-500 z-10 box-content shadow-[0_0_15px_rgba(16,185,129,0.8)]"
            />

            {/* Right Content - Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-left pl-8 lg:pl-12 hidden md:block order-1 md:order-2 relative group"
            >
              {/* Horizontal Glow Line (Right) */}
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-l from-transparent via-emerald-500/50 to-emerald-500 hidden md:block -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center justify-start gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white shadow-[0_0_10px_rgba(5,150,105,0.5)]">
                  1
                </div>
                <h3 className="text-2xl font-bold text-emerald-400">Connect</h3>
              </div>
              <p className="text-white/60 leading-relaxed">
                Install non-intrusive sensors on your machinery in under 15 minutes. Plug-and-play compatibility
                with 99% of legacy equipment.
              </p>
            </motion.div>
          </div>


          {/* Step 2: Analyze (Moved to 2nd position, R-L layout) */}
          <div className="relative grid md:grid-cols-2 gap-12 items-center mb-24 last:mb-0">
            {/* Left Content - Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-right pr-8 lg:pr-12 hidden md:block relative group"
            >
              {/* Horizontal Glow Line (Left) */}
              <div className="absolute top-1/2 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-emerald-500 hidden md:block -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center justify-end gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white shadow-[0_0_10px_rgba(5,150,105,0.5)]">
                  2
                </div>
                <h3 className="text-2xl font-bold text-emerald-400">Analyze</h3>
              </div>
              <p className="text-white/60 leading-relaxed">
                Data streams securely to the cloud where AI models analyze frequencies, power consumption,
                and vibration patterns in real-time.
              </p>
            </motion.div>

            {/* Center Node */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-6 h-6 rounded-full bg-gray-900/50 backdrop-blur-md border-2 border-emerald-500 z-10 box-content shadow-[0_0_15px_rgba(16,185,129,0.8)]"
            />

            {/* Right Content - Icon */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pl-8 lg:pl-12 relative group"
            >
              {/* Horizontal Glow Line (Right) */}
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-l from-transparent via-emerald-500/50 to-emerald-500 hidden md:block -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto md:mx-0">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 flex items-center justify-center backdrop-blur-sm">
                  <Brain className="w-12 h-12 md:w-16 md:h-16 text-emerald-400" />
                </div>
              </div>

              {/* Mobile Text (Visible only on small screens) */}
              <div className="mt-6 md:hidden text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white">2</div>
                  <h3 className="text-xl font-bold text-emerald-400">Analyze</h3>
                </div>
                <p className="text-white/60">
                  Data streams securely to the cloud where AI models analyze frequencies, power consumption, and vibration patterns.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Step 3: Optimize (Moved to 3rd position, L-R layout) */}
          <div className="relative grid md:grid-cols-2 gap-12 items-center mb-24 last:mb-0">
            {/* Left Content - Icon */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pr-8 lg:pr-12 order-2 md:order-1 relative group"
            >
              {/* Horizontal Glow Line (Left) */}
              <div className="absolute top-1/2 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-blue-500 hidden md:block -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto md:ml-auto md:mr-0">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 flex items-center justify-center backdrop-blur-sm">
                  <TrendingUp className="w-12 h-12 md:w-16 md:h-16 text-blue-400" />
                </div>
              </div>

              {/* Mobile Text */}
              <div className="mt-6 md:hidden text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">3</div>
                  <h3 className="text-xl font-bold text-blue-400">Optimize</h3>
                </div>
                <p className="text-white/60">
                  Receive instant alerts on downtime risks and OEE bottlenecks via dashboard or mobile app.
                </p>
              </div>
            </motion.div>

            {/* Center Node */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-6 h-6 rounded-full bg-gray-900/50 backdrop-blur-md border-2 border-blue-600 z-10 box-content shadow-[0_0_15px_rgba(37,99,235,0.8)]"
            />

            {/* Right Content - Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-left pl-8 lg:pl-12 hidden md:block order-1 md:order-2 relative group"
            >
              {/* Horizontal Glow Line (Right) */}
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-l from-transparent via-blue-500/50 to-blue-500 hidden md:block -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center justify-start gap-4 mb-4">
                <h3 className="text-2xl font-bold text-blue-400">Optimize</h3>
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-[0_0_10px_rgba(37,99,235,0.5)]">
                  3
                </div>
              </div>
              <p className="text-white/60 leading-relaxed">
                Receive instant alerts on downtime risks and OEE bottlenecks via dashboard or mobile app.
                Take action before failure occurs.
              </p>
            </motion.div>
          </div>





        </div>
      </div>
    </section>
  );
}
