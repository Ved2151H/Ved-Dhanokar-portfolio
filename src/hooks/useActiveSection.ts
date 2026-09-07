import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[], defaultId = 'hero') {
  const [activeSection, setActiveSection] = useState(defaultId);

  useEffect(() => {
    // If IntersectionObserver is available, use it for performant viewport tracking
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the entry that has the largest intersection ratio or is most in view
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Sort by intersection ratio descending
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const topVisible = visibleEntries[0];
        if (topVisible && topVisible.target.id) {
          setActiveSection(topVisible.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-15% 0px -40% 0px',
      threshold: [0.1, 0.25, 0.5, 0.75],
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Fallback and bottom-of-page scroll listener
    const handleScroll = () => {
      // Check bottom of page
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (isAtBottom && sectionIds.length > 0) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      // If at the very top
      if (window.scrollY < 120) {
        setActiveSection(defaultId);
        return;
      }

      // In case IntersectionObserver missed a transition during fast scrolling
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, defaultId]);

  return activeSection;
}

