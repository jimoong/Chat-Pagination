const Pagination = ({ currentPage, totalPages, onPageChange, expandedFromPage }) => {
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

      <div className="pagination__dots">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={getDotClassName(index)}
            onClick={() => onPageChange(index)}
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

      <span className="pagination__info">
        {currentPage + 1} / {totalPages}
      </span>
    </div>
  );
};

export default Pagination;
