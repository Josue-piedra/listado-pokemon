import React from 'react';

const Pagination = ({ currentPage, totalPages, onPrevious, onNext }) => {
  return (
    <div className="flex justify-center mt-8 space-x-4">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="bg-red-600 text-white py-2 px-6 rounded-xl disabled:opacity-50 hover:bg-red-700 transform hover:scale-105"
      >
        Previous
      </button>
      <span className="text-white">{`${currentPage} / ${totalPages}`}</span>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="bg-red-600 text-white py-2 px-6 rounded-xl disabled:opacity-50 hover:bg-red-700 transform hover:scale-105"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

