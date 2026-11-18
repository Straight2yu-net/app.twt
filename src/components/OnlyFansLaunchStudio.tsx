import React, { useState } from 'react';
import { 
  Flame, 
  Smartphone, 
  Monitor, 
  Sparkles, 
  Copy, 
  Check, 
  Heart, 
  MessageSquare, 
  Lock, 
  DollarSign, 
  Plus, 
  Trash2, 
  ExternalLink,
  ShieldCheck,
  Tag,
  Gift,
  HelpCircle,
  Film,
  Star,
  Video,
  TrendingUp,
  Award
} from 'lucide-react';
import { CreatorProfile, TipMenuItem, MediaItem } from '../types/creator';

interface OnlyFansLaunchStudioProps {
  profile: CreatorProfile;
  tipMenu: TipMenuItem[];
  mediaItems: MediaItem[];
  onUpdateProfile: (updated: Partial<CreatorProfile>) => void;
  onAddTipItem: (item: TipMenuItem) => void;
  onRemoveTipItem: (id: string) => void;
  onOpenAiCopy: () => void;
}

export const OnlyFansLaunchStudio: React.FC<OnlyFansLaunchStudioProps> = ({
  profile,
  tipMenu,
  mediaItems,
  onUpdateProfile,
  onAddTipItem,
  onRemoveTipItem,
  onOpenAiCopy,
}) => {
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [copiedBundle, setCopiedBundle] = useState(false);
  const [copiedBioBadge, setCopiedBioBadge] = useState(false);
  const [activeTabPreview, setActiveTabPreview] = useState<'posts' | 'media' | 'tips'>('posts');

  // Tip Menu Form
  const [showAddTip, setShowAddTip] = useState(false);
  const [newTipTitle, setNewTipTitle] = useState('');
  const [newTipDesc, setNewTipDesc] = useState('');
  const [newTipPrice, setNewTipPrice] = useState(25);
  const [newTipCategory, setNewTipCategory] = useState<TipMenuItem['category']>('Interaction');

  const handleAddTipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTipTitle.trim()) return;

    onAddTipItem({
      id: `tip-${Date.now()}`,
      title: newTipTitle.trim(),
      description: newTipDesc.trim() || 'Custom VIP experience with Christina',
      price: Number(newTipPrice),
      iconName: 'Sparkles',
      category: newTipCategory,
    });

    setNewTipTitle('');
    setNewTipDesc('');
    setNewTipPrice(25);
    setShowAddTip(false);
  };

  const copyLaunchBundle = () => {
    const text = `ONLYFANS PROFILE LAUNCH SPECIFICATION
===================================================
Display Name: ${profile.name} (aka ${profile.stageName || 'Teena Fine'})
Stage Names / Aliases: ${(profile.aliases || ['Teena Fine', 'Tina Fine', 'Tina Fey']).join(' • ')}
Username Handle: @${profile.ofHandle}
Location: ${profile.birthPlace}
Subscription Price: $${profile.subscriptionPrice} / month
Promo Discount: $${profile.promoPrice} / month (${profile.promoDays} days trial)
Pornhub Channel: ${profile.pornhubUrl || 'https://www.pornhub.com/model/teena-fine'} (${profile.pornhubViews || '4.8M Views'})
1-on-1 Virtual Bookings: Active (Rates starting at $120 / 15-min call)

PROFILE BIO:
${profile.ofBio}

TIP MENU & MENU OF SERVICES:
${tipMenu.map(t => `- [${t.category}] ${t.title}: $${t.price} (Description: ${t.description})`).join('\n')}

AUTOMATED WELCOME MESSAGE:
"Hey love! So thrilled you decided to join my inner circle. Known as Teena Fine across adult media and screen productions, I keep things 100% genuine and unfiltered. Check out my pinned posts for the latest 4K teaser, book a 1-on-1 virtual cam session if you want private time together, and drop a reply so I can say hi! 💕 - Teena / Christina"
`;
    navigator.clipboard.writeText(text);
    setCopiedBundle(true);
    setTimeout(() => setCopiedBundle(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Launch Control Header */}
      <div className="bg-gradient-to-r from-rose-950/40 via-zinc-900 to-zinc-950 border border-rose-900/40 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                OnlyFans Launch Suite
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                @{profile.ofHandle}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Profile Staging &amp; Account Architecture
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Tailored specifically for Christina Lynn Peterson • Tier pricing, paywall strategy, and live simulation
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenAiCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>AI Bio Generator</span>
            </button>
            <button
              onClick={copyLaunchBundle}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold transition cursor-pointer shadow-md shadow-rose-950"
            >
              {copiedBundle ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedBundle ? 'Copied Launch Bundle!' : 'Copy Launch Bundle'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Grid: Configuration on Left, Live Mockup on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Account Settings & Tip Menu (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Subscription Tier Pricing */}
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Subscription &amp; Promotion Strategy
            </h3>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">Monthly Subscription</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-zinc-500 font-bold">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={profile.subscriptionPrice}
                      onChange={(e) => onUpdateProfile({ subscriptionPrice: Number(e.target.value) })}
                      className="w-full pl-7 pr-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white font-bold focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Launch Promo Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-zinc-500 font-bold">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={profile.promoPrice || 9.99}
                      onChange={(e) => onUpdateProfile({ promoPrice: Number(e.target.value) })}
                      className="w-full pl-7 pr-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white font-bold focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">OnlyFans Handle</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-zinc-500 font-mono">@</span>
                  <input
                    type="text"
                    value={profile.ofHandle}
                    onChange={(e) => onUpdateProfile({ ofHandle: e.target.value })}
                    className="w-full pl-7 pr-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white font-mono focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Profile Bio (Public)</label>
                <textarea
                  rows={6}
                  value={profile.ofBio}
                  onChange={(e) => onUpdateProfile({ ofBio: e.target.value })}
                  className="w-full p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-rose-500 leading-relaxed font-sans"
                />
              </div>
            </div>
          </div>

          {/* Tip Menu & Services Catalog */}
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Tag className="w-4 h-4 text-purple-400" />
                  Tip Menu &amp; VIP Services
                </h3>
                <p className="text-[11px] text-zinc-400 mt-0.5">High-ticket direct interaction items</p>
              </div>
              <button
                onClick={() => setShowAddTip(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {/* PayPal Instant 1-on-1 Virtual Session Spotlight */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/40 via-zinc-950 to-blue-950/30 border-2 border-amber-500/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[#003087] text-white text-[10px] font-black tracking-wider flex items-center gap-1">
                    PAYPAL VERIFIED SERVICE
                  </span>
                  <span className="text-sm font-black text-emerald-400 font-mono">$120.00 USD</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Time-with-Teena: 1-on-1 Virtual Session</h4>
                  <p className="text-[11px] text-zinc-400">Official PayPal Hosted Button ID: 67LUNE6LYPVM2 • Private video call &amp; interactive cam slot</p>
                </div>
                <a
                  href="https://www.paypal.com/ncp/payment/67LUNE6LYPVM2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-[#0070BA] hover:bg-[#003087] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Pay $120 via PayPal (Time-with-Teena)</span>
                  <ExternalLink className="w-3 h-3 text-blue-200" />
                </a>
              </div>

              {tipMenu.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{item.title}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-medium">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-tight">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-bold text-emerald-400 text-sm font-mono">${item.price}</span>
                    <button
                      onClick={() => onRemoveTipItem(item.id)}
                      className="text-zinc-600 hover:text-rose-400 p-1 transition cursor-pointer"
                      title="Remove tip item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IMDb Pro Celebrity Credibility Lift Card */}
          <div className="bg-gradient-to-br from-amber-950/30 via-zinc-900 to-zinc-950 border border-amber-500/40 rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                IMDb Pro Multiplier (nm1799683)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">
                Tina Fine
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Subscribers trust verified entertainers. Christina's official 14-title filmography on IMDb Pro (including <em>Gangbang Whores</em>, <em>Good Will Humping</em>, and TV appearances in <em>Sons of Anarchy</em>) boosts subscriber lifetime value (LTV) and 1-on-1 booking conversion rates.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1 text-center">
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 uppercase block">Retention Lift</span>
                <span className="text-sm font-black text-amber-400 font-mono">+240% LTV</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 uppercase block">1-on-1 Virtual Rate</span>
                <span className="text-sm font-black text-emerald-400 font-mono">$120 – $400</span>
              </div>
            </div>

            <button
              onClick={() => {
                const bioWithBadge = `${profile.ofBio}\n\n⭐ IMDb Pro Verified Performer (nm1799683) — Tina Fine • 14 Screen Titles • Sacramento CA ⭐`;
                onUpdateProfile({ ofBio: bioWithBadge });
                setCopiedBioBadge(true);
                setTimeout(() => setCopiedBioBadge(false), 2000);
              }}
              className="w-full py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              {copiedBioBadge ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
              <span>{copiedBioBadge ? 'Appended Badge to Bio!' : 'Append IMDb Verified Badge to Bio'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Live Profile Simulation (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-2.5">
            <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              Live OF Page Simulator
            </span>

            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-xs">
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded transition cursor-pointer ${
                  previewDevice === 'mobile' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded transition cursor-pointer ${
                  previewDevice === 'desktop' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
            </div>
          </div>

          {/* Device Mockup Shell */}
          <div className={`mx-auto transition-all duration-300 ${previewDevice === 'mobile' ? 'max-w-md' : 'w-full'}`}>
            <div className="rounded-3xl overflow-hidden border-4 border-zinc-800 bg-zinc-950 shadow-2xl">
              {/* Header Banner */}
              <div className="h-44 sm:h-52 w-full relative">
                <img
                  src={profile.bannerUrl}
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
              </div>

              {/* Profile Bar */}
              <div className="px-5 pb-5 relative -mt-14 space-y-4">
                <div className="flex items-end justify-between">
                  <div className="relative">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="w-24 h-24 rounded-full object-cover ring-4 ring-zinc-950 border-2 border-rose-500 shadow-xl"
                    />
                    <span className="absolute bottom-0 right-1 bg-zinc-950 rounded-full p-0.5">
                      <ShieldCheck className="w-5 h-5 text-blue-400 fill-blue-500/20" />
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition shadow-md shadow-rose-950 flex items-center gap-1.5 cursor-pointer">
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      <span>Follow</span>
                    </button>
                  </div>
                </div>

                {/* Names, IMDb Pro Verified Badge and handle */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <h2 className="text-lg font-bold text-white tracking-tight">
                      {profile.name}
                    </h2>
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    <a
                      href={profile.imdbProUrl || 'https://pro.imdb.com/name/nm1799683/credits/?ref_=nmovr_cdt'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-[10px] tracking-tight transition shadow-xs"
                      title="Open verified IMDb Pro filmography (nm1799683)"
                    >
                      <Star className="w-3 h-3 fill-zinc-950 text-zinc-950" />
                      <span>IMDb Pro: nm1799683</span>
                    </a>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                    <span className="font-mono text-rose-400 font-bold">@{profile.ofHandle}</span>
                    <span>•</span>
                    <span className="text-amber-300 font-medium text-[11px]">aka Tina Fine / Teena Fine</span>
                  </div>
                  <p className="text-[11px] text-zinc-500">
                    {profile.totalMediaCount} posts • {profile.totalLikes} likes • Sacramento, CA (06/08/1986)
                  </p>
                </div>

                {/* Subscribe Button Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/70 to-pink-950/60 border border-rose-800/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      SUBSCRIBE (30 DAYS)
                    </span>
                    <span className="text-sm font-extrabold text-white font-mono">
                      ${profile.promoPrice || profile.subscriptionPrice} / mo
                    </span>
                  </div>
                  <button className="w-full py-2.5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-extrabold transition shadow-lg cursor-pointer">
                    SUBSCRIBE FOR ${profile.promoPrice || profile.subscriptionPrice}
                  </button>
                  <p className="text-[10px] text-center text-zinc-300">
                    Includes direct messaging, daily photo drops, and exclusive clip access
                  </p>
                </div>

                {/* Bio text in mockup */}
                <div className="text-xs text-zinc-300 whitespace-pre-line leading-relaxed bg-zinc-900/50 p-3.5 rounded-xl border border-zinc-800">
                  {profile.ofBio}
                </div>

                {/* Feed Tabs in Mockup */}
                <div className="border-b border-zinc-800 flex items-center justify-around text-xs font-semibold text-zinc-400 pt-1">
                  <button
                    onClick={() => setActiveTabPreview('posts')}
                    className={`pb-2.5 relative ${activeTabPreview === 'posts' ? 'text-rose-400 font-bold border-b-2 border-rose-500' : 'hover:text-white'}`}
                  >
                    Posts ({mediaItems.length})
                  </button>
                  <button
                    onClick={() => setActiveTabPreview('media')}
                    className={`pb-2.5 relative ${activeTabPreview === 'media' ? 'text-rose-400 font-bold border-b-2 border-rose-500' : 'hover:text-white'}`}
                  >
                    Media
                  </button>
                  <button
                    onClick={() => setActiveTabPreview('tips')}
                    className={`pb-2.5 relative ${activeTabPreview === 'tips' ? 'text-rose-400 font-bold border-b-2 border-rose-500' : 'hover:text-white'}`}
                  >
                    Tip Menu ({tipMenu.length})
                  </button>
                </div>

                {/* Mockup Feed Stream */}
                {activeTabPreview === 'posts' && (
                  <div className="space-y-4 pt-1">
                    {/* Pinned Post */}
                    <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <img
                            src={profile.avatarUrl}
                            alt="Avatar"
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <div>
                            <span className="font-bold text-white block text-[11px]">{profile.name}</span>
                            <span className="text-[10px] text-zinc-500">Pinned Post • Sacramento Sun</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-rose-400 font-semibold">PINNED</span>
                      </div>

                      <p className="text-xs text-zinc-200">
                        Welcome to my page! Born 06/08/1986 in Sacramento, CA. So excited to share my exclusive 4K content series with you all. Drop a comment below! ✨💋
                      </p>

                      <div className="rounded-lg overflow-hidden relative aspect-video bg-zinc-950">
                        <img
                          src={mediaItems[0]?.thumbnailUrl || profile.bannerUrl}
                          alt="Post Media"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
                        <span className="flex items-center gap-1 text-rose-400 font-medium">
                          <Heart className="w-3.5 h-3.5 fill-rose-500/20" /> 1,248 Likes
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" /> 84 Comments
                        </span>
                      </div>
                    </div>

                    {/* Locked Paywall Post */}
                    <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <img
                            src={profile.avatarUrl}
                            alt="Avatar"
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <div>
                            <span className="font-bold text-white block text-[11px]">{profile.name}</span>
                            <span className="text-[10px] text-zinc-500">2 hours ago • VIP Only</span>
                          </div>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">
                          $24.99 PPV
                        </span>
                      </div>

                      <p className="text-xs text-zinc-200">
                        Silk &amp; Satin Penthouse Suite (Full 18-minute 4K release). My most intimate and complete drop yet. Unlock now! 🔥
                      </p>

                      <div className="rounded-lg overflow-hidden relative aspect-video bg-zinc-950 flex flex-col items-center justify-center border border-zinc-800/80">
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>
                        <div className="relative z-10 text-center space-y-2 px-4">
                          <div className="w-10 h-10 rounded-full bg-rose-600/30 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/50">
                            <Lock className="w-5 h-5" />
                          </div>
                          <p className="text-xs font-semibold text-white">Post Locked For Subscribers</p>
                          <button className="px-4 py-1.5 rounded-full bg-rose-600 text-white text-xs font-bold shadow-md cursor-pointer hover:bg-rose-500 transition">
                            Unlock for $24.99
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* IMDb Pro Retrospective & 1-on-1 Cam Announcement Post */}
                    <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-950/30 via-zinc-900 to-zinc-900/90 border border-amber-500/40 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <img
                            src={profile.avatarUrl}
                            alt="Avatar"
                            className="w-7 h-7 rounded-full object-cover ring-1 ring-amber-500/50"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-white block text-[11px]">{profile.name}</span>
                              <span className="px-1.5 py-0.2 rounded bg-amber-500 text-zinc-950 text-[9px] font-black">
                                IMDb PRO
                              </span>
                            </div>
                            <span className="text-[10px] text-amber-300/80 font-mono">Tina Fine Screen Archive • 5h ago</span>
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                          FEATURED
                        </span>
                      </div>

                      <p className="text-xs text-zinc-200 leading-relaxed">
                        ⭐️ <strong>From the Vault: Tina Fine IMDb Pro Retrospective (nm1799683)</strong> ⭐️<br />
                        For all my VIP subscribers: Ever wondered what it was like filming <em>Gangbang Whores</em>, <em>Good Will Humping</em>, or my TV guest appearances on FX's <em>Sons of Anarchy</em>? I've unlocked the 4K remastered archival set with my personal commentary in the vault!<br /><br />
                        Also: <strong>3 private 1-on-1 virtual cam dates</strong> are open this weekend ($120–$400). Send a tip or DM to reserve your time! 💕💋
                      </p>

                      <div className="grid grid-cols-2 gap-1.5 rounded-lg overflow-hidden border border-zinc-800">
                        <div className="aspect-video relative bg-zinc-950">
                          <img
                            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=400&q=80"
                            alt="Archive Reel 1"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-amber-300">
                            Good Will Humping (2007)
                          </span>
                        </div>
                        <div className="aspect-video relative bg-zinc-950">
                          <img
                            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80"
                            alt="Archive Reel 2"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-amber-300">
                            Gangbang Whores (2012)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-zinc-800/80">
                        <span className="flex items-center gap-1 text-rose-400 font-medium">
                          <Heart className="w-3.5 h-3.5 fill-rose-500/20" /> 2,490 Likes
                        </span>
                        <span className="flex items-center gap-1 text-zinc-300">
                          <MessageSquare className="w-3.5 h-3.5" /> 162 Comments
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTabPreview === 'media' && (
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {mediaItems.map((m) => (
                      <div key={m.id} className="aspect-square rounded-lg overflow-hidden relative bg-zinc-900">
                        <img src={m.thumbnailUrl} alt={m.title} className="w-full h-full object-cover" />
                        {m.isLocked && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-rose-400">
                            <Lock className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTabPreview === 'tips' && (
                  <div className="space-y-2 pt-1">
                    {tipMenu.map((t) => (
                      <div key={t.id} className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-semibold text-white block">{t.title}</span>
                          <span className="text-[10px] text-zinc-400">{t.description}</span>
                        </div>
                        <button className="px-3 py-1 rounded bg-rose-600/20 text-rose-300 border border-rose-500/40 font-bold hover:bg-rose-600 hover:text-white transition cursor-pointer">
                          Tip ${t.price}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Tip Item Modal */}
      {showAddTip && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-purple-400" />
              Add Tip Menu Service Item
            </h3>

            <form onSubmit={handleAddTipSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1">Item Title *</label>
                <input
                  type="text"
                  required
                  value={newTipTitle}
                  onChange={(e) => setNewTipTitle(e.target.value)}
                  placeholder="e.g. VIP Priority DM or Custom 60s Video"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">Price ($ USD)</label>
                  <input
                    type="number"
                    value={newTipPrice}
                    onChange={(e) => setNewTipPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white font-bold focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Category</label>
                  <select
                    value={newTipCategory}
                    onChange={(e) => setNewTipCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Interaction">Interaction</option>
                    <option value="Custom">Custom Content</option>
                    <option value="Media">Media Vault</option>
                    <option value="Perk">VIP Perk</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Description / What Subscriber Gets</label>
                <textarea
                  rows={3}
                  value={newTipDesc}
                  onChange={(e) => setNewTipDesc(e.target.value)}
                  placeholder="Explain exactly what the subscriber receives when tipping this amount..."
                  className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTip(false)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold transition cursor-pointer"
                >
                  Add to Tip Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
