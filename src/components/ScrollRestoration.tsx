"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

let isPopState = false;

if (typeof window !== 'undefined') {
  // Listen for the popstate event (back/forward navigation)
  window.addEventListener('popstate', () => {
    isPopState = true;
  });
  
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'auto';
  }
}

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    if (isPopState) {
      // If it was back/forward navigation, reset flag and let the browser restore scroll position
      isPopState = false;
    } else {
      // For any new page entries, scroll immediately to top
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
