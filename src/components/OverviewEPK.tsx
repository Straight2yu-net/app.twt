import React, { useState } from 'react';
import { 
  Film, 
  Flame, 
  MapPin, 
  Calendar, 
  Award, 
  Eye, 
  Heart, 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  Camera, 
  ArrowRight,
  ShieldCheck,
  Play,
  Video,
  Globe,
  Code,
  CreditCard
} from 'lucide-react';
import { CreatorProfile, IMDbCredit, MediaItem } from '../types/creator';
import { PayPalHostedButton } from './PayPalHostedButton';

interface OverviewEPKProps {
  profile: CreatorProfile;
  credits: IMDbCredit[];
  mediaItems: MediaItem[];
  setActiveTab: (tab: string) => void;
  onOpenAiCopy: () => void;
  onSelectMedia: (item: MediaItem) => void;
  onOpenVirtualBooking: () => void;
}

export const OverviewEPK: React.FC<OverviewEPKProps> = ({
  profile,
  credits,
  mediaItems,
  setActiveTab,
  onOpenAiCopy,
  onSelectMedia,
  onOpenVirtualBooking,
}) => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [activeBioTab, setActiveBioTab] = useState<'epk' | 'imdb' | 'of' | 'specs' | 'adult'>('epk');
  const [featuredClipId, setFeaturedClipId] = useState<string>(mediaItems[0]?.id || 'media-ph-1');
  const [copiedEmbed, setCopiedEmbed] = useState<boolean>(false);

  const selectedFeaturedClip = mediaItems.find((m) => m.id === featuredClipId) || mediaItems[0];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(label);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner Section */}
      <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60 shadow-2xl">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            src={profile.bannerUrl}
            alt="Hero Banner"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
          
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Identity • SAC-CA
            </span>
          </div>
        </div>

        {/* Profile Card Header Info */}
        <div className="px-6 pb-6 sm:px-8 sm:pb-8 relative -mt-20 sm:-mt-24">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <div className="relative group">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover ring-4 ring-zinc-950 shadow-xl border-2 border-rose-500/50"
                />
                <button
                  onClick={() => setActiveTab('ai-studio')}
                  className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-xs text-white transition cursor-pointer backdrop-blur-xs"
                >
                  <Camera className="w-5 h-5 mb-1 text-rose-400" />
                  <span>Update in AI Studio</span>
                </button>
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {profile.name}
                  </h1>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-300 border border-amber-500/40 font-bold">
                    Stage Name: {profile.stageName || 'Teena Fine'}
                  </span>
                  <a
                    href={profile.imdbProUrl || 'https://pro.imdb.com/name/nm1799683/credits/?ref_=nmovr_cdt'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs transition shadow-md"
                  >
                    <span>IMDb PRO: nm1799683</span>
                    <ExternalLink className="w-3 h-3 text-zinc-950" />
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-400">
                  <span className="text-zinc-500">Credited As:</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                    Tina Fine
                  </span>
                  {(profile.aliases || ['Teena Fine', 'Tina Fine', 'Tina Fey', 'Christie Lynn Peterson'])
                    .filter(a => a !== 'Tina Fine')
                    .map((alias) => (
                      <span key={alias} className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium">
                        {alias}
                      </span>
                    ))}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
                  <span className="flex items-center gap-1 text-zinc-300">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    Sacramento, CA
                  </span>
                  <span className="flex items-center gap-1 text-zinc-300">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    June 8, 1986 (Gemini)
                  </span>
                  <span className="flex items-center gap-1 text-zinc-300">
                    <Award className="w-3.5 h-3.5 text-blue-400" />
                    Television &amp; Digital Productions
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              {/* Selected Button 1: OnlyFans Launch Studio */}
              <button
                onClick={() => setActiveTab('onlyfans')}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-extrabold shadow-xl shadow-rose-950/80 border border-rose-400/40 ring-1 ring-rose-500/50 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Flame className="w-4 h-4 text-white fill-white/20 animate-pulse" />
                <span>OnlyFans Studio</span>
                <span className="px-1.5 py-0.5 rounded bg-black/40 text-[10px] text-rose-200 border border-rose-400/30 font-mono">
                  ${profile.subscriptionPrice}/mo
                </span>
              </button>

              {/* Pornhub Videography & Adult Clips Button */}
              <a
                href={profile.pornhubUrl || "https://www.pornhub.com/model/christinalynn_official"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-black text-white text-xs font-bold border border-amber-500/80 shadow-lg shadow-amber-950/40 transition-all hover:scale-[1.02] cursor-pointer group"
              >
                <span className="px-1.5 py-0.5 rounded bg-amber-500 text-zinc-950 text-[10px] font-black tracking-tighter">
                  PORN<span className="bg-zinc-950 text-amber-400 px-0.5 ml-0.5 rounded-xs">HUB</span>
                </span>
                <span>Videography</span>
                <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
                  {profile.pornhubViews || '4.8M Views'}
                </span>
                <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-amber-400" />
              </a>

              {/* 1-on-1 VIP Virtual Bookings for Subscribers */}
              <button
                onClick={onOpenVirtualBooking}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 hover:from-amber-400 hover:to-pink-500 text-zinc-950 text-xs font-black shadow-xl shadow-rose-950/60 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-700"></span>
                </span>
                <Video className="w-4 h-4 text-zinc-950" />
                <span>1-on-1 Virtual Booking</span>
                <span className="px-1.5 py-0.2 rounded bg-zinc-950/20 text-zinc-950 font-mono text-[10px] font-bold">
                  $120+
                </span>
              </button>

              {/* PayPal Hosted Button Instant Session Checkout (Time-with-Teena - $120) */}
              <a
                href="https://www.paypal.com/ncp/payment/67LUNE6LYPVM2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0070BA] hover:bg-[#003087] text-white text-xs font-black shadow-xl shadow-blue-950/70 border border-blue-400/40 transition-all hover:scale-[1.02] cursor-pointer group"
                title="Time-with-Teena: Instant PayPal Virtual Session Reservation ($120)"
              >
                <CreditCard className="w-4 h-4 text-white group-hover:scale-110 transition" />
                <span>Time-with-Teena (PayPal)</span>
                <span className="px-1.5 py-0.5 rounded bg-black/30 text-[10px] text-amber-300 font-mono font-bold">
                  $120
                </span>
                <ExternalLink className="w-3 h-3 text-blue-200" />
              </a>

              <button
                onClick={() => setActiveTab('imdb')}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-500/90 hover:bg-amber-400 text-zinc-950 text-xs font-bold shadow-md transition cursor-pointer"
              >
                <Film className="w-4 h-4" />
                <span>IMDb Sync</span>
              </button>

              <button
                onClick={() => setActiveTab('ai-studio')}
                className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>AI Studio</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Counter Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400 font-medium">Platform Likes</p>
            <p className="text-xl sm:text-2xl font-bold text-white mt-0.5">{profile.totalLikes}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <Heart className="w-5 h-5 fill-rose-500/20" />
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400 font-medium">Active VIP Subscribers</p>
            <p className="text-xl sm:text-2xl font-bold text-white mt-0.5">{profile.totalSubscribers}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Flame className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400 font-medium">Media Vault Clips</p>
            <p className="text-xl sm:text-2xl font-bold text-white mt-0.5">{mediaItems.length} Featured / 348 Total</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Eye className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400 font-medium">IMDb / Screen Credits</p>
            <p className="text-xl sm:text-2xl font-bold text-amber-400 mt-0.5">{credits.length} Titles</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Film className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Content Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Biography & Industry Kit (2 cols on large) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <h2 className="text-base font-bold text-white tracking-wide">
                  Press Kit &amp; Digital Dossier
                </h2>
              </div>

              {/* Bio Tabs */}
              <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-xs">
                <button
                  onClick={() => setActiveBioTab('epk')}
                  className={`px-3 py-1 rounded transition cursor-pointer font-medium ${
                    activeBioTab === 'epk' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Overview Bio
                </button>
                <button
                  onClick={() => setActiveBioTab('imdb')}
                  className={`px-3 py-1 rounded transition cursor-pointer font-medium ${
                    activeBioTab === 'imdb' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  IMDb Bio
                </button>
                <button
                  onClick={() => setActiveBioTab('of')}
                  className={`px-3 py-1 rounded transition cursor-pointer font-medium ${
                    activeBioTab === 'of' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  OnlyFans Bio
                </button>
                <button
                  onClick={() => setActiveBioTab('specs')}
                  className={`px-3 py-1 rounded transition cursor-pointer font-medium ${
                    activeBioTab === 'specs' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Specs
                </button>
                <button
                  onClick={() => setActiveBioTab('adult')}
                  className={`px-3 py-1 rounded transition cursor-pointer font-medium flex items-center gap-1 ${
                    activeBioTab === 'adult' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-amber-400 hover:text-amber-300'
                  }`}
                >
                  <span>Teena Fine Adult Videography</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                </button>
              </div>
            </div>

            {/* Bio Tab Content */}
            <div className="text-sm text-zinc-300 leading-relaxed space-y-3">
              {activeBioTab === 'epk' && (
                <>
                  <p>{profile.bioSummary}</p>
                  <p className="text-zinc-400">
                    Emerging from Sacramento with a dynamic screen presence, Christina brings an authentic West Coast energy to both dramatic television roles and boundary-pushing independent adult and glamour media. Her productions showcase meticulous visual direction, 4K cinematography, and intimate audience engagement.
                  </p>
                  <div className="mt-4 p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-center justify-between">
                    <span className="text-xs text-zinc-400">
                      Need a customized bio or PR statement?
                    </span>
                    <button
                      onClick={onOpenAiCopy}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 transition cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Generate Bio with AI
                    </button>
                  </div>
                </>
              )}

              {activeBioTab === 'imdb' && (
                <div className="whitespace-pre-line text-zinc-300 font-serif text-sm leading-relaxed bg-zinc-950/50 p-4 rounded-xl border border-zinc-800">
                  {profile.imdbBio}
                </div>
              )}

              {activeBioTab === 'of' && (
                <div className="whitespace-pre-line text-zinc-200 text-sm leading-relaxed bg-zinc-950/70 p-4 rounded-xl border border-rose-950/40 font-sans">
                  {profile.ofBio}
                </div>
              )}

              {activeBioTab === 'specs' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                    <span className="text-[11px] text-zinc-400 block">Height</span>
                    <span className="text-sm font-semibold text-white">{profile.height}</span>
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                    <span className="text-[11px] text-zinc-400 block">Measurements</span>
                    <span className="text-sm font-semibold text-white">{profile.measurements}</span>
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                    <span className="text-[11px] text-zinc-400 block">Hair Color</span>
                    <span className="text-sm font-semibold text-white">{profile.hairColor}</span>
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                    <span className="text-[11px] text-zinc-400 block">Eye Color</span>
                    <span className="text-sm font-semibold text-white">{profile.eyeColor}</span>
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                    <span className="text-[11px] text-zinc-400 block">Date of Birth</span>
                    <span className="text-sm font-semibold text-white">June 8, 1986</span>
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                    <span className="text-[11px] text-zinc-400 block">Hometown</span>
                    <span className="text-sm font-semibold text-white">Sacramento, California</span>
                  </div>
                </div>
              )}

              {activeBioTab === 'adult' && (
                <div className="space-y-4 pt-1">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-zinc-950 to-amber-950/30 border border-amber-600/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-500 text-zinc-950 font-black text-xs">
                          TEENA FINE
                        </span>
                        <span className="text-xs text-zinc-400">
                          Also credited as <strong>Tina Fine</strong> &amp; <strong>Tina Fey</strong>
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold">
                        Verified Adult Performer
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Known across top adult entertainment hubs and verified video networks as <strong>Teena Fine</strong>, Christina has generated over <strong>4.8 Million verified video views</strong>. Her adult videography features full-length 4K releases, bespoke penthouse productions, and exclusive subscriber cam recordings.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 block uppercase">Pornhub Views</span>
                      <span className="text-base font-black text-amber-400 font-mono">4.8M+</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 block uppercase">Subscribers</span>
                      <span className="text-base font-black text-white font-mono">38.2K</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 block uppercase">Global Model Rank</span>
                      <span className="text-base font-black text-rose-400 font-mono">#1,420</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 block uppercase">Virtual Cam Rate</span>
                      <span className="text-base font-black text-emerald-400 font-mono">From $120</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                    <div>
                      <h4 className="text-xs font-bold text-white">Private 1-on-1 Virtual Video Bookings</h4>
                      <p className="text-[11px] text-zinc-400">Schedule live webcam dates, personalized Q&amp;A sessions, and interactive calls</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href="https://www.paypal.com/ncp/payment/67LUNE6LYPVM2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-[#0070BA] hover:bg-[#003087] text-white text-xs font-black shadow-md transition cursor-pointer flex items-center gap-1.5"
                        title="Time-with-Teena: PayPal Direct Reservation ($120)"
                      >
                        <CreditCard className="w-3.5 h-3.5 text-white" />
                        <span>Pay $120 via PayPal</span>
                        <ExternalLink className="w-3 h-3 text-blue-200" />
                      </a>
                      <button
                        onClick={onOpenVirtualBooking}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-zinc-950 text-xs font-black shadow-md transition cursor-pointer flex items-center gap-1.5"
                      >
                        <Video className="w-3.5 h-3.5 text-zinc-950" />
                        <span>Book 1-on-1 Virtual Session</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Featured Media Teaser Reel */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Featured Media Clips &amp; Stills</h3>
                <p className="text-xs text-zinc-400">Exclusive 4K teaser reels ready for streaming &amp; platform drop</p>
              </div>
              <button
                onClick={() => setActiveTab('vault')}
                className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>View All ({mediaItems.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Embedded Visual Player Showcase */}
            <div className="mb-6 space-y-3">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border-2 border-amber-500/60 shadow-2xl">
                <iframe
                  src={selectedFeaturedClip?.embedUrl || "https://www.pornhub.com/embed/67e00c37c67e5"}
                  frameBorder="0"
                  width="560"
                  height="315"
                  scrolling="no"
                  allowFullScreen
                  title={selectedFeaturedClip?.title || "Teena Fine Featured Media"}
                  className="w-full h-full"
                />
                <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-lg bg-black/85 text-[11px] font-black text-amber-400 border border-amber-500/60 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                    PORNHUB 4K EMBEDDED PLAYER
                  </span>
                </div>
              </div>

              {/* Embed Information & Quick Actions Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-zinc-950/90 border border-zinc-800 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">
                      {selectedFeaturedClip?.title}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">
                      {selectedFeaturedClip?.resolution}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Embedded Stream • {selectedFeaturedClip?.views?.toLocaleString()} views • Verified Teena Fine Catalogue
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const code = selectedFeaturedClip?.embedIframe || `<iframe src="${selectedFeaturedClip?.embedUrl || 'https://www.pornhub.com/embed/67e00c37c67e5'}" frameborder="0" width="560" height="315" scrolling="no" allowfullscreen></iframe>`;
                      navigator.clipboard.writeText(code);
                      setCopiedEmbed(true);
                      setTimeout(() => setCopiedEmbed(false), 2000);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition cursor-pointer flex items-center gap-1.5"
                    title="Copy <iframe> embed code"
                  >
                    {copiedEmbed ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{copiedEmbed ? 'Embed Code Copied!' : 'Copy Embed Code'}</span>
                  </button>

                  <a
                    href={profile.pornhubUrl || "https://www.pornhub.com/model/teena-fine"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Watch on Pornhub</span>
                  </a>

                  <button
                    onClick={() => onSelectMedia(selectedFeaturedClip || mediaItems[0])}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Expanded View</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Video Selector Thumbnails Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {mediaItems.slice(0, 3).map((item) => {
                const isSelected = selectedFeaturedClip?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setFeaturedClipId(item.id)}
                    className={`group relative rounded-xl overflow-hidden border-2 bg-zinc-950 cursor-pointer transition shadow-md ${
                      isSelected
                        ? 'border-amber-500 ring-2 ring-amber-500/30'
                        : 'border-zinc-800 hover:border-rose-500/50'
                    }`}
                  >
                    <div className="aspect-video w-full relative">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                        {item.type === 'video' && (
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition ${
                            isSelected ? 'bg-amber-500 text-zinc-950' : 'bg-rose-600/90 text-white'
                          }`}>
                            <Play className={`w-4 h-4 ml-0.5 ${isSelected ? 'fill-zinc-950 text-zinc-950' : 'fill-white'}`} />
                          </div>
                        )}
                      </div>
                      {item.duration && (
                        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-zinc-200">
                          {item.duration}
                        </span>
                      )}
                      <div className="absolute top-2 left-2 flex items-center gap-1">
                        <span className="px-1.5 py-0.5 rounded bg-rose-500/80 text-[10px] font-bold text-white uppercase tracking-wider">
                          {item.category}
                        </span>
                        {item.embedUrl && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500 text-zinc-950 text-[10px] font-black">
                            EMBED
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-3">
                      <h4 className="text-xs font-semibold text-white line-clamp-1 group-hover:text-amber-300 transition">
                        {item.title}
                      </h4>
                      <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-1">
                        <span>{item.resolution}</span>
                        <span>{item.isLocked ? `$${item.price} PPV` : 'Free VIP'}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Platform Launch Hub & Social Hub */}
        <div className="space-y-6">
          {/* Platform Hub */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-500" />
              Creator Account Links
            </h3>

            <div className="space-y-3">
              {/* OnlyFans card */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-rose-950/40 to-pink-950/20 border border-rose-800/50 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">OnlyFans Hub</span>
                    <span className="text-[10px] px-1.5 rounded bg-rose-500/20 text-rose-300 font-mono">
                      @{profile.ofHandle}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    ${profile.subscriptionPrice}/mo • 4K Clips &amp; VIP Chat
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => copyToClipboard(`https://onlyfans.com/${profile.ofHandle}`, 'of')}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition cursor-pointer"
                    title="Copy Profile URL"
                  >
                    {copiedLink === 'of' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => setActiveTab('onlyfans')}
                    className="p-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition cursor-pointer"
                    title="Open Launch Studio"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* IMDb card */}
              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">IMDb Pro Registry</span>
                    <span className="text-[10px] px-1.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                      {profile.imdbId}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {credits.length} Verified Credits • Sons of Anarchy &amp; more
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => copyToClipboard(`https://www.imdb.com/name/${profile.imdbId}`, 'imdb')}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition cursor-pointer"
                    title="Copy IMDb URL"
                  >
                    {copiedLink === 'imdb' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => setActiveTab('imdb')}
                    className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 transition cursor-pointer"
                    title="Open IMDb Syncer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Pornhub Channel & Videography Card */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-zinc-950 to-amber-950/30 border border-amber-600/50 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-amber-500 text-zinc-950 text-[10px] font-black tracking-tighter">
                      PORN<span className="bg-zinc-950 text-amber-400 px-0.5 ml-0.5 rounded-xs">HUB</span>
                    </span>
                    <span className="text-xs font-bold text-white">Teena Fine Videography</span>
                    <span className="text-[10px] px-1.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                      @{profile.pornhubHandle || 'teena-fine'}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {profile.pornhubViews || '4.8M'} Views • {profile.pornhubSubscribers || '38.2K'} Subs • {profile.pornhubRank || '#1,420'}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => copyToClipboard(profile.pornhubUrl || 'https://www.pornhub.com/model/teena-fine', 'ph')}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition cursor-pointer"
                    title="Copy Pornhub URL"
                  >
                    {copiedLink === 'ph' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <a
                    href={profile.pornhubUrl || 'https://www.pornhub.com/model/teena-fine'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 transition cursor-pointer font-bold"
                    title="Watch Verified Videography"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* 1-on-1 Virtual VIP Bookings Card with PayPal Hosted Button */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-rose-950/60 via-zinc-900 to-amber-950/40 border border-rose-500/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-xs font-bold text-white">1-on-1 Virtual Bookings</span>
                      <span className="text-[10px] px-1.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                        Live
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Private 15 to 60-min HD video cam sessions starting at $120
                    </p>
                  </div>
                  <button
                    onClick={onOpenVirtualBooking}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-zinc-950 text-xs font-black shadow-md transition cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    <Video className="w-3.5 h-3.5 text-zinc-950" />
                    <span>Book Call</span>
                  </button>
                </div>

                {/* Instant PayPal Session Gateway (Time-with-Teena - $120) */}
                <div className="pt-2.5 border-t border-zinc-800/80 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-amber-300 font-bold flex items-center gap-1">
                      <CreditCard className="w-3 h-3 text-amber-400" />
                      Instant PayPal Checkout: Time-with-Teena
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">ID: 67LUNE6LYPVM2</span>
                  </div>

                  <a
                    href="https://www.paypal.com/ncp/payment/67LUNE6LYPVM2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#0070BA] hover:bg-[#003087] text-white text-xs font-black shadow-md shadow-blue-950/60 transition cursor-pointer"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Pay $120 with PayPal (Instant Slot)</span>
                    <ExternalLink className="w-3 h-3 text-blue-200" />
                  </a>
                </div>
              </div>

              {/* Instagram & Twitter */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
                  <span className="text-[10px] text-zinc-400">Instagram</span>
                  <span className="text-xs font-semibold text-zinc-200 truncate">@{profile.instagramHandle}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
                  <span className="text-[10px] text-zinc-400">Twitter / X</span>
                  <span className="text-xs font-semibold text-zinc-200 truncate">@{profile.twitterHandle}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Credit Highlights */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Film className="w-4 h-4 text-amber-400" />
                Featured Filmography
              </h3>
              <button
                onClick={() => setActiveTab('imdb')}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
              >
                Sync &amp; Edit
              </button>
            </div>

            <div className="space-y-2.5">
              {credits.slice(0, 4).map((credit) => (
                <div
                  key={credit.id}
                  className="p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-center justify-between text-xs"
                >
                  <div>
                    <h5 className="font-semibold text-white">{credit.title}</h5>
                    <p className="text-[11px] text-zinc-400">{credit.role} • {credit.type}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">
                    {credit.year}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Booking & Inquiries */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
              Talent Inquiries &amp; Press
            </h4>
            <p className="text-xs text-zinc-400 mb-3">
              For appearance bookings, commercial glamour, feature collaborations, and press requests.
            </p>
            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center justify-between">
              <span>inquiries@straight2yu.org</span>
              <button
                onClick={() => copyToClipboard('inquiries@straight2yu.org', 'email')}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                {copiedLink === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
