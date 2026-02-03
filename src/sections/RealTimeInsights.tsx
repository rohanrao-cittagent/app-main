import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Activity, 
  Thermometer, 
  Wind, 
  Zap,
  Gauge,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertCircle
} from 'lucide-react';

interface MachineData {
  id: string;
  name: string;
  status: 'running' | 'idle' | 'warning' | 'error';
  power: number;
  pressure: number;
  temperature: number;
  efficiency: number;
  runtime: string;
}

const initialMachines: MachineData[] = [
  { id: 'M001', name: 'Compressor A1', status: 'running', power: 45.2, pressure: 7.2, temperature: 65, efficiency: 94, runtime: '2,847h' },
  { id: 'M002', name: 'Compressor A2', status: 'running', power: 42.8, pressure: 7.0, temperature: 62, efficiency: 96, runtime: '3,120h' },
  { id: 'M003', name: 'Compressor B1', status: 'warning', power: 48.5, pressure: 7.8, temperature: 78, efficiency: 87, runtime: '1,956h' },
  { id: 'M004', name: 'Pump Station 1', status: 'running', power: 32.1, pressure: 5.5, temperature: 45, efficiency: 92, runtime: '4,230h' },
  { id: 'M005', name: 'Pump Station 2', status: 'idle', power: 0, pressure: 0, temperature: 28, efficiency: 0, runtime: '1,234h' },
  { id: 'M006', name: 'Generator X1', status: 'running', power: 125.6, pressure: 0, temperature: 82, efficiency: 91, runtime: '5,678h' },
];

function MachineCard({ machine, index }: { machine: MachineData; index: number }) {
  const [data, setData] = useState(machine);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        power: prev.status === 'running' ? prev.power + (Math.random() - 0.5) * 2 : prev.power,
        pressure: prev.status === 'running' ? Math.max(0, prev.pressure + (Math.random() - 0.5) * 0.2) : prev.pressure,
        temperature: prev.status === 'running' ? prev.temperature + (Math.random() - 0.5) * 1.5 : prev.temperature,
        efficiency: prev.status === 'running' ? Math.min(100, Math.max(0, prev.efficiency + (Math.random() - 0.5) * 0.5)) : prev.efficiency,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const statusColors = {
    running: 'bg-emerald-500',
    idle: 'bg-amber-500',
    warning: 'bg-orange-500',
    error: 'bg-red-500',
  };

  const statusBgColors = {
    running: 'from-emerald-500/10 to-emerald-600/5',
    idle: 'from-amber-500/10 to-amber-600/5',
    warning: 'from-orange-500/10 to-orange-600/5',
    error: 'from-red-500/10 to-red-600/5',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className={`relative glass-enhanced rounded-2xl p-5 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 overflow-hidden bg-gradient-to-br ${statusBgColors[data.status]}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${statusColors[data.status]} animate-pulse`} />
            <div>
              <h4 className="text-white font-semibold text-sm">{data.name}</h4>
              <span className="text-xs text-white/50">{data.id}</span>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
            data.status === 'running' ? 'bg-emerald-500/20 text-emerald-400' :
            data.status === 'idle' ? 'bg-amber-500/20 text-amber-400' :
            data.status === 'warning' ? 'bg-orange-500/20 text-orange-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {data.status}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Power */}
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-3 h-3 text-cyan-400" />
              <span className="text-xs text-white/50">Power</span>
            </div>
            <div className="text-lg font-semibold text-white">
              {data.power.toFixed(1)}
              <span className="text-sm text-white/50 ml-1">kW</span>
            </div>
          </div>

          {/* Pressure */}
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Gauge className="w-3 h-3 text-purple-400" />
              <span className="text-xs text-white/50">Pressure</span>
            </div>
            <div className="text-lg font-semibold text-white">
              {data.pressure.toFixed(1)}
              <span className="text-sm text-white/50 ml-1">bar</span>
            </div>
          </div>

          {/* Temperature */}
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Thermometer className="w-3 h-3 text-amber-400" />
              <span className="text-xs text-white/50">Temp</span>
            </div>
            <div className="text-lg font-semibold text-white">
              {data.temperature.toFixed(0)}
              <span className="text-sm text-white/50 ml-1">°C</span>
            </div>
          </div>

          {/* Efficiency */}
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span className="text-xs text-white/50">Efficiency</span>
            </div>
            <div className="text-lg font-semibold text-white">
              {data.efficiency.toFixed(0)}
              <span className="text-sm text-white/50 ml-1">%</span>
            </div>
          </div>
        </div>

        {/* Runtime */}
        <div className="mt-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-white/50">
            <Clock className="w-3 h-3" />
            <span>Runtime: {data.runtime}</span>
          </div>
          {data.status === 'warning' && (
            <div className="flex items-center gap-1 text-orange-400">
              <AlertCircle className="w-3 h-3" />
              <span>Check temp</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function LiveChart() {
  const [dataPoints, setDataPoints] = useState<number[]>([65, 68, 72, 70, 75, 78, 82, 80, 85, 88]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const newValue = prev[prev.length - 1] + (Math.random() - 0.5) * 5;
        return [...prev.slice(1), Math.max(50, Math.min(100, newValue))];
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, rect.height);
    gradient.addColorStop(0, 'rgba(0, 212, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');

    ctx.beginPath();
    ctx.moveTo(0, rect.height);
    
    dataPoints.forEach((value, index) => {
      const x = (index / (dataPoints.length - 1)) * rect.width;
      const y = rect.height - (value / 100) * rect.height;
      ctx.lineTo(x, y);
    });
    
    ctx.lineTo(rect.width, rect.height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    dataPoints.forEach((value, index) => {
      const x = (index / (dataPoints.length - 1)) * rect.width;
      const y = rect.height - (value / 100) * rect.height;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.strokeStyle = '#00d4ff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw points
    dataPoints.forEach((value, index) => {
      const x = (index / (dataPoints.length - 1)) * rect.width;
      const y = rect.height - (value / 100) * rect.height;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#00d4ff';
      ctx.fill();
    });
  }, [dataPoints]);

  return (
    <div className="relative h-32">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

export default function RealTimeInsights() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const overviewStats = [
    { label: 'Total Machines', value: '24', icon: Activity, trend: 'up', change: '+2' },
    { label: 'Running', value: '18', icon: Wind, trend: 'up', change: '+3' },
    { label: 'Avg Efficiency', value: '91%', icon: TrendingUp, trend: 'up', change: '+2.5%' },
    { label: 'Power Consumption', value: '1,247 kW', icon: Zap, trend: 'down', change: '-5%' },
  ];

  return (
    <section 
      ref={containerRef}
      id="insights" 
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
      </motion.div>

      <div className="section-content relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-white/70">Live Dashboard</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="heading-2 text-white mb-6"
          >
            Real-time Insights for
            <span className="text-gradient"> Every Machine</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="body-large text-white/60"
          >
            Monitor all your industrial equipment in real-time with live data feeds, 
            predictive analytics, and instant alerts for optimal performance.
          </motion.p>
        </div>

        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {overviewStats.map((stat, index) => (
            <div key={index} className="glass-enhanced rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-5 h-5 text-cyan-400" />
                <div className={`flex items-center gap-1 text-xs ${
                  stat.trend === 'up' ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Live Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-enhanced rounded-2xl p-6 border border-white/10 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold">Overall Equipment Efficiency</h3>
              <p className="text-sm text-white/50">Real-time performance tracking</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-emerald-400">Live</span>
            </div>
          </div>
          <LiveChart />
        </motion.div>

        {/* Machine Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {initialMachines.map((machine, index) => (
            <MachineCard key={machine.id} machine={machine} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
