import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Image as ImageIcon, 
  Wand2, 
  Sliders, 
  Download, 
  Check, 
  Upload, 
  RefreshCw, 
  Layers, 
  Eye, 
  ArrowRight,
  Maximize2,
  Trash2,
  Info,
  CheckCircle2,
  Flame
} from 'lucide-react';
import { CreatorProfile, MediaItem } from '../types/creator';

interface AiImageStudioProps {
  profile: CreatorProfile;
  mediaItems: MediaItem[];
  onSetAvatar: (url: string) => void;
  onSetBanner: (url: string) => void;
  onAddToVault: (item: MediaItem) => void;
}

interface GeneratedAsset {
  id: string;
  url: string;
  prompt: string;
  model: string;
  aspectRatio: string;
  imageSize: string;
  timestamp: string;
  isEdit?: boolean;
  originalImage?: string;
}

export const AiImageStudio: React.FC<AiImageStudioProps> = ({
  profile,
  mediaItems,
  onSetAvatar,
  onSetBanner,
  onAddToVault,
}) => {
  const [studioMode, setStudioMode] = useState<'create' | 'edit'>('create');
  const [prompt, setPrompt] = useState(
    'A stunning editorial glamour portrait of an attractive 40-year-old brunette actress, warm California golden hour lighting, cinematic 35mm lens, luxury Sacramento penthouse balcony in background, highly detailed, photorealistic'
  );
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [imageSize, setImageSize] = useState<string>('1K');
  const [modelPreference, setModelPreference] = useState<string>('gemini-nano-banana-2.1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancingPrompt, setIsEnhancingPrompt] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Edit Mode Image Input
  const [inputImage, setInputImage] = useState<string | null>(profile.avatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // History of generated items
  const [generatedAssets, setGeneratedAssets] = useState<GeneratedAsset[]>([
    {
      id: 'demo-1',
      url: profile.avatarUrl,
      prompt: 'High-end studio glamour portrait, soft rim light, emerald green hazel eyes, chestnut hair, natural beauty',
      model: 'gemini-nano-banana-2.1',
      aspectRatio: '1:1',
      imageSize: '1K',
      timestamp: 'Just now',
    },
    {
      id: 'demo-2',
      url: profile.bannerUrl,
      prompt: 'Cinematic widescreen luxury penthouse interior with floor to ceiling windows, sunset over the city skyline, warm ambiance',
      model: 'gemini-nano-banana-2.1',
      aspectRatio: '16:9',
      imageSize: '2K',
      timestamp: 'Earlier today',
    },
  ]);

  const [activeAsset, setActiveAsset] = useState<GeneratedAsset>(generatedAssets[0]);

  // Prompt Presets tailored for Christina Lynn Peterson
  const promptPresets = [
    {
      label: 'Sacramento Golden Hour Glamour',
      prompt: 'High-fashion editorial portrait of an attractive mature brunette entertainer, sun-drenched golden hour at Sacramento riverfront, soft bokeh, cinematic 35mm film aesthetic, glowing skin, elegance',
      aspectRatio: '1:1',
    },
    {
      label: 'Hollywood 35mm Film Noir',
      prompt: 'Cinematic Hollywood noir film still of a charismatic woman in black lace silk dress, dramatic Venetian blind shadows, soft studio key light, vintage 1990s color palette, dramatic expression',
      aspectRatio: '3:4',
    },
    {
      label: 'OnlyFans Header Banner (Widescreen)',
      prompt: 'Ultra-wide cinematic luxury penthouse bedroom suite, velvet drapes, warm ambient lighting, city skyline at dusk, sophisticated creator banner aesthetic, 4K resolution',
      aspectRatio: '16:9',
    },
    {
      label: 'Mobile Story Teaser (9:16)',
      prompt: 'Full-length vertical fashion portrait, sun-kissed California lifestyle, stylish silk robe, modern architectural villa with palm trees in soft focus, natural warm sunlight',
      aspectRatio: '9:16',
    },
    {
      label: 'Neon Velvet Studio Glow',
      prompt: 'Studio portrait with vibrant deep rose and amber neon backlight, soft smoke atmosphere, glamorous confident smile, hazel green eyes reflection, high-fashion magazine cover lighting',
      aspectRatio: '1:1',
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setInputImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const enhancePromptWithGemini = async () => {
    try {
      setIsEnhancingPrompt(true);
      setErrorMessage(null);

      const res = await fetch('/api/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'custom',
          details: `Expand and optimize this visual prompt for image generation with gemini-nano-banana-2.1. Make it vivid, specifying lighting (cinematic, warm rim lights), camera optics (35mm f/1.4, bokeh), styling (sophisticated glamour for creator Christina Lynn Peterson), and composition. Keep it under 60 words: "${prompt}"`,
        }),
      });

      const data = await res.json();
      if (data.success && data.text) {
        // Strip markdown quotes if returned
        const cleaned = data.text.replace(/^["']|["']$/g, '').trim();
        setPrompt(cleaned);
      }
    } catch (err: any) {
      console.error('Failed to enhance prompt:', err);
    } finally {
      setIsEnhancingPrompt(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    try {
      setIsGenerating(true);
      setErrorMessage(null);

      const payload: any = {
        prompt: prompt.trim(),
        aspectRatio,
        imageSize,
        modelPreference,
      };

      if (studioMode === 'edit' && inputImage) {
        payload.inputImage = inputImage;
      }

      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success || !data.imageUrl) {
        throw new Error(data.error || 'Failed to generate image. Please try again.');
      }

      const newAsset: GeneratedAsset = {
        id: `gen-${Date.now()}`,
        url: data.imageUrl,
        prompt: prompt.trim(),
        model: data.modelUsed || modelPreference,
        aspectRatio,
        imageSize,
        timestamp: 'Just now',
        isEdit: studioMode === 'edit',
        originalImage: studioMode === 'edit' ? inputImage || undefined : undefined,
      };

      setGeneratedAssets([newAsset, ...generatedAssets]);
      setActiveAsset(newAsset);
    } catch (err: any) {
      console.error('Image generation error:', err);
      setErrorMessage(err.message || 'Image generation failed. Check your API key or parameters.');
    } finally {
      setIsGenerating(false);
    }
  };

  const applyToVault = () => {
    const item: MediaItem = {
      id: `vault-${Date.now()}`,
      title: `AI Studio Drop: ${activeAsset.prompt.slice(0, 32)}...`,
      type: 'image',
      category: 'Exclusive',
      url: activeAsset.url,
      thumbnailUrl: activeAsset.url,
      resolution: activeAsset.imageSize === '4K' ? '4K UHD' : '1080p 60fps',
      dateAdded: new Date().toISOString().split('T')[0],
      price: 0,
      isLocked: false,
      tags: ['AI Generated', 'Nano Banana 2.1', 'Editorial', 'Christina Lynn'],
      views: 120,
      likes: 18,
    };
    onAddToVault(item);
    alert('Asset successfully added to Media Vault!');
  };

  return (
    <div className="space-y-8">
      {/* Visual Studio Header */}
      <div className="bg-gradient-to-r from-purple-950/40 via-zinc-900 to-zinc-950 border border-purple-900/40 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Gemini Nano Banana 2.1 Studio
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                Model: {modelPreference}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Create &amp; Edit High-Res Creator Media
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Synthesize 4K photoshoots, refine existing media, and build OnlyFans avatars &amp; banners with text prompts
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800 text-xs">
            <button
              onClick={() => setStudioMode('create')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold transition cursor-pointer ${
                studioMode === 'create'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Text to Image</span>
            </button>
            <button
              onClick={() => setStudioMode('edit')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold transition cursor-pointer ${
                studioMode === 'edit'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Wand2 className="w-4 h-4" />
              <span>Edit Image</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Prompting & Configuration (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Prompt Box */}
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Wand2 className="w-4 h-4 text-purple-400" />
                {studioMode === 'create' ? 'Text Prompt' : 'Image Edit Instructions'}
              </label>

              <button
                onClick={enhancePromptWithGemini}
                disabled={isEnhancingPrompt}
                className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold transition cursor-pointer disabled:opacity-50"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isEnhancingPrompt ? 'animate-spin' : ''}`} />
                <span>{isEnhancingPrompt ? 'Optimizing...' : 'Magic Enhance'}</span>
              </button>
            </div>

            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                studioMode === 'create'
                  ? 'Describe the scene, lighting, styling, and mood...'
                  : 'e.g., Change lighting to warm golden hour, add subtle bokeh, and place in luxury penthouse suite'
              }
              className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs leading-relaxed focus:outline-none focus:border-purple-500 shadow-inner"
            />

            {/* Quick Inspiration Pills */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-zinc-500 font-medium">Quick Creative Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                {promptPresets.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => {
                      setPrompt(p.prompt);
                      setAspectRatio(p.aspectRatio);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-[11px] text-zinc-300 border border-zinc-800 transition cursor-pointer"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* If Edit Mode: Source Image Picker */}
            {studioMode === 'edit' && (
              <div className="pt-2 border-t border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-300">Base Image to Edit:</span>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Upload Image</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                <div className="flex items-center gap-3 p-2 rounded-xl bg-zinc-950 border border-zinc-800">
                  {inputImage ? (
                    <img
                      src={inputImage}
                      alt="Input Preview"
                      className="w-14 h-14 rounded-lg object-cover ring-1 ring-zinc-700"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-600">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}
                  <div className="text-[11px] text-zinc-400">
                    <p className="text-zinc-200 font-medium">Original Reference Image</p>
                    <p className="text-zinc-500">Pick from below or upload your own snapshot to edit</p>
                  </div>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {[profile.avatarUrl, profile.bannerUrl, ...mediaItems.slice(0, 3).map((m) => m.thumbnailUrl)].map(
                    (src, idx) => (
                      <button
                        key={idx}
                        onClick={() => setInputImage(src)}
                        className={`w-12 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                          inputImage === src ? 'border-purple-500 scale-105' : 'border-zinc-800 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={src} alt="Source thumbnail" className="w-full h-full object-cover" />
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Model & Aspect Ratio Configuration */}
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-purple-400" />
              Generation Parameters
            </h3>

            {/* Aspect Ratio Options */}
            <div>
              <label className="block text-[11px] text-zinc-400 mb-2 font-medium">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { ratio: '1:1', label: '1:1 Square (Avatar)' },
                  { ratio: '9:16', label: '9:16 Story (Mobile)' },
                  { ratio: '16:9', label: '16:9 Banner (Wide)' },
                  { ratio: '3:4', label: '3:4 Portrait' },
                  { ratio: '4:3', label: '4:3 Standard' },
                  { ratio: '4:1', label: '4:1 Ultra Banner' },
                ].map((item) => (
                  <button
                    key={item.ratio}
                    onClick={() => setAspectRatio(item.ratio)}
                    className={`py-2 px-2.5 rounded-lg border text-left transition cursor-pointer ${
                      aspectRatio === item.ratio
                        ? 'bg-purple-950/60 text-purple-200 border-purple-500 font-bold'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="block font-mono text-[11px]">{item.ratio}</span>
                    <span className="text-[10px] text-zinc-500 truncate block">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Resolution Selector (1K, 2K, 4K supported on nano banana 2.1) */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] text-zinc-400 mb-1.5 font-medium">
                  Resolution Size
                </label>
                <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-xs">
                  {['1K', '2K', '4K'].map((res) => (
                    <button
                      key={res}
                      onClick={() => setImageSize(res)}
                      className={`flex-1 py-1 rounded font-semibold text-center transition cursor-pointer ${
                        imageSize === res
                          ? 'bg-purple-600 text-white'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {res}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1.5 font-medium">
                  Target AI Model
                </label>
                <select
                  value={modelPreference}
                  onChange={(e) => setModelPreference(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs focus:outline-none focus:border-purple-500"
                >
                  <option value="gemini-nano-banana-2.1">gemini-nano-banana-2.1 (Ultra 4K)</option>
                  <option value="gemini-3.1-flash-lite-image">gemini-3.1-flash-lite-image (Fast)</option>
                </select>
              </div>
            </div>

            {/* Error Banner if any */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs">
                <p className="font-semibold mb-0.5">Generation Note:</p>
                <p>{errorMessage}</p>
              </div>
            )}

            {/* Generate Action Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-extrabold text-sm shadow-xl shadow-purple-950 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>
                {isGenerating
                  ? 'Synthesizing with Gemini...'
                  : studioMode === 'create'
                  ? 'Generate Image (Nano Banana 2.1)'
                  : 'Execute Image Edits'}
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Output Viewer & Side-by-Side Comparison (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Active Asset Canvas */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-purple-400" />
                  Active Studio Output
                </h3>
                <p className="text-[11px] text-zinc-400">
                  {activeAsset.aspectRatio} • {activeAsset.imageSize} • {activeAsset.model}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <a
                  href={activeAsset.url}
                  download={`christina-lynn-${Date.now()}.png`}
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition cursor-pointer"
                  title="Download Image"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Display Area */}
            {activeAsset.isEdit && activeAsset.originalImage ? (
              /* Before/After side-by-side for Edit Mode */
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <span className="text-[11px] text-zinc-400 font-semibold block text-center">
                    Original Image
                  </span>
                  <div className="rounded-2xl overflow-hidden border border-zinc-800 aspect-square bg-zinc-950">
                    <img
                      src={activeAsset.originalImage}
                      alt="Original"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] text-purple-400 font-semibold block text-center flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Edited Result
                  </span>
                  <div className="rounded-2xl overflow-hidden border-2 border-purple-500 aspect-square bg-zinc-950 shadow-lg">
                    <img
                      src={activeAsset.url}
                      alt="Edited Result"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Single Large Preview */
              <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 flex items-center justify-center min-h-[360px] max-h-[500px] relative shadow-inner">
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center text-center p-8 space-y-3">
                    <div className="w-12 h-12 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
                    <p className="text-sm font-semibold text-white">Generating 4K Image Asset...</p>
                    <p className="text-xs text-zinc-400 max-w-xs">
                      Consulting Gemini Nano Banana 2.1 with prompt composition &amp; lighting optics
                    </p>
                  </div>
                ) : (
                  <img
                    src={activeAsset.url}
                    alt={activeAsset.prompt}
                    className="w-full h-full object-contain max-h-[500px]"
                  />
                )}
              </div>
            )}

            {/* Prompt Meta Box */}
            <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 text-xs space-y-2">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold block">
                Active Prompt
              </span>
              <p className="text-zinc-200 italic leading-relaxed">
                "{activeAsset.prompt}"
              </p>
            </div>

            {/* Integration Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              <button
                onClick={() => {
                  onSetAvatar(activeAsset.url);
                  alert('Updated Profile Avatar across EPK and OnlyFans!');
                }}
                className="py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Set as Avatar</span>
              </button>

              <button
                onClick={() => {
                  onSetBanner(activeAsset.url);
                  alert('Updated Profile Banner across EPK and OnlyFans!');
                }}
                className="py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-blue-400" />
                <span>Set as OF Banner</span>
              </button>

              <button
                onClick={applyToVault}
                className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-rose-950"
              >
                <Flame className="w-4 h-4" />
                <span>Add to Media Vault</span>
              </button>
            </div>
          </div>

          {/* Generated History Strip */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
              Generated Assets History ({generatedAssets.length})
            </h4>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
              {generatedAssets.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => setActiveAsset(asset)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition cursor-pointer relative group ${
                    activeAsset.id === asset.id
                      ? 'border-purple-500 ring-2 ring-purple-500/40 scale-105'
                      : 'border-zinc-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={asset.url} alt={asset.prompt} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 px-1 rounded bg-black/80 text-[8px] font-mono text-zinc-300">
                    {asset.aspectRatio}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
