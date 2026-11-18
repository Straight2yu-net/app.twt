export interface CreatorProfile {
  name: string;
  stageName: string;
  aliases: string[];
  birthDate: string; // "1986-06-08"
  birthPlace: string; // "Sacramento, California, USA"
  currentLocation: string;
  height: string;
  measurements: string;
  hairColor: string;
  eyeColor: string;
  ethnicity: string;
  bioSummary: string;
  imdbBio: string;
  ofBio: string;
  avatarUrl: string;
  bannerUrl: string;
  subscriptionPrice: number;
  promoPrice?: number;
  promoDays?: number;
  imdbId?: string;
  imdbProUrl?: string;
  imdbUrl?: string;
  ofHandle: string;
  instagramHandle: string;
  twitterHandle: string;
  totalLikes: string;
  totalSubscribers: string;
  totalMediaCount: number;
  verified: boolean;
  pornhubHandle?: string;
  pornhubUrl?: string;
  pornhubViews?: string;
  pornhubSubscribers?: string;
  pornhubRank?: string;
  virtualBookingAvailable?: boolean;
}

export interface VirtualBookingOption {
  id: string;
  title: string;
  durationMinutes: number;
  price: number;
  description: string;
  perks: string[];
}

export interface IMDbCredit {
  id: string;
  title: string;
  year: number;
  role: string;
  type: 'TV Series' | 'Movie' | 'Short' | 'Music Video' | 'Documentary' | 'Digital Production';
  notes?: string;
  posterUrl?: string;
  imdbUrl?: string;
  status: 'Released' | 'Post-Production' | 'In Development';
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'video' | 'image';
  category: 'Teaser' | 'Exclusive' | 'Behind the Scenes' | 'Photoshoot' | 'PPV Special';
  url: string;
  thumbnailUrl: string;
  duration?: string; // for videos (e.g. "04:32")
  resolution: string; // "4K UHD" | "1080p 60fps"
  dateAdded: string;
  price?: number; // 0 for free/subscribers, >0 for PPV
  isLocked: boolean;
  tags: string[];
  views: number;
  likes: number;
  embedUrl?: string;
  embedIframe?: string;
}

export interface TipMenuItem {
  id: string;
  title: string;
  description: string;
  price: number;
  iconName: string;
  category: 'Media' | 'Interaction' | 'Custom' | 'Perk';
}

export interface CampaignDrop {
  id: string;
  title: string;
  scheduledDate: string;
  platform: 'OnlyFans' | 'Fansly' | 'Instagram' | 'Twitter/X';
  mediaItemIds: string[];
  status: 'Scheduled' | 'Live' | 'Draft';
  caption: string;
  targetRevenue?: number;
}
