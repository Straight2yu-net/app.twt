import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Copy, 
  Check, 
  FileText, 
  Flame, 
  Film, 
  MessageSquare,
  Wand2,
  RefreshCw
} from 'lucide-react';
import { CreatorProfile } from '../types/creator';

interface AiContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CreatorProfile;
  onUpdateOfBio: (bio: string) => void;
  onUpdateImdbBio: (bio: string) => void;
}

export const AiContentModal: React.FC<AiContentModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateOfBio,
  onUpdateImdbBio,
}) => {
  if (!isOpen) return null;

  const [contentType, setContentType] = useState<'of_bio' | 'imdb_bio' | 'post_caption' | 'welcome_dm'>('of_bio');
  const [tone, setTone] = useState('Alluring & Exclusive');
  const [extraDetails, setExtraDetails] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [appliedNotice, setAppliedNotice] = useState<string | null>(null);

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      setAppliedNotice(null);

      const res = await fetch('/api/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: contentType,
          tone,
          details: extraDetails,
        }),
      });

      const data = await res.json();
      if (data.success && data.text) {
        setGeneratedText(data.text);
      } else {
        setGeneratedText('Failed to generate copy. Please try again.');
      }
    } catch (err: any) {
      console.error('Error generating copy:', err);
      setGeneratedText('Error connecting to Gemini API.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyToOfBio = () => {
    onUpdateOfBio(generatedText);
    setAppliedNotice('Successfully updated OnlyFans Bio!');
    setTimeout(() => setAppliedNotice(null), 3000);
  };

  const applyToImdbBio = () => {
    onUpdateImdbBio(generatedText);
    setAppliedNotice('Successfully updated IMDb Bio!');
    setTimeout(() => setAppliedNotice(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                AI Publicist &amp; Copywriter (Gemini 3.8 Flash)
              </h3>
              <p className="text-xs text-zinc-400">
                Craft compelling bios, VIP teasers, and IMDb profiles for Christina Lynn Peterson
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-zinc-400 mb-1.5 font-medium">Content Target</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'of_bio', label: 'OnlyFans Bio', icon: Flame },
                { id: 'imdb_bio', label: 'IMDb Biography', icon: Film },
                { id: 'post_caption', label: 'Drop Captions', icon: FileText },
                { id: 'welcome_dm', label: 'VIP Welcome DM', icon: MessageSquare },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setContentType(item.id as any)}
                    className={`flex items-center gap-1.5 p-2 rounded-xl border text-left transition cursor-pointer ${
                      contentType === item.id
                        ? 'bg-rose-950/60 text-rose-200 border-rose-500 font-bold'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 mb-1.5 font-medium">Desired Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:outline-none focus:border-rose-500"
            >
              <option value="Alluring & Exclusive">Alluring &amp; Exclusive (VIP / Seductive)</option>
              <option value="Professional & Industry-Grade">Professional &amp; Industry-Grade (IMDb / Reps)</option>
              <option value="Playful & Charismatic">Playful &amp; Charismatic (California Sun / Casual)</option>
              <option value="Direct & High-Converting">Direct &amp; High-Converting (PPV Teasers)</option>
            </select>

            <div className="mt-3">
              <label className="block text-zinc-400 mb-1.5 font-medium">Special Focus or Directives (Optional)</label>
              <input
                type="text"
                value={extraDetails}
                onChange={(e) => setExtraDetails(e.target.value)}
                placeholder="e.g. Highlight Sacramento heritage and 4K sunset shoot"
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-rose-950 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Generating with Gemini 3.8 Flash...' : 'Generate Polished Copy'}</span>
        </button>

        {/* Output Display */}
        {generatedText && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Generated Result
              </span>

              <div className="flex items-center gap-2">
                {contentType === 'of_bio' && (
                  <button
                    onClick={applyToOfBio}
                    className="text-xs px-2.5 py-1 rounded-lg bg-rose-600/30 text-rose-300 border border-rose-500/40 hover:bg-rose-600 hover:text-white transition font-medium cursor-pointer"
                  >
                    Apply to OnlyFans Bio
                  </button>
                )}
                {contentType === 'imdb_bio' && (
                  <button
                    onClick={applyToImdbBio}
                    className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/30 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-zinc-950 transition font-bold cursor-pointer"
                  >
                    Apply to IMDb Bio
                  </button>
                )}
                <button
                  onClick={copyText}
                  className="text-xs px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {appliedNotice && (
              <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-medium">
                {appliedNotice}
              </div>
            )}

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 max-h-64 overflow-y-auto text-xs text-zinc-200 leading-relaxed whitespace-pre-wrap font-sans">
              {generatedText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
