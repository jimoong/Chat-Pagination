import { useRef, useCallback } from 'react';
import MessageBubble from './MessageBubble';

// Adjustable scroll pagination parameters
const SCROLL_CONFIG = {
  debounceMs: 50,      // Time between page changes (lower = faster)
  sensitivity: 15,      // Scroll delta threshold (lower = more sensitive)
};

const ChatThread = ({ turn, onExpandArtifact, onPageChange, currentPage, totalPages }) => {
  const lastScrollTime = useRef(0);

  const handleWheel = useCallback((e) => {
    const now = Date.now();
    if (now - lastScrollTime.current < SCROLL_CONFIG.debounceMs) return;

    // Scroll down = next page, scroll up = previous page
    if (e.deltaY > SCROLL_CONFIG.sensitivity && currentPage < totalPages - 1) {
      lastScrollTime.current = now;
      onPageChange(currentPage + 1);
    } else if (e.deltaY < -SCROLL_CONFIG.sensitivity && currentPage > 0) {
      lastScrollTime.current = now;
      onPageChange(currentPage - 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  if (!turn) return null;

  return (
    <div className="chat-thread" onWheel={handleWheel}>
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
