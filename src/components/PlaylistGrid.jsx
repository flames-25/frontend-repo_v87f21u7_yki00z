import React from 'react';
import { motion } from 'framer-motion';

const playlists = [
  {
    id: 1,
    title: 'Neon Nights',
    color: 'from-fuchsia-500/60 to-purple-500/60',
    cover: '/covers/cover1.jpg',
  },
  { id: 2, title: 'Cyan City', color: 'from-cyan-400/60 to-teal-400/60', cover: '/covers/cover2.jpg' },
  { id: 3, title: 'Ghostwave', color: 'from-purple-500/60 to-cyan-400/60', cover: '/covers/cover3.jpg' },
  { id: 4, title: 'Mag Pulse', color: 'from-pink-500/60 to-fuchsia-500/60', cover: '/covers/cover4.jpg' },
];

const PlaylistCard = ({ title, color }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 p-4 backdrop-blur-md"
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br ${color}`} />
      <div className="relative z-10">
        <div className="mb-20 h-32 w-full rounded-xl bg-black/30 ring-1 ring-white/10" />
        <h3 className="text-left text-zinc-100 font-medium">{title}</h3>
        <p className="text-left text-xs text-zinc-400">32 Tracks • Synthwave</p>
      </div>
    </motion.button>
  );
};

const PlaylistGrid = () => {
  return (
    <section className="px-6 md:px-10 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-semibold text-zinc-100">Featured Playlists</h2>
        <button className="text-xs text-cyan-300 hover:text-cyan-200">See all</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {playlists.map((p) => (
          <PlaylistCard key={p.id} title={p.title} color={p.color} />
        ))}
      </div>
    </section>
  );
};

export default PlaylistGrid;
