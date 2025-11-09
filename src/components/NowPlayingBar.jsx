import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NowPlayingBar = () => {
  const [playing, setPlaying] = React.useState(true);
  const [progress, setProgress] = React.useState(42);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/5 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Track Info */}
          <div className="hidden md:flex min-w-0 items-center gap-3">
            <div className="h-14 w-14 shrink-0 rounded-lg bg-gradient-to-br from-cyan-500/50 to-purple-500/50 ring-1 ring-white/10" />
            <div className="min-w-0">
              <p className="truncate text-sm text-zinc-100">Neon Drive</p>
              <span className="truncate text-xs text-zinc-400">Arasaka Nights</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-2 w-full md:w-auto">
            <div className="flex items-center gap-4">
              <button className="text-zinc-300 hover:text-white"><Shuffle size={18} /></button>
              <button className="text-zinc-300 hover:text-white"><SkipBack size={20} /></button>
              <button
                onClick={() => setPlaying((p) => !p)}
                className="rounded-full bg-cyan-500 text-black p-2.5 hover:bg-cyan-400 transition"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {playing ? (
                    <motion.div key="pause" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
                      <Pause size={18} />
                    </motion.div>
                  ) : (
                    <motion.div key="play" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
                      <Play size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
              <button className="text-zinc-300 hover:text-white"><SkipForward size={20} /></button>
              <button className="text-zinc-300 hover:text-white"><Repeat size={18} /></button>
            </div>
            <div className="flex w-full items-center gap-3">
              <span className="text-[10px] text-zinc-400">1:12</span>
              <div className="relative h-1 w-full max-w-[520px] rounded-full bg-white/10">
                <div className="absolute left-0 top-0 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-[10px] text-zinc-400">3:42</span>
            </div>
          </div>

          {/* Volume */}
          <div className="hidden md:flex items-center gap-3">
            <Volume2 size={18} className="text-zinc-300" />
            <div className="relative h-1 w-28 rounded-full bg-white/10">
              <div className="absolute left-0 top-0 h-1 w-2/3 rounded-full bg-cyan-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingBar;
