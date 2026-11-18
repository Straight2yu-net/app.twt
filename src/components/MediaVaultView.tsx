import React, { useState } from 'react';
import { 
  FolderLock, 
  Play, 
  Eye, 
  Heart, 
  Lock, 
  Unlock, 
  Plus, 
  Search, 
  Filter, 
  Sparkles, 
  Download, 
  ShieldCheck,
  Tag,
  Film,
  Camera,
  Trash2
} from 'lucide-react';
import { MediaItem } from '../types/creator';

interface MediaVaultViewProps {
  mediaItems: MediaItem[];
  onSelectMedia: (item: MediaItem) => void;
  onAddMedia: (item: MediaItem) => void;
  onRemoveMedia: (id: string) => void;
  onOpenAiStudio: () => void;
}

export const MediaVaultView: React.FC<MediaVaultViewProps> = ({
  mediaItems,
  onSelectMedia,
  onAddMedia,
  onRemoveMedia,
  onOpenAiStudio,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showWatermark, setShowWatermark] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // New media modal form
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'video' | 'image'>('video');
  const [newCategory, setNewCategory] = useState<MediaItem['category']>('Teaser');
  const [newUrl, setNewUrl] = useState('');
  const [newDuration, setNewDuration] = useState('02:15');
  const [newPrice, setNewPrice] = useState(0);
  const [newTags, setNewTags] = useState('Sacramento, 4K, Exclusive');

  const categories = ['All', 'Teaser', 'PPV Special', 'Exclusive', 'Behind the Scenes', 'Photoshoot', 'Teena Fine Releases', 'Pornhub Full Scenes'];

  const filteredItems = mediaItems.filter((item) => {
    let matchesCategory = false;
    if (selectedCategory === 'All') {
      matchesCategory = true;
    } else if (selectedCategory === 'Teena Fine Releases') {
      matchesCategory = item.tags.some((t) => t.toLowerCase().includes('teena fine') || t.toLowerCase().includes('tina fine')) || item.title.toLowerCase().includes('teena fine');
    } else if (selectedCategory === 'Pornhub Full Scenes') {
      matchesCategory = item.tags.some((t) => t.toLowerCase().includes('pornhub')) || item.title.toLowerCase().includes('pornhub');
    } else {
      matchesCategory = item.category === selectedCategory;
    }

    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const fallbackImg = newType === 'video'
      ? 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
      : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';

    const item: MediaItem = {
      id: `media-${Date.now()}`,
      title: newTitle.trim(),
      type: newType,
      category: newCategory,
      url: newUrl.trim() || (newType === 'video' ? 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' : fallbackImg),
      thumbnailUrl: fallbackImg,
      duration: newType === 'video' ? newDuration : undefined,
      resolution: '4K UHD',
      dateAdded: new Date().toISOString().split('T')[0],
      price: Number(newPrice),
      isLocked: Number(newPrice) > 0,
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      views: 0,
      likes: 0,
    };

    onAddMedia(item);
    setNewTitle('');
    setNewUrl('');
    setNewPrice(0);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Vault Header Strip */}
      <div className="bg-gradient-to-r from-blue-950/40 via-zinc-900 to-zinc-950 border border-blue-900/40 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <FolderLock className="w-3.5 h-3.5 text-blue-400" />
                Digital Vault &amp; Clips Library
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                {mediaItems.length} Staged Assets
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Media Master Catalog &amp; Clip Stager
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Organized repository of high-definition video teasers, full PPV releases, and editorial photosets
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowWatermark(!showWatermark)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                showWatermark
                  ? 'bg-blue-950/60 text-blue-300 border-blue-600/50'
                  : 'bg-zinc-800 text-zinc-400 border-zinc-700'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Watermark: {showWatermark ? 'Active' : 'Off'}</span>
            </button>

            <button
              onClick={onOpenAiStudio}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-950 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate Media in AI Studio</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-950 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Clip / Photoset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white font-bold shadow-sm'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search titles or tags..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
          />
        </div>
      </div>

      {/* Media Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition shadow-xl flex flex-col justify-between"
          >
            {/* Thumbnail Canvas */}
            <div
              onClick={() => onSelectMedia(item)}
              className="relative aspect-video w-full overflow-hidden bg-zinc-950 cursor-pointer"
            >
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />

              {/* Watermark Overlay Simulator */}
              {showWatermark && (
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 text-[9px] font-mono text-zinc-300 backdrop-blur-xs border border-white/10 select-none pointer-events-none">
                  © ChristinaLynn_Official • Sacramento CA
                </div>
              )}

              {/* Category & Lock Status */}
              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white uppercase tracking-wider shadow">
                  {item.category}
                </span>
                {item.isLocked && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-zinc-950 flex items-center gap-1 shadow font-mono">
                    <Lock className="w-2.5 h-2.5" />
                    ${item.price} PPV
                  </span>
                )}
              </div>

              {/* Video Play Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition flex items-center justify-center">
                {item.type === 'video' ? (
                  <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-zinc-900/80 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition">
                    <Eye className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Duration and Resolution Bar */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-zinc-300 font-mono">
                <span className="px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-xs">
                  {item.resolution}
                </span>
                {item.duration && (
                  <span className="px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-xs">
                    {item.duration}
                  </span>
                )}
              </div>
            </div>

            {/* Card Content & Details */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3
                  onClick={() => onSelectMedia(item)}
                  className="text-sm font-bold text-white group-hover:text-rose-400 transition cursor-pointer line-clamp-1"
                >
                  {item.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-zinc-500" />
                    {item.views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 text-rose-400">
                    <Heart className="w-3.5 h-3.5 fill-rose-500/20" />
                    {item.likes.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onSelectMedia(item)}
                    className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-semibold transition cursor-pointer"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => onRemoveMedia(item.id)}
                    className="p-1 text-zinc-600 hover:text-rose-400 transition cursor-pointer"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Media Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-rose-500" />
              Stage New Media Item
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Sacramento Golden Hour Sunset Teaser"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="video">Video Clip</option>
                    <option value="image">Photoset / Still</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="Teaser">Teaser</option>
                    <option value="PPV Special">PPV Special</option>
                    <option value="Exclusive">Exclusive</option>
                    <option value="Behind the Scenes">Behind the Scenes</option>
                    <option value="Photoshoot">Photoshoot</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {newType === 'video' && (
                  <div>
                    <label className="block text-zinc-400 mb-1">Duration (mm:ss)</label>
                    <input
                      type="text"
                      value={newDuration}
                      onChange={(e) => setNewDuration(e.target.value)}
                      placeholder="03:45"
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white font-mono focus:outline-none focus:border-rose-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-zinc-400 mb-1">PPV Unlock Price ($ USD)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    placeholder="0 for subscriber-included"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white font-bold focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Sacramento, Sunset, 4K, Glamour"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold transition cursor-pointer"
                >
                  Add to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
