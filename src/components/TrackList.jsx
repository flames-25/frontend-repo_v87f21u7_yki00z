import React from 'react';
import { Play } from 'lucide-react';
import { usePlayer } from './PlayerProvider';

const TrackList = () => {
  const { playlists, playTrack } = usePlayer();
  const tracks = playlists.flatMap((p) => p.tracks);

  return (
    <section className="px-6 md:px-10 py-8">
      <h2 className="mb-4 text-lg md:text-xl font-semibold text-zinc-100">Trending Tracks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tracks.map((t) => (
          <button key={t.id} onClick={() => playTrack(t)} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-zinc-900/60 p-3 text-left hover:bg-white/5 transition">
            <div className="h-16 w-16 overflow-hidden rounded-xl ring-1 ring-white/10">
              <img src={t.image} alt={t.title} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-zinc-100">{t.title}</div>
              <div className="truncate text-xs text-zinc-400">{t.artist}</div>
            </div>
            <div className="rounded-full bg-cyan-500/20 p-2 text-cyan-200 ring-1 ring-cyan-400/40 group-hover:bg-cyan-500/30">
              <Play size={16} />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default TrackList;
