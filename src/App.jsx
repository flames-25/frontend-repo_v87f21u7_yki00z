import React from 'react';
import HeroCover from './components/HeroCover';
import Sidebar from './components/Sidebar';
import PlaylistGrid from './components/PlaylistGrid';
import NowPlayingBar from './components/NowPlayingBar';

const App = () => {
  return (
    <div className="min-h-screen bg-[#0b0d10] text-white antialiased">
      {/* Layout */}
      <div className="mx-auto max-w-[1400px]">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 min-w-0">
            {/* Hero with Spline */}
            <HeroCover />

            {/* Sections */}
            <PlaylistGrid />

            <section className="px-6 md:px-10 py-8">
              <h2 className="mb-4 text-lg md:text-xl font-semibold text-zinc-100">Now Playing</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-white/5 bg-zinc-900/40 p-6">
                  <div className="mb-4 h-56 rounded-xl bg-gradient-to-br from-cyan-500/30 to-fuchsia-500/30 ring-1 ring-white/10" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-zinc-100">Neon Drive</p>
                      <p className="text-xs text-zinc-400">Arasaka Nights</p>
                    </div>
                    <button className="rounded-full bg-cyan-500/20 px-4 py-2 text-cyan-200 ring-1 ring-cyan-400/40 hover:bg-cyan-500/30 transition">Play</button>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/5 bg-zinc-900/40 p-6">
                  <h3 className="text-sm text-zinc-300">For You</h3>
                  <ul className="mt-3 space-y-3">
                    {[1,2,3,4,5].map((i) => (
                      <li key={i} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                        <span className="text-sm text-zinc-200">Holo Track {i}</span>
                        <span className="text-xs text-cyan-300">+ Add</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Now Playing Bar */}
      <NowPlayingBar />

      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-20 -right-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>
    </div>
  );
};

export default App;
