import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayer } from './PlayerProvider';

const NowPlayingBar = () => {
  const {
    currentTrack,
    playing,
    togglePlay,
    next,
    prev,
    progress,
    duration,
    currentTimeLabel,
    durationLabel,
    setVolume,
    seek,
  } = usePlayer();

  const progressPercent = duration ? Math.min(100, (progress / duration) * 100) : 0;

  const onProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seek(ratio);
  };

  const onVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/5 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Track Info */}
          <div className="hidden md:flex min-w-0 items-center gap-3">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg ring-1 ring-white/10 bg-zinc-900">
              {currentTrack ? (
                <img src={currentTrack.image} alt={currentTrack.title} className="h-full w-full object-cover" />
              ) : null}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm text-zinc-100">{currentTrack ? currentTrack.title : 'Nothing playing'}</p>
              <span className="truncate text-xs text-zinc-400">{currentTrack ? currentTrack.artist : 'Select a playlist'}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-2 w-full md:w-auto">
            <div className="flex items-center gap-4">
              <button className="text-zinc-300 hover:text-white" onClick={prev}><SkipBack size={20} /></button>
              <button
                onClick={togglePlay}
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
              <button className="text-zinc-300 hover:text-white" onClick={next}><SkipForward size={20} /></button>
            </div>
            <div className="flex w-full items-center gap-3">
              <span className="text-[10px] text-zinc-400">{currentTimeLabel}</span>
              <div className="relative h-1 w-full max-w-[520px] rounded-full bg-white/10 cursor-pointer" onClick={onProgressClick}>
                <div className="absolute left-0 top-0 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500" style={{ width: `${progressPercent}%` }} />
              </div>
              <span className="text-[10px] text-zinc-400">{durationLabel}</span>
            </div>
          </div>

          {/* Volume */}
          <div className="hidden md:flex items-center gap-3">
            <Volume2 size={18} className="text-zinc-300" />
            <input type="range" min="0" max="1" step="0.01" defaultValue={0.7} onChange={onVolumeChange} className="w-28 accent-cyan-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingBar;
