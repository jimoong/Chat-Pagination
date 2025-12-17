import { useRef, useCallback, useState, useEffect } from 'react';
import MessageBubble from './MessageBubble';

// Adjustable scroll pagination parameters
const SCROLL_CONFIG = {
  debounceMs: 50,      // Time between page changes (lower = faster)
  sensitivity: 15,      // Scroll delta threshold (lower = more sensitive)
};

// Touch swipe configuration for mobile
const SWIPE_CONFIG = {
  minDistance: 50,      // Minimum swipe distance in pixels
  maxVerticalRatio: 0.75, // Max vertical/horizontal ratio to count as horizontal swipe
  resistance: 0.3,      // Resistance when swiping at edges (0-1)
};

const ChatThread = ({ turn, onExpandArtifact, onPageChange, currentPage, totalPages, isPreview }) => {
  const containerRef = useRef(null);
  const lastScrollTime = useRef(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isSwiping = useRef(false);
  const isHorizontalSwipe = useRef(false);
  const isAnimatingRef = useRef(false);
  
  // Store props in refs for stable access in event handlers
  const currentPageRef = useRef(currentPage);
  const totalPagesRef = useRef(totalPages);
  const onPageChangeRef = useRef(onPageChange);
  
  useEffect(() => {
    currentPageRef.current = currentPage;
    totalPagesRef.current = totalPages;
    onPageChangeRef.current = onPageChange;
  }, [currentPage, totalPages, onPageChange]);
  
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleWheel = useCallback((e) => {
    // Prevent Chrome's swipe-back gesture when horizontal scrolling
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
    }

    const now = Date.now();
    if (now - lastScrollTime.current < SCROLL_CONFIG.debounceMs) return;

    // Horizontal scroll only: swipe right = next page, swipe left = previous page
    if (e.deltaX > SCROLL_CONFIG.sensitivity && currentPage < totalPages - 1) {
      lastScrollTime.current = now;
      onPageChange(currentPage + 1);
    } else if (e.deltaX < -SCROLL_CONFIG.sensitivity && currentPage > 0) {
      lastScrollTime.current = now;
      onPageChange(currentPage - 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  // Use native event listeners for touch to allow preventDefault
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e) => {
      if (isAnimatingRef.current) return;
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      isSwiping.current = true;
      isHorizontalSwipe.current = false;
      setSwipeOffset(0);
    };

    const handleTouchMove = (e) => {
      if (!isSwiping.current || isAnimatingRef.current) return;
      
      const deltaX = e.touches[0].clientX - touchStartX.current;
      const deltaY = e.touches[0].clientY - touchStartY.current;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      
      // Determine swipe direction on first significant movement
      if (!isHorizontalSwipe.current && (absX > 10 || absY > 10)) {
        isHorizontalSwipe.current = absX > absY;
      }
      
      // Only handle horizontal swipes
      if (isHorizontalSwipe.current) {
        e.preventDefault();
        
        // Apply resistance at edges
        let offset = deltaX;
        const page = currentPageRef.current;
        const total = totalPagesRef.current;
        const isAtStart = page === 0 && deltaX > 0;
        const isAtEnd = page === total - 1 && deltaX < 0;
        
        if (isAtStart || isAtEnd) {
          offset = deltaX * SWIPE_CONFIG.resistance;
        }
        
        setSwipeOffset(offset);
      }
    };

    const handleTouchEnd = (e) => {
      if (!isSwiping.current || isAnimatingRef.current) return;
      isSwiping.current = false;
      
      if (!isHorizontalSwipe.current) {
        setSwipeOffset(0);
        return;
      }

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const deltaX = touchEndX - touchStartX.current;
      const deltaY = touchEndY - touchStartY.current;
      
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      
      const page = currentPageRef.current;
      const total = totalPagesRef.current;
      
      // Check if it's a valid horizontal swipe
      const isValidSwipe = absX >= SWIPE_CONFIG.minDistance && 
                          (absY === 0 || absY / absX <= SWIPE_CONFIG.maxVerticalRatio);
      
      if (isValidSwipe) {
        if (deltaX < 0 && page < total - 1) {
          // Swipe left = next page - animate out
          isAnimatingRef.current = true;
          setIsAnimating(true);
          setSwipeOffset(-window.innerWidth);
          setTimeout(() => {
            onPageChangeRef.current(page + 1);
            setSwipeOffset(0);
            setIsAnimating(false);
            isAnimatingRef.current = false;
          }, 250);
        } else if (deltaX > 0 && page > 0) {
          // Swipe right = previous page - animate out
          isAnimatingRef.current = true;
          setIsAnimating(true);
          setSwipeOffset(window.innerWidth);
          setTimeout(() => {
            onPageChangeRef.current(page - 1);
            setSwipeOffset(0);
            setIsAnimating(false);
            isAnimatingRef.current = false;
          }, 250);
        } else {
          // Snap back (at edge)
          isAnimatingRef.current = true;
          setIsAnimating(true);
          setSwipeOffset(0);
          setTimeout(() => {
            setIsAnimating(false);
            isAnimatingRef.current = false;
          }, 250);
        }
      } else {
        // Snap back to original position
        isAnimatingRef.current = true;
        setIsAnimating(true);
        setSwipeOffset(0);
        setTimeout(() => {
          setIsAnimating(false);
          isAnimatingRef.current = false;
        }, 250);
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, []); // Empty deps - handlers use refs

  if (!turn) return null;

  const swipeStyle = {
    transform: `translateX(${swipeOffset}px)`,
    transition: isAnimating ? 'transform 0.25s ease-out' : 'none',
  };

  return (
    <div 
      ref={containerRef}
      className={`chat-thread ${isPreview ? 'chat-thread--preview' : ''}`} 
      onWheel={handleWheel}
      style={swipeStyle}
    >
      <MessageBubble
        message={turn.user.message}
        isUser={true}
        onExpandArtifact={onExpandArtifact}
      />
      <MessageBubble
        message={turn.ai.message}
        isUser={false}
        artifact={turn.ai.artifact}
        onExpandArtifact={onExpandArtifact}
      />
    </div>
  );
};

export default ChatThread;
