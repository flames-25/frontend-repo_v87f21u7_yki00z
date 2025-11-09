import React from 'react';
import { motion } from 'framer-motion';
import { usePlayer } from './PlayerProvider';

const PlaylistCard = ({ playlist }) => {
  const { playPlaylist } = usePlayer();
  return (
    <motion.button
      onClick={() => playPlaylist(playlist.id)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 p-0 backdrop-blur-md"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <img src={playlist.cover} alt={playlist.title} className="h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
      </div>
      <div className="p-4 text-left">
        <h3 className="text-zinc-100 font-medium">{playlist.title}</h3>
        <p className="text-xs text-zinc-400">Tap to play</p>
      </div>
    </motion.button>
  );
};

const PlaylistGrid = () => {
  const { playlists } = usePlayer();
  return (
    <section className="px-6 md:px-10 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-semibold text-zinc-100">Featured Playlists</h2>
        <button className="text-xs text-cyan-300 hover:text-cyan-200">See all</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {playlists.map((p) => (
          <PlaylistCard key={p.id} playlist={p} />
        ))}
      </div>
    </section>
  );
};

export default PlaylistGrid;
