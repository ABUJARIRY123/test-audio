import * as React from "react";


interface AudioPlayerProps {
  currentSong?: { title: string; src: string };
  songIndex: number;
  songCount: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function AudioPlayer(props: AudioPlayerProps) {
    const { currentSong, songCount, songIndex, onNext, onPrev } = props;
    const audioRef = React.useRef<HTMLAudioElement | null>(null);
    // states
    const [duration, setDuration] = React.useState(0);
  const [isReady, setIsReady] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };
  return (
    <div className="bg-slate-900 text-slate-400 p-3 relative">
      <audio
        ref={audioRef}
        preload="metadata"
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onCanPlay={(e) => {
          setIsReady(true);
        }}
        onPlaying={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source type="audio/mpeg" src={currentSong.src} />
      </audio>
      <div className="text-center mb-1">
        <p className="text-slate-300 font-bold">
          {currentSong?.title ?? "Select a song"}
        </p>
        <p className="text-xs">Singer Name</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 items-center mt-4">
        <div className="flex items-center gap-3 justify-self-center">
          <IconButton
            disabled={!isReady}
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
            size="lg"
          >
            {!isReady && currentSong ? (
              <CgSpinner size={24} className="animate-spin" />
            ) : isPlaying ? (
              <MdPause size={30} />
            ) : (
              <MdPlayArrow size={30} />
            )}
          </IconButton>
        </div>
      </div>
    </div>
  );
}