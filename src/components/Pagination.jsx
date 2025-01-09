import React from 'react';
import PropTypes from 'prop-types';

// Styles
import '../styles/Pagination.css';

/**
 * Pagination component to navigate through pages with controls for "First", "Prev", 
 * current page, "Next", and "Last". Displays 4 page numbers at a time.
 */
const Pagination = ({ projectsPerPage, totalProjects, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalProjects / projectsPerPage);

  if (totalPages <= 1) return null;
  
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);

  const pageNumbers = [
    ...(startPage > 1 ? [1] : []),
    ...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i),
    ...(endPage < totalPages ? [totalPages] : [])
  ];

  const disableFirst = currentPage === 1;
  const disableLast = currentPage === totalPages;

  const handleClick = (page) => {
    if (page !== currentPage) paginate(page);
  };

  return (
    <div className="pagination">
      <ul>
        <li
          className={disableFirst ? 'disabled' : ''}
          onClick={() => !disableFirst && handleClick(1)}
        >
          First
        </li>
        <li
          className={currentPage === 1 ? 'disabled' : ''}
          onClick={() => currentPage > 1 && handleClick(currentPage - 1)}
        >
          Prev
        </li>

        {pageNumbers.map((number) => (
          <li
            key={number}
            className={currentPage === number ? 'active' : ''}
            onClick={() => handleClick(number)}
          >
            {number}
          </li>
        ))}

        <li
          className={currentPage === totalPages ? 'disabled' : ''}
          onClick={() => currentPage < totalPages && handleClick(currentPage + 1)}
        >
          Next
        </li>
        <li
          className={disableLast ? 'disabled' : ''}
          onClick={() => !disableLast && handleClick(totalPages)}
        >
          Last
        </li>
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  projectsPerPage: PropTypes.number.isRequired,
  totalProjects: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
