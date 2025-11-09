import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

const HeroCover = () => {
  return (
    <section className="relative h-[40vh] md:h-[55vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/BL9Cjn3fkAdLBhXm/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Neon gradient overlay for depth without blocking pointer events */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

      <div className="relative z-10 flex h-full items-end px-6 md:px-10 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white drop-shadow-lg">
            NeonWave
          </h1>
          <p className="mt-3 text-sm md:text-base text-cyan-200/80">
            Stream into the cyber city. Minimal, immersive, and luminous.
          </p>
          <div className="mt-6 flex gap-3">
            <button className="group rounded-full bg-cyan-500/20 px-5 py-2 text-cyan-100 backdrop-blur-md ring-1 ring-cyan-400/40 hover:bg-cyan-500/30 transition">
              <span className="group-hover:tracking-wide transition-all">Start Listening</span>
            </button>
            <button className="rounded-full bg-fuchsia-500/20 px-5 py-2 text-fuchsia-100 backdrop-blur-md ring-1 ring-fuchsia-400/40 hover:bg-fuchsia-500/30 transition">
              Explore</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroCover;
