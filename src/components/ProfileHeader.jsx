import React from 'react';
import { User } from 'lucide-react';

const ProfileHeader = () => {
  return (
    <section className="px-6 md:px-10 py-8">
      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-purple-500/30 to-cyan-500/30 ring-1 ring-white/10">
          <User className="text-cyan-200" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-zinc-100">Aiko Futaba</h3>
          <p className="text-xs text-zinc-400">Synth Collector • Tokyo-3</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {[{k:'Playlists',v:12},{k:'Followers',v:'3.2k'},{k:'Following',v:128}].map((s) => (
          <div key={s.k} className="rounded-xl border border-white/5 bg-zinc-900/40 p-4 text-center">
            <div className="text-cyan-300 text-lg font-semibold">{s.v}</div>
            <div className="text-[11px] uppercase tracking-widest text-zinc-500">{s.k}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfileHeader;
