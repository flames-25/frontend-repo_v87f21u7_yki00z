import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

// Simple player context to manage audio playback across the app
const PlayerContext = createContext(null);

const samplePlaylists = [
  {
    id: 'neon-nights',
    title: 'Neon Nights',
    cover:
      'https://images.unsplash.com/photo-1514511549649-7d3f4f68fb83?q=80&w=1200&auto=format&fit=crop',
    tracks: [
      {
        id: 'track-1',
        title: 'Neon Drive',
        artist: 'Arasaka Nights',
        image:
          'https://images.unsplash.com/photo-1545670723-196ed0954989?q=80&w=1200&auto=format&fit=crop',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      },
      {
        id: 'track-2',
        title: 'Chrome Dreams',
        artist: 'Kitsune',
        image:
          'https://images.unsplash.com/photo-1471440671318-55bdbb772f93?q=80&w=1200&auto=format&fit=crop',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      },
    ],
  },
  {
    id: 'cyan-city',
    title: 'Cyan City',
    cover:
      'https://images.unsplash.com/photo-1542759564-8f5b19f6d3d2?q=80&w=1200&auto=format&fit=crop',
    tracks: [
      {
        id: 'track-3',
        title: 'Night Runner',
        artist: 'Neotokyo',
        image:
          'https://images.unsplash.com/photo-1534159461408-320150ad6b9e?q=80&w=1200&auto=format&fit=crop',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      },
      {
        id: 'track-4',
        title: 'Vapor Streets',
        artist: 'Ghostwave',
        image:
          'https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=1200&auto=format&fit=crop',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
      },
    ],
  },
  {
    id: 'mag-pulse',
    title: 'Mag Pulse',
    cover:
      'https://images.unsplash.com/photo-1514511680784-7f31b13be4e4?q=80&w=1200&auto=format&fit=crop',
    tracks: [
      {
        id: 'track-5',
        title: 'Laser Alley',
        artist: 'VHS Dream',
        image:
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      },
      {
        id: 'track-6',
        title: 'Overclock',
        artist: 'Circuit Breaker',
        image:
          'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200&auto=format&fit=crop',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
      },
    ],
  },
  {
    id: 'ghostwave',
    title: 'Ghostwave',
    cover:
      'https://images.unsplash.com/photo-1518397387277-7843f7251311?q=80&w=1200&auto=format&fit=crop',
    tracks: [
      {
        id: 'track-7',
        title: 'Midnight Synth',
        artist: 'Signal Lost',
        image:
          'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
      },
      {
        id: 'track-8',
        title: 'Neon Rain',
        artist: 'Axiom',
        image:
          'https://images.unsplash.com/photo-1517059224940-d4af9eec41e5?q=80&w=1200&auto=format&fit=crop',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
      },
    ],
  },
];

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [queue, setQueue] = useState([]); // flat array of tracks
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // seconds
  const [duration, setDuration] = useState(0); // seconds
  const [volume, setVolume] = useState(0.7);

  const playlists = useMemo(() => samplePlaylists, []);

  const currentTrack = queue[currentIndex] || null;

  // Attach element listeners
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    const onTime = () => setProgress(audio.currentTime || 0);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      next();
    };

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  // Load current track when index changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!currentTrack) return;
    audio.src = currentTrack.url;
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    // reset progress
    setProgress(0);
  }, [currentIndex, currentTrack?.url]);

  // React to play/pause state
  useEffect(() => {
    const audio = audioRef.current;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing]);

  // React to volume
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const playPlaylist = (playlistId) => {
    const pl = playlists.find((p) => p.id === playlistId);
    if (!pl) return;
    const nextQueue = pl.tracks;
    setQueue(nextQueue);
    setCurrentIndex(0);
    setPlaying(true);
  };

  const playTrack = (track) => {
    // Build queue if empty
    if (queue.length === 0) {
      const allTracks = playlists.flatMap((p) => p.tracks);
      setQueue(allTracks);
      const idx = allTracks.findIndex((t) => t.id === track.id);
      setCurrentIndex(idx >= 0 ? idx : 0);
      setPlaying(true);
      return;
    }
    const idx = queue.findIndex((t) => t.id === track.id);
    if (idx >= 0) setCurrentIndex(idx);
    setPlaying(true);
  };

  const togglePlay = () => setPlaying((p) => !p);

  const next = () => {
    if (queue.length === 0) return;
    setCurrentIndex((i) => (i + 1) % queue.length);
  };

  const prev = () => {
    if (queue.length === 0) return;
    setCurrentIndex((i) => (i - 1 + queue.length) % queue.length);
  };

  const seek = (ratio) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const newTime = Math.max(0, Math.min(duration * ratio, duration));
    audio.currentTime = newTime;
    setProgress(newTime);
  };

  const value = {
    playlists,
    queue,
    currentIndex,
    currentTrack,
    playing,
    progress,
    duration,
    volume,
    // formatted helpers
    currentTimeLabel: formatTime(progress),
    durationLabel: formatTime(duration),
    // controls
    playPlaylist,
    playTrack,
    togglePlay,
    next,
    prev,
    setVolume,
    seek,
  };

  return (
    <PlayerContext.Provider value={value}>
      {/* Hidden audio element for accessibility */}
      <audio ref={audioRef} aria-hidden className="hidden" />
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
};
