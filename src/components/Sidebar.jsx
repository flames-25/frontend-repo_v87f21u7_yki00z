import React from 'react';
import { Home, ListMusic, User, Search, Settings } from 'lucide-react';

const NavItem = ({ icon: Icon, label, active = false }) => (
  <button
    className={`group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition hover:bg-white/5 ${
      active ? 'text-cyan-300' : 'text-zinc-300'
    }`}
  >
    <Icon size={18} className="opacity-80 group-hover:opacity-100" />
    <span className="tracking-wide">{label}</span>
  </button>
);

const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-white/5 bg-black/40 backdrop-blur-lg">
      <div className="p-4">
        <div className="mb-6 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_2px_rgba(34,211,238,0.7)]" />
          <span className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">NeonWave</span>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input
            placeholder="Search tracks, artists..."
            className="w-full rounded-lg bg-zinc-900/60 pl-9 pr-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 outline-none ring-1 ring-white/10 focus:ring-cyan-400/40"
          />
        </div>
      </div>
      <nav className="px-2 space-y-1">
        <NavItem icon={Home} label="Home" active />
        <NavItem icon={ListMusic} label="Playlists" />
        <NavItem icon={User} label="Profile" />
        <NavItem icon={Settings} label="Settings" />
      </nav>
      <div className="mt-auto p-4">
        <div className="rounded-xl border border-white/5 bg-gradient-to-br from-fuchsia-500/10 via-cyan-500/10 to-purple-500/10 p-4">
          <p className="text-xs text-zinc-300/80">Upgrade to <span className="text-cyan-300">Pro</span> for lossless audio.</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
