import React, { useEffect, useRef } from 'react';
import styles from '../styles/AnimatedSection.module.css';

/**
 * Scroll reveal whose resting state is *visible*.
 *
 * History worth keeping: this used a 20%-of-element intersection threshold,
 * which is fine for a short block and impossible for a tall one. Once the
 * projects section grew past ~3,600px it could never show 20% of itself in a
 * 720px viewport, so it stayed at opacity 0 permanently — fully laid out and
 * completely invisible.
 *
 * The replacement is deliberately boring. The element is visible with no
 * classes applied. Entering the viewport adds a class that plays a keyframe
 * animation from transparent to visible; the class is then removed on
 * `animationend`, returning the element to its natural visible state. A timer
 * removes it regardless if the animation never finishes — which is exactly
 * what happens when frames are not being composited, animations are disabled,
 * or the tab is throttled.
 *
 * Every failure path ends with the content on screen.
 */
const AnimatedSection = ({ children, delay = 0, className = '', ...props }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    let failsafe;
    const settle = () => {
      window.clearTimeout(failsafe);
      el.classList.remove(styles.reveal);
      el.removeEventListener('animationend', settle);
    };

    // threshold 0 — any sliver counts, so the element's height is irrelevant.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          el.addEventListener('animationend', settle);
          el.classList.add(styles.reveal);
          // Longer than the animation. If it never finishes, drop the class
          // and let the element sit in its normal, visible state.
          failsafe = window.setTimeout(settle, 1500);
        });
      },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      settle();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ '--reveal-delay': `${delay}s` }}
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
