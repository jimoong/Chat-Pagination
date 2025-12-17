import { useRef, useCallback, useEffect } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, expandedFromPage, onPreview }) => {
  const dotsRef = useRef(null);
  const isDragging = useRef(false);
  const draggedPageIndex = useRef(null);
  
  // Store callbacks in refs to avoid stale closures in event listeners
  const onPreviewRef = useRef(onPreview);
  const onPageChangeRef = useRef(onPageChange);
  
  useEffect(() => {
    onPreviewRef.current = onPreview;
    onPageChangeRef.current = onPageChange;
  }, [onPreview, onPageChange]);

  const goToPrevious = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  const getDotClassName = (index) => {
    const classes = ['pagination__dot'];
    if (index === currentPage) {
      classes.push('pagination__dot--active');
    }
    if (index === expandedFromPage) {
      classes.push('pagination__dot--expanded');
    }
    return classes.join(' ');
  };

  // Find which dot is at the given touch coordinates
  const getDotIndexAtPoint = useCallback((x, y) => {
    if (!dotsRef.current) return null;
    
    const dots = dotsRef.current.querySelectorAll('.pagination__dot');
    for (let i = 0; i < dots.length; i++) {
      const rect = dots[i].getBoundingClientRect();
      // Add some padding for easier touch targeting
      const padding = 8;
      if (
        x >= rect.left - padding &&
        x <= rect.right + padding &&
        y >= rect.top - padding &&
        y <= rect.bottom + padding
      ) {
        return i;
      }
    }
    return null;
  }, []);

  // Use native event listeners with { passive: false } for proper touch handling
  useEffect(() => {
    const dotsElement = dotsRef.current;
    if (!dotsElement) return;

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      const dotIndex = getDotIndexAtPoint(touch.clientX, touch.clientY);
      
      if (dotIndex !== null) {
        isDragging.current = true;
        draggedPageIndex.current = dotIndex;
        onPreviewRef.current(dotIndex);
        e.preventDefault(); // Prevent scrolling when starting on a dot
      }
    };

    const handleTouchMove = (e) => {
      if (!isDragging.current) return;
      
      const touch = e.touches[0];
      const dotIndex = getDotIndexAtPoint(touch.clientX, touch.clientY);
      
      if (dotIndex !== null && dotIndex !== draggedPageIndex.current) {
        draggedPageIndex.current = dotIndex;
        onPreviewRef.current(dotIndex);
      }
      
      e.preventDefault(); // Prevent scrolling during drag
    };

    const handleTouchEnd = () => {
      if (!isDragging.current) return;
      
      isDragging.current = false;
      
      // Navigate to the last previewed page
      if (draggedPageIndex.current !== null) {
        onPageChangeRef.current(draggedPageIndex.current);
        onPreviewRef.current(null);
        draggedPageIndex.current = null;
      }
    };

    // Add event listeners with { passive: false } to allow preventDefault
    dotsElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    dotsElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    dotsElement.addEventListener('touchend', handleTouchEnd);

    return () => {
      dotsElement.removeEventListener('touchstart', handleTouchStart);
      dotsElement.removeEventListener('touchmove', handleTouchMove);
      dotsElement.removeEventListener('touchend', handleTouchEnd);
    };
  }, [getDotIndexAtPoint]);

  return (
    <div className="pagination">
      <button
        className="pagination__arrow"
        onClick={goToPrevious}
        disabled={currentPage === 0}
        aria-label="Previous page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div 
        className="pagination__dots"
        ref={dotsRef}
      >
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={getDotClassName(index)}
            onClick={() => onPageChange(index)}
            onMouseEnter={() => onPreview(index)}
            onMouseLeave={() => onPreview(null)}
            aria-label={`Go to page ${index + 1}`}
            aria-current={index === currentPage ? 'page' : undefined}
          />
        ))}
      </div>

      <button
        className="pagination__arrow"
        onClick={goToNext}
        disabled={currentPage === totalPages - 1}
        aria-label="Next page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* <span className="pagination__info">
        {currentPage + 1} / {totalPages}
      </span> */}
    </div>
  );
};

export default Pagination;
