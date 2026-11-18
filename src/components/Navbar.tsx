import React from 'react';
import { 
  Sparkles, 
  Film, 
  Flame, 
  Image as ImageIcon, 
  FolderLock, 
  FileText, 
  Share2, 
  Download,
  CheckCircle2,
  Calendar,
  MapPin,
  CreditCard
} from 'lucide-react';
import { CreatorProfile } from '../types/creator';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: CreatorProfile;
  onExport: () => void;
  onOpenAiCopy: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  profile,
  onExport,
  onOpenAiCopy,
}) => {
  const navItems = [
    { id: 'epk', label: 'Overview & EPK', icon: FileText },
    { id: 'imdb', label: 'IMDb Profile & Credits', icon: Film },
    { id: 'onlyfans', label: 'OnlyFans Launch Studio', icon: Flame },
    { id: 'vault', label: 'Media Vault & Clips', icon: FolderLock },
    { id: 'ai-studio', label: 'AI Visual Studio', icon: ImageIcon, badge: 'Nano Banana 2.1' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between py-2 border-b border-zinc-900 text-xs text-zinc-400 gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Creator Workspace
            </span>
            <span className="text-zinc-600">|</span>
            <span className="flex items-center gap-1 text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              {profile.birthPlace}
            </span>
            <span className="text-zinc-600">|</span>
            <span className="flex items-center gap-1 text-zinc-300">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Born June 8, 1986 (Age 40)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://www.paypal.com/ncp/payment/67LUNE6LYPVM2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0070BA] hover:bg-[#003087] text-white text-xs font-bold transition shadow-sm cursor-pointer"
              title="Time-with-Teena: PayPal 1-on-1 Virtual Session ($120)"
            >
              <CreditCard className="w-3 h-3 text-white" />
              <span>Book Session ($120)</span>
            </a>
            <button
              onClick={onOpenAiCopy}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/60 transition cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>AI Publicist</span>
            </button>
            <button
              onClick={onExport}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-medium transition cursor-pointer shadow-sm shadow-rose-900/40"
            >
              <Download className="w-3 h-3" />
              <span>Export Press Kit</span>
            </button>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-rose-500/60"
              />
              <span className="absolute -bottom-1 -right-1 bg-zinc-950 rounded-full p-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {profile.name}
                </h1>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded">
                  OFFICIAL
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Actress • Creator • Entertainment Media Hub
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition cursor-pointer relative ${
                    isActive
                      ? 'bg-rose-950/40 text-rose-200 border border-rose-700/50'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-rose-400' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.2 text-[9px] font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center gap-1 overflow-x-auto pb-2 scrollbar-none text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded whitespace-nowrap font-medium transition ${
                  isActive
                    ? 'bg-rose-900/40 text-rose-200 border border-rose-700/40'
                    : 'text-zinc-400 bg-zinc-900/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
