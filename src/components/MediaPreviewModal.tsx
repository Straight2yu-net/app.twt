import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Lock, 
  Unlock, 
  Heart, 
  Share2, 
  Download, 
  ShieldCheck, 
  Eye, 
  Calendar,
  Sparkles,
  Code,
  ExternalLink,
  Check
} from 'lucide-react';
import { MediaItem } from '../types/creator';

interface MediaPreviewModalProps {
  item: MediaItem | null;
  onClose: () => void;
}

export const MediaPreviewModal: React.FC<MediaPreviewModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const [isUnlocked, setIsUnlocked] = useState(!item.isLocked);
  const [likesCount, setLikesCount] = useState(item.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isEmbedMode, setIsEmbedMode] = useState<boolean>(Boolean(item.embedUrl));
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  const toggleLike = () => {
    if (hasLiked) {
      setLikesCount(likesCount - 1);
      setHasLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setHasLiked(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-rose-600 text-white uppercase tracking-wider">
              {item.category}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
              {item.title}
            </h3>
            {item.embedUrl && (
              <div className="hidden sm:flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800 text-xs">
                <button
                  onClick={() => setIsEmbedMode(true)}
                  className={`px-2 py-0.5 rounded font-bold transition cursor-pointer ${
                    isEmbedMode ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Pornhub Embed
                </button>
                <button
                  onClick={() => setIsEmbedMode(false)}
                  className={`px-2 py-0.5 rounded font-bold transition cursor-pointer ${
                    !isEmbedMode ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Native Stream
                </button>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Player Canvas */}
        <div className="relative bg-black flex-1 flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[420px]">
          {/* Watermark Simulator */}
          <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded bg-black/60 text-[10px] font-mono text-zinc-300 backdrop-blur-xs border border-white/10 select-none pointer-events-none">
            © ChristinaLynn_Official • Sacramento CA
          </div>

          {/* Paywall Overlay if Locked */}
          {!isUnlocked ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover filter blur-xl brightness-50"
              />
              <div className="relative z-10 w-16 h-16 rounded-full bg-rose-600/30 text-rose-400 flex items-center justify-center border-2 border-rose-500 shadow-2xl">
                <Lock className="w-8 h-8" />
              </div>
              <div className="relative z-10 max-w-md space-y-2">
                <h4 className="text-lg font-bold text-white">Exclusive Subscriber Content</h4>
                <p className="text-xs text-zinc-300">
                  This 4K video drop ({item.duration || 'Full Shoot'}) is reserved for VIP supporters or available for one-time PPV unlock.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setIsUnlocked(true)}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-extrabold text-xs shadow-xl shadow-rose-950 transition cursor-pointer"
                  >
                    Unlock for ${item.price} PPV
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Unlocked View: Video Player, Embed, or Image */
            <div className="w-full h-full flex items-center justify-center">
              {isEmbedMode && item.embedUrl ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-black">
                  <iframe
                    src={item.embedUrl}
                    frameBorder="0"
                    width="560"
                    height="315"
                    scrolling="no"
                    allowFullScreen
                    title={item.title}
                    className="w-full max-w-4xl aspect-video rounded-xl shadow-2xl border-2 border-amber-500/70"
                  />
                </div>
              ) : item.type === 'video' ? (
                <video
                  src={item.url}
                  controls
                  autoPlay
                  playsInline
                  className="w-full max-h-[550px] object-contain"
                  poster={item.thumbnailUrl}
                />
              ) : (
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full max-h-[550px] object-contain"
                />
              )}
            </div>
          )}
        </div>

        {/* Modal Footer & Details */}
        <div className="p-4 px-6 border-t border-zinc-800 bg-zinc-950/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-3 text-zinc-400">
              <span className="text-white font-semibold">{item.resolution}</span>
              {item.duration && <span>• Duration: {item.duration}</span>}
              <span>• Added: {item.dateAdded}</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-zinc-500" />
                {item.views.toLocaleString()} views
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 text-[10px] border border-zinc-800">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {item.embedUrl && (
              <>
                <button
                  onClick={() => {
                    const code = item.embedIframe || `<iframe src="${item.embedUrl}" frameborder="0" width="560" height="315" scrolling="no" allowfullscreen></iframe>`;
                    navigator.clipboard.writeText(code);
                    setCopiedEmbed(true);
                    setTimeout(() => setCopiedEmbed(false), 2000);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition cursor-pointer"
                  title="Copy <iframe> embed code"
                >
                  {copiedEmbed ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{copiedEmbed ? 'Embed Copied!' : 'Copy Embed Code'}</span>
                </button>

                <a
                  href={item.embedUrl.replace('/embed/', '/view_video.php?viewkey=')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold transition cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Watch on Pornhub</span>
                </a>
              </>
            )}

            <button
              onClick={toggleLike}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border transition cursor-pointer ${
                hasLiked
                  ? 'bg-rose-950 text-rose-300 border-rose-600'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:text-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{likesCount.toLocaleString()}</span>
            </button>

            <a
              href={item.url}
              download={`${item.title}.mp4`}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
