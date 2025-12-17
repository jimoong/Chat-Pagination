import { useRef, useCallback } from 'react';
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
};

const ChatThread = ({ turn, onExpandArtifact, onPageChange, currentPage, totalPages, isPreview }) => {
  const lastScrollTime = useRef(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isSwiping = useRef(false);

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

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = true;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isSwiping.current) return;
    
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;
    
    // If it's a horizontal swipe, prevent default to avoid page scroll
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      e.preventDefault();
    }
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (!isSwiping.current) return;
    isSwiping.current = false;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;
    
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    
    // Check if it's a valid horizontal swipe
    if (absX >= SWIPE_CONFIG.minDistance && absY / absX <= SWIPE_CONFIG.maxVerticalRatio) {
      if (deltaX < 0 && currentPage < totalPages - 1) {
        // Swipe left = next page
        onPageChange(currentPage + 1);
      } else if (deltaX > 0 && currentPage > 0) {
        // Swipe right = previous page
        onPageChange(currentPage - 1);
      }
    }
  }, [currentPage, totalPages, onPageChange]);

  if (!turn) return null;

  return (
    <div 
      className={`chat-thread ${isPreview ? 'chat-thread--preview' : ''}`} 
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
