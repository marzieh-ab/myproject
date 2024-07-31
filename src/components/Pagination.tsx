import React from 'react';

interface PaginationProps {
  productsPerPage: number;
  totalProducts: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const nextPage = () => {
    if (currentPage < pageNumbers.length) paginate(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) paginate(currentPage - 1);
  };

  return (
    <nav className="flex items-center justify-center mt-4">
     
      <button
        onClick={prevPage}
        className={`px-4 py-2 mx-1 rounded-md border border-gray-300 bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

 
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`w-10 h-10 flex items-center justify-center mx-1 rounded-md border border-gray-300 ${
            number === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {number}
        </button>
      ))}

   
      <button
        onClick={nextPage}
        className={`px-4 py-2 mx-1 rounded-md border border-gray-300 bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={currentPage === pageNumbers.length}
      >
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;
