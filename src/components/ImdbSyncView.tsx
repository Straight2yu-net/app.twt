import React, { useState } from 'react';
import { 
  Film, 
  Star, 
  Calendar, 
  MapPin, 
  Plus, 
  ExternalLink, 
  Sparkles, 
  Copy, 
  Check, 
  FileText, 
  Trash2, 
  Award,
  TrendingUp,
  Share2,
  Megaphone,
  Users,
  Video,
  Flame,
  ShieldCheck,
  Zap,
  BarChart2,
  Code,
  Tag,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { CreatorProfile, IMDbCredit } from '../types/creator';

interface ImdbSyncViewProps {
  profile: CreatorProfile;
  credits: IMDbCredit[];
  onAddCredit: (credit: IMDbCredit) => void;
  onRemoveCredit: (id: string) => void;
  onOpenAiCopy: () => void;
  setActiveTab?: (tab: string) => void;
  onOpenVirtualBooking?: () => void;
}

export const ImdbSyncView: React.FC<ImdbSyncViewProps> = ({
  profile,
  credits,
  onAddCredit,
  onRemoveCredit,
  onOpenAiCopy,
  setActiveTab,
  onOpenVirtualBooking,
}) => {
  const [filterType, setFilterType] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedSubmission, setCopiedSubmission] = useState(false);
  const [activeEngineTab, setActiveEngineTab] = useState<'campaigns' | 'generator' | 'badges' | 'analytics'>('campaigns');

  // Copy notification states
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Dynamic Film Post Generator state
  const [selectedFilmId, setSelectedFilmId] = useState<string>(credits[0]?.id || 'cred-nm-1');
  const [promoAngle, setPromoAngle] = useState<'vault' | 'booking' | 'trivia' | 'ppv'>('vault');

  // New credit form state
  const [newTitle, setNewTitle] = useState('');
  const [newYear, setNewYear] = useState(new Date().getFullYear());
  const [newRole, setNewRole] = useState('');
  const [newType, setNewType] = useState<IMDbCredit['type']>('Movie');
  const [newNotes, setNewNotes] = useState('');

  const filteredCredits = filterType === 'All'
    ? credits
    : credits.filter(c => c.type === filterType);

  const selectedCreditForGenerator = credits.find(c => c.id === selectedFilmId) || credits[0];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const credit: IMDbCredit = {
      id: `cred-${Date.now()}`,
      title: newTitle.trim(),
      year: Number(newYear),
      role: newRole.trim() || 'Performer (as Tina Fine)',
      type: newType,
      notes: newNotes.trim(),
      status: 'Released',
      posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=400&q=80',
    };

    onAddCredit(credit);
    setNewTitle('');
    setNewRole('');
    setNewNotes('');
    setShowAddModal(false);
  };

  const imdbProLink = profile.imdbProUrl || 'https://pro.imdb.com/name/nm1799683/credits/?ref_=nmovr_cdt';
  const imdbPublicLink = profile.imdbUrl || 'https://www.imdb.com/name/nm1799683/';

  const copyWithFeedback = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const generateImdbSubmissionText = () => {
    return `IMDb PRO VERIFIED RECORD & CREDITS SHEET
=============================================
Legal / Birth Name: Christina Lynne Peterson
Primary IMDb Stage Name: Tina Fine
Aliases: Teena Fine, Tina Fey, Christie Lynn Peterson
IMDb Identifier: ${profile.imdbId || 'nm1799683'}
IMDb Pro URL: ${imdbProLink}
Public IMDb URL: ${imdbPublicLink}
Birth Date: June 8, 1986
Birth Place: Sacramento, California, USA
Height: ${profile.height || "5' 4\" (1.63 m)"}
Hair: ${profile.hairColor || 'Chestnut / Blonde'}
Eyes: ${profile.eyeColor || 'Hazel Green'}

BIOGRAPHY & CAREER SUMMARY:
${profile.imdbBio}

OFFICIAL FILMOGRAPHY CREDITS (${credits.length} Titles Listed):
${credits.map((c, i) => `${i + 1}. "${c.title}" (${c.year}) - Role: ${c.role} [${c.type}] | Notes: ${c.notes || 'N/A'}`).join('\n')}

INDUSTRY & SUBSCRIBER REACH HIGHLIGHTS:
- Screen appearances spanning 2005 to 2024, credited across adult entertainment and dramatic broadcast television.
- Dramatic television appearances in Sons of Anarchy (FX, 2011) and Private Practice (ABC, 2010).
- High-performing digital brand with over 4.8M Pornhub streams, 38.2K channel followers, and active OnlyFans VIP subscription tier.
- Private 1-on-1 virtual cam booking service available for verified subscribers.
`;
  };

  // Generate promotional captions based on selected credit and angle
  const getDynamicFilmPromo = () => {
    if (!selectedCreditForGenerator) return '';

    const title = selectedCreditForGenerator.title;
    const year = selectedCreditForGenerator.year;
    const role = selectedCreditForGenerator.role;

    switch (promoAngle) {
      case 'vault':
        return `🌟 ARCHIVAL VAULT UNLOCKED: "${title}" (${year}) 🌟\n\nDirect from my verified IMDb filmography (credited as ${role})! For my OnlyFans subscribers, I just uploaded the fully remastered, uncut 4K archival reel and director's commentary track.\n\nCatch what made this release iconic + exclusive behind-the-scenes memories! Unlock instantly on my page 💋\n\n🔗 onlyfans.com/${profile.ofHandle}\n#TinaFine #TeenaFine #IMDbPro #ArchivalDrop #SacramentoCreator #Exclusive`;

      case 'booking':
        return `🔥 1-ON-1 VIP VIRTUAL SESSIONS WITH TINA FINE 🔥\n\nLoved my work in "${title}" and across my verified screen productions? Come hang out with me in private! I'm opening a limited number of 1-on-1 live HD video cam calls this week ($120 - $400).\n\nLet's chat about your favorite scenes, do a custom interactive show, or just have an intimate conversation. Reserve your slot now! 💕\n\nBook direct: onlyfans.com/${profile.ofHandle}\n#1on1Booking #TinaFine #TeenaFine #VIPCam #LiveInteraction`;

      case 'trivia':
        return `🎬 DID YOU KNOW? "${title}" (${year}) Trivia! 🎬\n\nWhen we shot "${title}", I was credited under my entertainer name ${role}. Did you know you can view my full verified 14-title filmography on IMDb Pro (nm1799683)?\n\nCheck out the full credits list and then hop over to my OnlyFans for the uncensored 4K behind-the-scenes photoset!\n\n✨ IMDb: ${imdbProLink}\n✨ OnlyFans: onlyfans.com/${profile.ofHandle}\n#BehindTheScenes #TinaFine #IMDbPro #FilmTrivia #Sacramento`;

      case 'ppv':
        return `🔒 EXCLUSIVE PPV DROP: "${title}" 4K Remastered Special 🔒\n\nMy private cut of "${title}" is officially available for subscribers! 20+ minutes of high-bitrate, uncut adult entertainment perfection that you won't find on public tube sites.\n\nTip $24.99 to unlock or DM me with the keyword "${title.toUpperCase()}"! 💋\n\n🔗 onlyfans.com/${profile.ofHandle}\n#PPV #TinaFine #TeenaFine #AdultEntertainment #4KUHD`;

      default:
        return '';
    }
  };

  return (
    <div className="space-y-8">
      {/* IMDb Pro Style Header Card */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="bg-gradient-to-r from-amber-500/20 via-zinc-900 to-zinc-950 p-6 sm:p-8 border-b border-zinc-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded bg-amber-500 text-zinc-950 text-xs font-black tracking-wider shadow-sm">
                  IMDb PRO VERIFIED
                </span>
                <span className="text-xs text-amber-300 font-mono font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/50">
                  ID: {profile.imdbId || 'nm1799683'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  14 Verified Screen Titles
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {profile.name}
              </h1>
              <div className="text-xs sm:text-sm text-zinc-300 mt-1.5 flex flex-wrap items-center gap-2">
                <span className="text-amber-400 font-bold">IMDb Credited Name: <strong>Tina Fine</strong></span>
                <span>•</span>
                <span className="text-zinc-400">Aliases: Teena Fine, Tina Fey, Christie Lynn Peterson</span>
                <span>•</span>
                <span className="text-zinc-400">Sacramento, CA (Born 06/08/1986)</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={imdbProLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-black transition cursor-pointer shadow-md shadow-amber-950/50"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open IMDb Pro (nm1799683)</span>
              </a>

              <a
                href={imdbPublicLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 transition cursor-pointer"
              >
                <span>Public IMDb</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>

              <button
                onClick={onOpenAiCopy}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Enhance Bio</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(generateImdbSubmissionText());
                  setCopiedSubmission(true);
                  setTimeout(() => setCopiedSubmission(false), 2000);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold border border-zinc-700 transition cursor-pointer"
              >
                {copiedSubmission ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSubmission ? 'Copied Data Sheet!' : 'Copy Data Sheet'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Biographical Overview in IMDb Style */}
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-zinc-800 bg-zinc-950/60 text-xs">
          <div className="p-4 sm:p-5">
            <span className="text-zinc-500 block mb-1 uppercase font-medium tracking-wider text-[10px]">
              Born &amp; Origin
            </span>
            <span className="text-white font-semibold block text-sm">
              June 8, 1986 (Gemini)
            </span>
            <span className="text-zinc-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-rose-400" />
              Sacramento, California, USA
            </span>
          </div>

          <div className="p-4 sm:p-5">
            <span className="text-zinc-500 block mb-1 uppercase font-medium tracking-wider text-[10px]">
              IMDb Physical Attributes
            </span>
            <span className="text-white font-semibold block text-sm">
              Height: {profile.height || "5' 4\" (1.63 m)"}
            </span>
            <span className="text-zinc-400 block mt-0.5">
              {profile.hairColor} • {profile.eyeColor}
            </span>
          </div>

          <div className="p-4 sm:p-5">
            <span className="text-zinc-500 block mb-1 uppercase font-medium tracking-wider text-[10px]">
              Screen Credibility
            </span>
            <span className="text-amber-400 font-bold block text-sm">
              {credits.length} Verified Titles
            </span>
            <span className="text-zinc-400 block mt-0.5">
              TV Drama (FX / ABC) &amp; Adult Features
            </span>
          </div>

          <div className="p-4 sm:p-5">
            <span className="text-zinc-500 block mb-1 uppercase font-medium tracking-wider text-[10px]">
              Subscriber Reach Status
            </span>
            <span className="text-emerald-400 font-semibold block text-sm flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified Star Multiplier
            </span>
            <span className="text-zinc-400 block mt-0.5">
              4.8M+ Views • 1-on-1 Cam Active
            </span>
          </div>
        </div>
      </div>

      {/* NEW: SUBSCRIBER REACH & MARKETING ENGINE (IMDb PRO × ONLYFANS) */}
      <div className="bg-gradient-to-br from-amber-950/30 via-zinc-900 to-rose-950/20 border-2 border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Megaphone className="w-3.5 h-3.5" />
                Subscriber Reach Multiplier
              </span>
              <span className="text-xs text-rose-400 font-semibold flex items-center gap-1">
                <Flame className="w-3 h-3" />
                IMDb Pro × OnlyFans Funnel
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Filmography-Driven Subscriber Growth &amp; Promotion Engine
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1">
              Turn verified IMDb Pro credentials (<span className="text-amber-400 font-mono">nm1799683</span>) into high-ticket subscribers, VIP cam bookings, and cross-platform traction.
            </p>
          </div>

          {/* Engine Subtabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800 text-xs">
            <button
              onClick={() => setActiveEngineTab('campaigns')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer font-bold flex items-center gap-1.5 ${
                activeEngineTab === 'campaigns' ? 'bg-amber-500 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>Pre-Built Campaigns</span>
            </button>

            <button
              onClick={() => setActiveEngineTab('generator')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer font-bold flex items-center gap-1.5 ${
                activeEngineTab === 'generator' ? 'bg-amber-500 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Film Post Generator</span>
            </button>

            <button
              onClick={() => setActiveEngineTab('badges')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer font-bold flex items-center gap-1.5 ${
                activeEngineTab === 'badges' ? 'bg-amber-500 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Badges</span>
            </button>

            <button
              onClick={() => setActiveEngineTab('analytics')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer font-bold flex items-center gap-1.5 ${
                activeEngineTab === 'analytics' ? 'bg-amber-500 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Reach Metrics</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Pre-Built High-Converting Campaigns */}
        {activeEngineTab === 'campaigns' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Campaign 1: Golden Era Retrospective */}
            <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-5 space-y-3 hover:border-amber-500/40 transition">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold uppercase">
                  OnlyFans / Fansly Vault Drop
                </span>
                <span className="text-[11px] text-zinc-400 font-mono">+340% sub retention</span>
              </div>
              <h3 className="text-sm font-bold text-white">
                IMDb Pro Retrospective: Tina Fine Golden Era 4K Remaster
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80 font-sans">
                "From the official archives of IMDb star Tina Fine (nm1799683): I'm releasing the exclusive uncut 4K remasters of my iconic early filmography including Good Will Humping, Gangbang Whores, and Sons of Anarchy memories. Only for my subscribers! Link in bio ✨💋"
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-zinc-500">Target: OnlyFans Feed &amp; DM Mass Message</span>
                <button
                  onClick={() => copyWithFeedback(
                    `From the official archives of IMDb star Tina Fine (nm1799683): I'm releasing the exclusive uncut 4K remasters of my iconic early filmography including Good Will Humping, Gangbang Whores, and Sons of Anarchy memories. Only on my OnlyFans! Link in bio ✨💋 onlyfans.com/${profile.ofHandle}`,
                    'camp-1'
                  )}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold border border-zinc-700 transition cursor-pointer flex items-center gap-1.5"
                >
                  {copiedKey === 'camp-1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{copiedKey === 'camp-1' ? 'Copied Post!' : 'Copy Caption'}</span>
                </button>
              </div>
            </div>

            {/* Campaign 2: 1-on-1 Virtual Cam with Verified Star */}
            <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-5 space-y-3 hover:border-amber-500/40 transition">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase">
                  High-Ticket Monetization ($120 - $400)
                </span>
                <span className="text-[11px] text-zinc-400 font-mono">3.4x VIP conversion</span>
              </div>
              <h3 className="text-sm font-bold text-white">
                1-on-1 Private Virtual Cam with Verified Star
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80 font-sans">
                "Ever wanted a real, unfiltered 1-on-1 video date with an IMDb Pro verified screen entertainer? Book a private 15, 30, or 60-min live cam session with Tina Fine directly. Limited weekly slots available! Reserve yours now 🔥"
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.paypal.com/ncp/payment/67LUNE6LYPVM2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-lg bg-[#0070BA] hover:bg-[#003087] text-white text-xs font-black flex items-center gap-1 shadow transition cursor-pointer"
                    title="Time-with-Teena: PayPal Direct Reservation ($120)"
                  >
                    <span>PayPal $120</span>
                    <ExternalLink className="w-3 h-3 text-blue-200" />
                  </a>

                  {onOpenVirtualBooking ? (
                    <button
                      onClick={onOpenVirtualBooking}
                      className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Booking Manager</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-zinc-500">Live HD Video Streaming</span>
                  )}
                </div>
                <button
                  onClick={() => copyWithFeedback(
                    `Ever wanted a real, unfiltered 1-on-1 video date with an IMDb Pro verified screen entertainer? Book a private 15, 30, or 60-min live cam session with Tina Fine directly. Limited weekly slots available! Reserve yours now 🔥 onlyfans.com/${profile.ofHandle}`,
                    'camp-2'
                  )}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold border border-zinc-700 transition cursor-pointer flex items-center gap-1.5"
                >
                  {copiedKey === 'camp-2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{copiedKey === 'camp-2' ? 'Copied Post!' : 'Copy Caption'}</span>
                </button>
              </div>
            </div>

            {/* Campaign 3: Hollywood Crossover (Sons of Anarchy & TV) */}
            <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-5 space-y-3 hover:border-amber-500/40 transition">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold uppercase">
                  Mainstream Credibility
                </span>
                <span className="text-[11px] text-zinc-400 font-mono">SAG-AFTRA Eligible</span>
              </div>
              <h3 className="text-sm font-bold text-white">
                Sons of Anarchy &amp; Television Crossover Story Drop
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80 font-sans">
                "Fun fact for my subscribers: Aside from my adult features, I guest-starred on Sons of Anarchy and Private Practice! Tonight on OnlyFans, I'm sharing unreleased set photos and stories from my Hollywood shoots. Come check it out! 🏍️🖤"
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-zinc-500">Target: Twitter/X &amp; Instagram Story</span>
                <button
                  onClick={() => copyWithFeedback(
                    `Fun fact for my subscribers: Aside from my adult features, I guest-starred on Sons of Anarchy and Private Practice! Tonight on OnlyFans, I'm sharing unreleased set photos and stories from my Hollywood shoots. Come check it out! 🏍️🖤 onlyfans.com/${profile.ofHandle}`,
                    'camp-3'
                  )}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold border border-zinc-700 transition cursor-pointer flex items-center gap-1.5"
                >
                  {copiedKey === 'camp-3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{copiedKey === 'camp-3' ? 'Copied Post!' : 'Copy Caption'}</span>
                </button>
              </div>
            </div>

            {/* Campaign 4: Sacramento Hometown Star */}
            <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-5 space-y-3 hover:border-amber-500/40 transition">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold uppercase">
                  Hometown Hero Narrative
                </span>
                <span className="text-[11px] text-zinc-400 font-mono">Sacramento Roots</span>
              </div>
              <h3 className="text-sm font-bold text-white">
                Sacramento Native Screen Star Spotlight (06/08/1986)
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80 font-sans">
                "Born in Sacramento on June 8, 1986, I built my career from the ground up across adult features and mainstream media as Tina Fine &amp; Teena Fine. 14 verified titles on IMDb Pro and over 4.8M video views later, my best work is right here on OnlyFans. Join me!"
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-zinc-500">Target: Bio Link &amp; Pinned Announcement</span>
                <button
                  onClick={() => copyWithFeedback(
                    `Born in Sacramento on June 8, 1986, I built my career from the ground up across adult features and mainstream media as Tina Fine & Teena Fine. 14 verified titles on IMDb Pro (nm1799683) and over 4.8M video views later, my best work is right here on OnlyFans. Join me! onlyfans.com/${profile.ofHandle}`,
                    'camp-4'
                  )}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold border border-zinc-700 transition cursor-pointer flex items-center gap-1.5"
                >
                  {copiedKey === 'camp-4' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{copiedKey === 'camp-4' ? 'Copied Post!' : 'Copy Caption'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Dynamic Title-by-Title Promo Generator */}
        {activeEngineTab === 'generator' && (
          <div className="bg-zinc-950/90 border border-zinc-800 rounded-xl p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                  1. Select a Verified Credit from IMDb Profile (nm1799683)
                </label>
                <select
                  value={selectedFilmId}
                  onChange={(e) => setSelectedFilmId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs font-semibold focus:outline-none focus:border-amber-500"
                >
                  {credits.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.year}) — {c.role} [{c.type}]
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                  2. Choose Subscriber Conversion Angle
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'vault', label: 'Archival 4K Drop', icon: Flame },
                    { id: 'booking', label: '1-on-1 Cam Hook', icon: Video },
                    { id: 'trivia', label: 'IMDb Trivia & Story', icon: Sparkles },
                    { id: 'ppv', label: 'PPV Clip Paywall', icon: Tag },
                  ].map((angle) => {
                    const Icon = angle.icon;
                    return (
                      <button
                        key={angle.id}
                        type="button"
                        onClick={() => setPromoAngle(angle.id as any)}
                        className={`p-2 rounded-lg border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                          promoAngle === angle.id
                            ? 'bg-amber-500 text-zinc-950 border-amber-400'
                            : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{angle.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Generated Caption Output */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Generated Promotional Caption for OnlyFans &amp; Socials
                </span>
                <button
                  onClick={() => copyWithFeedback(getDynamicFilmPromo(), 'dyn-promo')}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-black transition cursor-pointer flex items-center gap-1.5 shadow"
                >
                  {copiedKey === 'dyn-promo' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'dyn-promo' ? 'Copied to Clipboard!' : 'Copy Generated Caption'}</span>
                </button>
              </div>

              <textarea
                rows={6}
                readOnly
                value={getDynamicFilmPromo()}
                className="w-full p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 font-mono text-xs text-zinc-200 leading-relaxed focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Official Badges & Profile Snippets */}
        {activeEngineTab === 'badges' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Badge Preview 1: High Contrast Gold Badge */}
              <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-5 space-y-3">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                  Visual Badge Style A: IMDb Gold Star Pill
                </span>
                <div className="p-4 rounded-xl bg-zinc-900 flex items-center justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-black text-xs shadow-lg">
                    <Star className="w-4 h-4 fill-zinc-950 text-zinc-950" />
                    <span>IMDb Pro Verified: nm1799683 • Tina Fine</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] text-zinc-400 block font-medium">OnlyFans / Fansly Bio Text:</span>
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 font-mono text-[11px] text-zinc-300 flex items-center justify-between">
                    <span className="truncate">⭐ IMDb Pro Verified Star (nm1799683) • Tina Fine | Sacramento CA ⭐</span>
                    <button
                      onClick={() => copyWithFeedback('⭐ IMDb Pro Verified Star (nm1799683) • Tina Fine | Sacramento CA ⭐', 'bio-badge-1')}
                      className="text-amber-400 hover:text-amber-300 p-1 cursor-pointer shrink-0 ml-2"
                      title="Copy"
                    >
                      {copiedKey === 'bio-badge-1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Badge Preview 2: HTML & Markdown Embed Snippet */}
              <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-5 space-y-3">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                  Embed Snippet (Website &amp; Press Decks)
                </span>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400 font-medium">HTML Anchor Snippet:</span>
                    <button
                      onClick={() => copyWithFeedback(
                        `<a href="${imdbProLink}" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/IMDb_Pro_Verified-Tina_Fine_(nm1799683)-F5C518?style=for-the-badge&logo=imdb&logoColor=black" alt="IMDb Pro Verified Tina Fine" /></a>`,
                        'html-badge'
                      )}
                      className="text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                    >
                      {copiedKey === 'html-badge' ? 'Copied!' : 'Copy HTML'}
                    </button>
                  </div>
                  <pre className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 font-mono text-[10px] text-zinc-300 overflow-x-auto whitespace-pre-wrap">
                    {`<a href="${imdbProLink}" target="_blank"><img src="https://img.shields.io/badge/IMDb_Pro-nm1799683-F5C518" /></a>`}
                  </pre>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-zinc-400 font-medium">Markdown Snippet:</span>
                    <button
                      onClick={() => copyWithFeedback(
                        `[![IMDb Pro Verified: Tina Fine](https://img.shields.io/badge/IMDb_Pro_Verified-Tina_Fine_(nm1799683)-F5C518?style=for-the-badge&logo=imdb&logoColor=black)](${imdbProLink})`,
                        'md-badge'
                      )}
                      className="text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                    >
                      {copiedKey === 'md-badge' ? 'Copied!' : 'Copy Markdown'}
                    </button>
                  </div>
                  <pre className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 font-mono text-[10px] text-zinc-300 overflow-x-auto whitespace-pre-wrap">
                    {`[![IMDb Pro Verified: Tina Fine](${imdbProLink})]`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Reach & Conversion Analytics */}
        {activeEngineTab === 'analytics' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Celebrity Credibility Lift</span>
              <span className="text-2xl font-black text-amber-400 font-mono">+240%</span>
              <p className="text-[11px] text-zinc-400">
                Verified IMDb Pro credentials provide instant celebrity trust, dramatically reducing subscriber churn.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Virtual Cam Pricing Power</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">$120 – $400</span>
              <p className="text-[11px] text-zinc-400">
                Subscribers pay premium rates for verified 1-on-1 private video calls with a recognized screen performer.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Total Cross-Platform Streams</span>
              <span className="text-2xl font-black text-rose-400 font-mono">4.8M+</span>
              <p className="text-[11px] text-zinc-400">
                Combined video reach across Pornhub model channel, official TV credits, and private subscriber vault.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* "Known For" Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            Known For &amp; Featured Filmography Highlights
          </h2>
          <span className="text-xs text-zinc-400">Archival and broadcast appearances</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {credits.slice(0, 4).map((credit) => (
            <div
              key={credit.id}
              className="group bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition shadow-lg flex flex-col justify-between"
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-zinc-950">
                <img
                  src={credit.posterUrl}
                  alt={credit.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-amber-400 border border-amber-500/30">
                  {credit.year}
                </span>
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-[10px] text-amber-400 uppercase tracking-wider font-bold block">
                    {credit.type}
                  </span>
                  <h3 className="text-xs font-bold text-white line-clamp-1 group-hover:text-amber-300">
                    {credit.title}
                  </h3>
                </div>
              </div>
              <div className="p-3 text-xs space-y-1.5 bg-zinc-900/80">
                <p className="text-zinc-200 font-semibold truncate">{credit.role}</p>
                <p className="text-[11px] text-zinc-400 line-clamp-2 leading-tight">{credit.notes || 'Verified IMDb title'}</p>
                <button
                  onClick={() => {
                    setSelectedFilmId(credit.id);
                    setActiveEngineTab('generator');
                  }}
                  className="w-full mt-1 py-1 rounded bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 text-zinc-300 text-[10px] font-bold transition cursor-pointer flex items-center justify-center gap-1"
                >
                  <Megaphone className="w-3 h-3" />
                  <span>Generate Promo</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Filmography Table */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Film className="w-4 h-4 text-amber-400" />
              Complete Verified Filmography (IMDb Pro nm1799683)
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Authentic record across broadcast television (FX/ABC), parody comedy, and premier adult entertainment releases
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-xs">
              {['All', 'Movie', 'TV Series', 'Digital Production'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-2.5 py-1 rounded transition cursor-pointer font-medium ${
                    filterType === t ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium border border-zinc-700 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Credit</span>
            </button>
          </div>
        </div>

        {/* Credits List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-3">Year</th>
                <th className="py-3 px-3">Production Title</th>
                <th className="py-3 px-3">Role / Screen Credit</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Production Notes &amp; Distribution</th>
                <th className="py-3 px-3 text-right">Subscriber Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {filteredCredits.map((credit) => (
                <tr key={credit.id} className="hover:bg-zinc-800/30 transition">
                  <td className="py-3.5 px-3 font-mono text-amber-400 font-bold">{credit.year}</td>
                  <td className="py-3.5 px-3 font-semibold text-white">
                    <div className="flex items-center gap-2">
                      <span>{credit.title}</span>
                      {credit.type === 'TV Series' && (
                        <span className="px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono border border-blue-500/30">
                          TV
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-zinc-200">
                    <span className="font-medium text-amber-300/90">{credit.role}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] border border-zinc-700 font-medium">
                      {credit.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-zinc-400">{credit.notes || '—'}</td>
                  <td className="py-3.5 px-3 text-right space-x-2">
                    <button
                      onClick={() => {
                        setSelectedFilmId(credit.id);
                        setActiveEngineTab('generator');
                      }}
                      className="px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500 hover:text-zinc-950 text-amber-300 text-[10px] font-bold border border-amber-500/30 transition cursor-pointer inline-flex items-center gap-1"
                      title="Generate subscriber promo"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Promo</span>
                    </button>
                    <button
                      onClick={() => onRemoveCredit(credit.id)}
                      className="text-zinc-600 hover:text-rose-400 p-1 transition cursor-pointer inline-block"
                      title="Remove credit"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* IMDb Submission Helper / Contributor Sheet */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-white">IMDb Contributor Data Sheet &amp; Booking Bio</h3>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(generateImdbSubmissionText());
              setCopiedSubmission(true);
              setTimeout(() => setCopiedSubmission(false), 2000);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 border border-zinc-700 transition cursor-pointer"
          >
            {copiedSubmission ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>Copy Text</span>
          </button>
        </div>
        <p className="text-xs text-zinc-400 mb-4">
          Formatted text ready for copy-pasting into IMDb Pro talent profiles, talent agency decks, and digital press kits.
        </p>
        <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-zinc-300 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
          {generateImdbSubmissionText()}
        </pre>
      </div>

      {/* Add Credit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-400" />
              Add Filmography Credit
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1">Production Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Good Will Humping or Sons of Anarchy"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">Release Year</label>
                  <input
                    type="number"
                    value={newYear}
                    onChange={(e) => setNewYear(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Production Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Movie">Movie</option>
                    <option value="TV Series">TV Series</option>
                    <option value="Digital Production">Digital Production</option>
                    <option value="Short">Short</option>
                    <option value="Music Video">Music Video</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Role / Screen Credit Name</label>
                <input
                  type="text"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="e.g. Performer (as Tina Fine)"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Production Notes &amp; Distribution</label>
                <input
                  type="text"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Credited on IMDb nm1799683 or FX Network episodic"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-amber-500"
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
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold transition cursor-pointer"
                >
                  Add to Filmography
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
