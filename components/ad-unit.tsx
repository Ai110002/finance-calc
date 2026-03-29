"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

/**
 * AdSense In-Article Ad Unit.
 *
 * NOTE: data-ad-slot must be replaced with a real ad unit ID from
 * Google AdSense dashboard once the account is approved.
 * Create an ad unit at: https://www.google.com/adsense → Ads → By ad unit
 *
 * Until a real slot ID is configured, ads will not render.
 */
export function AdUnit({ className }: { className?: string }) {
  const pushed = useRef(false);
  const adSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT;

  useEffect(() => {
    if (pushed.current || !adSlot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded or ad blocker
    }
  }, [adSlot]);

  // Don't render anything if no ad slot configured
  if (!adSlot) return null;

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client="ca-pub-4227670315328051"
        data-ad-slot={adSlot}
        data-ad-layout="in-article"
        data-ad-format="fluid"
      />
    </div>
  );
}
