import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { OverviewEPK } from './components/OverviewEPK';
import { ImdbSyncView } from './components/ImdbSyncView';
import { OnlyFansLaunchStudio } from './components/OnlyFansLaunchStudio';
import { MediaVaultView } from './components/MediaVaultView';
import { AiImageStudio } from './components/AiImageStudio';
import { AiContentModal } from './components/AiContentModal';
import { MediaPreviewModal } from './components/MediaPreviewModal';
import { VirtualBookingModal } from './components/VirtualBookingModal';
import { 
  initialProfile, 
  initialCredits, 
  initialMediaVault, 
  initialTipMenu 
} from './data/initialData';
import { CreatorProfile, IMDbCredit, MediaItem, TipMenuItem } from './types/creator';
import { Check, Info, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<CreatorProfile>(initialProfile);
  const [credits, setCredits] = useState<IMDbCredit[]>(initialCredits);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(initialMediaVault);
  const [tipMenu, setTipMenu] = useState<TipMenuItem[]>(initialTipMenu);

  const [activeTab, setActiveTab] = useState<string>('epk');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isAiCopyOpen, setIsAiCopyOpen] = useState(false);
  const [isVirtualBookingOpen, setIsVirtualBookingOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateProfile = (updated: Partial<CreatorProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
    showToast('Profile configuration updated.');
  };

  const handleSetAvatar = (url: string) => {
    setProfile((prev) => ({ ...prev, avatarUrl: url }));
    showToast('Profile avatar updated across all platforms.');
  };

  const handleSetBanner = (url: string) => {
    setProfile((prev) => ({ ...prev, bannerUrl: url }));
    showToast('Header banner updated across all platforms.');
  };

  const handleAddCredit = (credit: IMDbCredit) => {
    setCredits((prev) => [credit, ...prev]);
    showToast(`Added "${credit.title}" to IMDb Filmography.`);
  };

  const handleRemoveCredit = (id: string) => {
    setCredits((prev) => prev.filter((c) => c.id !== id));
    showToast('Credit removed.');
  };

  const handleAddMedia = (item: MediaItem) => {
    setMediaItems((prev) => [item, ...prev]);
    setProfile((prev) => ({ ...prev, totalMediaCount: prev.totalMediaCount + 1 }));
    showToast(`Staged "${item.title}" into Media Vault.`);
  };

  const handleRemoveMedia = (id: string) => {
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
    showToast('Media item removed.');
  };

  const handleAddTipItem = (item: TipMenuItem) => {
    setTipMenu((prev) => [...prev, item]);
    showToast(`Added "${item.title}" to Tip Menu.`);
  };

  const handleRemoveTipItem = (id: string) => {
    setTipMenu((prev) => prev.filter((t) => t.id !== id));
    showToast('Tip menu item removed.');
  };

  const handleExportKit = () => {
    const exportBundle = {
      profile,
      filmography: credits,
      mediaVaultHighlights: mediaItems.map(({ title, type, category, resolution, duration, price }) => ({
        title,
        type,
        category,
        resolution,
        duration,
        price,
      })),
      tipMenu,
      exportedAt: new Date().toISOString(),
      generator: 'Christina Lynn Peterson Creator Hub & Digital Press Kit',
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportBundle, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Christina_Lynn_Peterson_PressKit_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast('Downloaded complete Press Kit bundle (JSON).');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-rose-500 selection:text-white flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        onExport={handleExportKit}
        onOpenAiCopy={() => setIsAiCopyOpen(true)}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'epk' && (
          <OverviewEPK
            profile={profile}
            credits={credits}
            mediaItems={mediaItems}
            setActiveTab={setActiveTab}
            onOpenAiCopy={() => setIsAiCopyOpen(true)}
            onSelectMedia={(item) => setSelectedMedia(item)}
            onOpenVirtualBooking={() => setIsVirtualBookingOpen(true)}
          />
        )}

        {activeTab === 'imdb' && (
          <ImdbSyncView
            profile={profile}
            credits={credits}
            onAddCredit={handleAddCredit}
            onRemoveCredit={handleRemoveCredit}
            onOpenAiCopy={() => setIsAiCopyOpen(true)}
            setActiveTab={setActiveTab}
            onOpenVirtualBooking={() => setIsVirtualBookingOpen(true)}
          />
        )}

        {activeTab === 'onlyfans' && (
          <OnlyFansLaunchStudio
            profile={profile}
            tipMenu={tipMenu}
            mediaItems={mediaItems}
            onUpdateProfile={handleUpdateProfile}
            onAddTipItem={handleAddTipItem}
            onRemoveTipItem={handleRemoveTipItem}
            onOpenAiCopy={() => setIsAiCopyOpen(true)}
          />
        )}

        {activeTab === 'vault' && (
          <MediaVaultView
            mediaItems={mediaItems}
            onSelectMedia={(item) => setSelectedMedia(item)}
            onAddMedia={handleAddMedia}
            onRemoveMedia={handleRemoveMedia}
            onOpenAiStudio={() => setActiveTab('ai-studio')}
          />
        )}

        {activeTab === 'ai-studio' && (
          <AiImageStudio
            profile={profile}
            mediaItems={mediaItems}
            onSetAvatar={handleSetAvatar}
            onSetBanner={handleSetBanner}
            onAddToVault={handleAddMedia}
          />
        )}
      </main>

      {/* Modals */}
      <AiContentModal
        isOpen={isAiCopyOpen}
        onClose={() => setIsAiCopyOpen(false)}
        profile={profile}
        onUpdateOfBio={(bio) => handleUpdateProfile({ ofBio: bio })}
        onUpdateImdbBio={(bio) => handleUpdateProfile({ imdbBio: bio })}
      />

      <MediaPreviewModal
        item={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />

      <VirtualBookingModal
        isOpen={isVirtualBookingOpen}
        onClose={() => setIsVirtualBookingOpen(false)}
        profile={profile}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-8 mt-12 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-300">Christina Lynn Peterson</span>
            <span>•</span>
            <span>Sacramento, CA (Born 06.08.1986)</span>
            <span>•</span>
            <span className="text-zinc-400">IMDb ID: {profile.imdbId}</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span>Powered by Gemini Nano Banana 2.1 &amp; 3.8 Flash</span>
            <span>•</span>
            <span>Official Media Vault</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
