import React from 'react';
import '../styles/Pagination.css';

/**
 * A reusable pagination component
 * 
 * @param {Object} props
 * @param {number} props.currentPage - The current active page
 * @param {number} props.totalPages - The total number of pages
 * @param {Function} props.onPageChange - Function to call when page changes
 * @param {number} [props.maxVisiblePages=5] - Maximum number of visible page buttons
 * @param {string} [props.className=''] - Additional CSS class for the pagination container
 * @param {boolean} [props.showFirstLast=true] - Whether to show first/last page buttons
 * @param {boolean} [props.showPrevNext=true] - Whether to show previous/next buttons
 */
const Pagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    maxVisiblePages = 2,
    className = '',
    showFirstLast = true,
    showPrevNext = true
}) => {
    if (totalPages <= 1) return null;

    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add first page and ellipsis if needed
    if (showFirstLast && startPage > 1) {
        pages.push(
            <span key="1" className="pageNr" onClick={() => onPageChange(1)}>1</span>
        );
        if (startPage > 2) {
            pages.push(<span key="dots1" className="pageNr">..</span>);
        }
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
        pages.push(
            <span 
                key={i} 
                className={`pageNr ${currentPage === i ? 'active' : ''}`}
                onClick={() => onPageChange(i)}
            >
                {i}
            </span>
        );
    }

    // Add last page and ellipsis if needed
    if (showFirstLast && endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pages.push(<span key="dots2" className="pageNr">..</span>);
        }
        pages.push(
            <span 
                key={totalPages} 
                className="pageNr"
                onClick={() => onPageChange(totalPages)}
            >
                {totalPages}
            </span>
        );
    }

    return (
        <div className={`pagination ${className}`}>
            {showPrevNext && currentPage > 1 && (
                <span 
                    className="pageNr prevPage"
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <span className="arrow"></span>
                </span>
            )}
            {pages}
            {showPrevNext && currentPage < totalPages && (
                <span 
                    className="pageNr nextPage"
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    <span className="arrow"></span>
                </span>
            )}
        </div>
    );
};

export default Pagination; 