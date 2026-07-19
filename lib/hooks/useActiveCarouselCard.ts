"use client";

import { RefObject, useEffect, useState } from "react";

/**
 * Tracks which card in a horizontal scroll-snap track is closest to the
 * track's viewport center. Same closest-to-center logic as the wireframe's
 * updateActiveCard(), rAF-throttled.
 */
export function useActiveCarouselCard(
  trackRef: RefObject<HTMLElement>,
  cardCount: number
): number {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const update = () => {
      const trackRect = track.getBoundingClientRect();
      const trackCenter = trackRect.left + trackRect.width / 2;
      let closestIdx = 0;
      let closestDist = Infinity;
      Array.from(track.children).forEach((card, i) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const dist = Math.abs(cardCenter - trackCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      });
      setActiveIdx(closestIdx);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [trackRef, cardCount]);

  return activeIdx;
}
