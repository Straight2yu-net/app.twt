import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, ShieldCheck, Check, Copy, CreditCard, Sparkles } from 'lucide-react';

interface PayPalHostedButtonProps {
  buttonId?: string;
  clientId?: string;
  title?: string;
  amount?: string;
  variant?: 'full' | 'compact' | 'card';
  showDetails?: boolean;
}

declare global {
  interface Window {
    paypal?: {
      HostedButtons: (config: { hostedButtonId: string }) => {
        render: (containerSelector: string) => Promise<void>;
      };
    };
  }
}

export const PayPalHostedButton: React.FC<PayPalHostedButtonProps> = ({
  buttonId = '67LUNE6LYPVM2',
  clientId = 'AXI9ufE0S2cbFXEi71kHRu9MaQbN01UYPuQidJxjE_t00Yk6NdSr0joXht4Z3NNvw6pjZSCqG-p99FZS',
  title = 'Time-with-Teena: Virtual Session & Private Time Slot',
  amount = '$120.00',
  variant = 'full',
  showDetails = true,
}) => {
  const containerId = `paypal-container-${buttonId}`;
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const renderAttempted = useRef(false);

  const directCheckoutUrl = `https://www.paypal.com/ncp/payment/${buttonId}`;

  useEffect(() => {
    let isMounted = true;

    const renderButton = () => {
      if (!isMounted || renderAttempted.current) return;
      const targetEl = document.getElementById(containerId);
      if (targetEl && window.paypal?.HostedButtons) {
        renderAttempted.current = true;
        targetEl.innerHTML = ''; // clear previous render if any
        window.paypal
          .HostedButtons({ hostedButtonId: buttonId })
          .render(`#${containerId}`)
          .then(() => {
            if (isMounted) setIsLoaded(true);
          })
          .catch((err) => {
            console.warn('PayPal HostedButtons render warning:', err);
            if (isMounted) setLoadError(true);
          });
      }
    };

    // Check if PayPal SDK script is already injected
    const existingScript = document.querySelector('script[src*="components=hosted-buttons"]');
    if (existingScript && window.paypal?.HostedButtons) {
      renderButton();
    } else if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&components=hosted-buttons&enable-funding=venmo&currency=USD`;
      script.async = true;
      script.onload = () => {
        renderButton();
      };
      script.onerror = () => {
        console.warn('Could not load PayPal SDK script');
        if (isMounted) setLoadError(true);
      };
      document.head.appendChild(script);
    } else {
      // Script is present but loading
      const interval = setInterval(() => {
        if (window.paypal?.HostedButtons) {
          clearInterval(interval);
          renderButton();
        }
      }, 250);
      return () => clearInterval(interval);
    }

    return () => {
      isMounted = false;
    };
  }, [buttonId, clientId, containerId]);

  const copyPaymentUrl = () => {
    navigator.clipboard.writeText(directCheckoutUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (variant === 'compact') {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div id={containerId} className="min-h-[44px] flex items-center justify-center"></div>
        <a
          href={directCheckoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0070BA] hover:bg-[#003087] text-white text-xs font-black shadow-md transition cursor-pointer"
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Pay with PayPal ({amount})</span>
          <ExternalLink className="w-3 h-3 ml-0.5" />
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-amber-950/20 border-2 border-amber-500/50 p-5 shadow-2xl space-y-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#003087] text-white text-[10px] font-black tracking-wider flex items-center gap-1">
              <span className="font-serif italic text-amber-300 font-black">P</span>
              PAYPAL VERIFIED CHECKOUT
            </span>
            <span className="text-xs text-amber-400 font-mono font-bold">
              ID: {buttonId}
            </span>
          </div>
          <h4 className="text-sm sm:text-base font-extrabold text-white mt-1">
            {title}
          </h4>
          <p className="text-xs text-zinc-400">
            1-on-1 virtual sessions with Entertainer • Private access &amp; instant booking reservation
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-[10px] text-zinc-500 uppercase font-bold block">Fixed Rate</span>
          <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
            {amount} <span className="text-xs text-zinc-400 font-normal">USD</span>
          </span>
        </div>
      </div>

      {showDetails && (
        <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 text-xs text-zinc-300 space-y-1.5">
          <div className="flex items-center justify-between text-zinc-400 text-[11px]">
            <span>Item:</span>
            <span className="text-white font-medium">Virtual Session and private time slot</span>
          </div>
          <div className="flex items-center justify-between text-zinc-400 text-[11px]">
            <span>Button Label:</span>
            <span className="text-amber-300 font-mono font-bold">Time-with-Teena</span>
          </div>
          <div className="flex items-start justify-between text-zinc-400 text-[11px] gap-2 pt-1 border-t border-zinc-900">
            <span>Instructions:</span>
            <span className="text-zinc-300 text-right">Provide your e-mail or contact info in PayPal memo for meeting link.</span>
          </div>
        </div>
      )}

      {/* Primary PayPal Container (Rendered by PayPal HostedButtons SDK) */}
      <div className="space-y-3">
        <div className="flex items-center justify-center p-2 rounded-xl bg-zinc-950/50 border border-zinc-800/80 min-h-[52px]">
          <div id={containerId} className="w-full max-w-sm flex items-center justify-center"></div>
        </div>

        {/* Fallback / Direct Link for 100% Reliable Checkout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-1">
          <a
            href={directCheckoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0070BA] hover:bg-[#003087] text-white text-xs font-black shadow-lg shadow-blue-950/50 transition cursor-pointer"
          >
            <CreditCard className="w-4 h-4" />
            <span>Open Direct PayPal Checkout: Time-with-Teena ({amount})</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-200" />
          </a>

          <button
            onClick={copyPaymentUrl}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition cursor-pointer shrink-0"
            title="Copy PayPal payment URL"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
            <span>{copiedLink ? 'Link Copied!' : 'Copy Payment Link'}</span>
          </button>
        </div>
      </div>

      {/* Security & Buyer Protection Footer */}
      <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          Encrypted 256-Bit SSL • PayPal Buyer Protection
        </span>
        <span className="font-mono text-zinc-400 text-[10px]">
          Merchant: V29U2ZUCTJUDL
        </span>
      </div>
    </div>
  );
};
