import React, { useState } from 'react';
import { 
  X, 
  Video, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Check, 
  DollarSign, 
  Sparkles, 
  Heart, 
  AlertCircle,
  ExternalLink,
  Lock,
  Camera,
  CreditCard
} from 'lucide-react';
import { CreatorProfile, VirtualBookingOption } from '../types/creator';
import { initialVirtualBookings } from '../data/initialData';
import { PayPalHostedButton } from './PayPalHostedButton';

interface VirtualBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CreatorProfile;
}

export const VirtualBookingModal: React.FC<VirtualBookingModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  if (!isOpen) return null;

  const [selectedOption, setSelectedOption] = useState<VirtualBookingOption>(initialVirtualBookings[1]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('Encrypted In-App Video');
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow, 7:00 PM PST');
  const [subscriberName, setSubscriberName] = useState<string>('');
  const [contactHandle, setContactHandle] = useState<string>('');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [isBooked, setIsBooked] = useState<boolean>(false);

  const availableDates = [
    'Today, 9:00 PM PST',
    'Tomorrow, 6:00 PM PST',
    'Tomorrow, 7:30 PM PST',
    'Saturday, 5:00 PM PST',
    'Saturday, 8:00 PM PST',
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-zinc-950 font-bold shadow-lg shadow-rose-950/40">
              <Video className="w-5 h-5 text-zinc-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  1-on-1 VIP Virtual Bookings
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Live &amp; Private
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Book direct private video calls and personalized cam sessions with {profile.name}
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

        {isBooked ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500 shadow-xl">
              <Check className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white">Virtual Session Confirmed!</h4>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Thank you! Your private session for <strong>{selectedOption.title}</strong> at <strong>{selectedDate}</strong> via <strong>{selectedPlatform}</strong> has been staged into Christina's priority calendar.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 max-w-md mx-auto text-xs text-left space-y-2">
              <div className="flex justify-between text-zinc-400">
                <span>Confirmation ID:</span>
                <span className="font-mono text-zinc-200">#VIP-CAM-{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Duration:</span>
                <span className="text-zinc-200 font-semibold">{selectedOption.durationMinutes} Minutes</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Total Staged:</span>
                <span className="font-bold text-emerald-400 text-sm font-mono">${selectedOption.price}</span>
              </div>
              <div className="pt-2 border-t border-zinc-800 text-[11px] text-zinc-400">
                A private encrypted video access link will be sent to your handle ({contactHandle || '@subscriber'}) 15 minutes before the session starts.
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setIsBooked(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition cursor-pointer"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="space-y-5 text-xs">
            {/* Quick Instant Checkout via PayPal Hosted Button */}
            <div className="space-y-2">
              <label className="block text-zinc-300 font-bold uppercase tracking-wider text-[11px] flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                  Instant PayPal Booking Gateway: Time-with-Teena ($120)
                </span>
                <span className="text-[10px] text-zinc-400 font-normal">Official Hosted Button ID: 67LUNE6LYPVM2</span>
              </label>

              <PayPalHostedButton
                buttonId="67LUNE6LYPVM2"
                title="Time-with-Teena: Virtual Session & Private Slot"
                amount="$120.00"
                variant="full"
                showDetails={true}
              />
            </div>

            {/* Step 1: Select Session Tier */}
            <div>
              <label className="block text-zinc-300 font-bold uppercase tracking-wider text-[11px] mb-2.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Or Customize Calling Platform &amp; Duration Tier:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {initialVirtualBookings.map((opt) => {
                  const isSelected = selectedOption.id === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedOption(opt)}
                      className={`p-3.5 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-rose-950/40 border-rose-500 ring-2 ring-rose-500/20'
                          : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-mono">
                            {opt.durationMinutes} Min
                          </span>
                          <span className="text-sm font-black text-emerald-400 font-mono">
                            ${opt.price}
                          </span>
                        </div>
                        <h5 className="font-bold text-white text-xs mt-1 leading-snug">
                          {opt.title}
                        </h5>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                          {opt.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-zinc-800/80 space-y-1">
                        {opt.perks.slice(0, 2).map((p, i) => (
                          <div key={i} className="flex items-center gap-1 text-[10px] text-zinc-300">
                            <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span className="truncate">{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Platform and Schedule */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-300 font-bold uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-blue-400" />
                  2. Preferred Calling Platform
                </label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="Encrypted In-App WebRTC Video">Encrypted In-App Browser Video (No download)</option>
                  <option value="Private Telegram Video">Private Telegram HD Video Call</option>
                  <option value="Private FaceTime (VIP Apple)">Private FaceTime Call</option>
                  <option value="Private Skype / Discord Cam">Private Skype / Discord Room</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-300 font-bold uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-rose-400" />
                  3. Select Preferred Time Slot
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-rose-500"
                >
                  {availableDates.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 3: Subscriber Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Your Name / VIP Alias *</label>
                <input
                  type="text"
                  required
                  value={subscriberName}
                  onChange={(e) => setSubscriberName(e.target.value)}
                  placeholder="e.g. VIP Subscriber Marcus"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">OnlyFans Handle or Phone / Telegram *</label>
                <input
                  type="text"
                  required
                  value={contactHandle}
                  onChange={(e) => setContactHandle(e.target.value)}
                  placeholder="@yourhandle or contact ID"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1">
                Custom Requests, Outfit Preference, or Conversation Topic (Optional)
              </label>
              <textarea
                rows={2}
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Let Christina know what vibe, lingerie/outfit color, or specific topics you want for your private session..."
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* Trust and Policy Note */}
            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-[11px] text-zinc-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Confidentiality Guaranteed:</strong> All virtual sessions are 100% private, peer-to-peer encrypted, and strictly 18+. Respectful conduct is required. Session recording is protected.
              </span>
            </div>

            {/* Submit Action */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-bold">Total Session Rate</span>
                <span className="text-xl font-black text-emerald-400 font-mono">${selectedOption.price} USD</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-zinc-950 font-black text-xs shadow-lg shadow-rose-950 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Video className="w-4 h-4 text-zinc-950" />
                  <span>Confirm &amp; Book Virtual Session</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
