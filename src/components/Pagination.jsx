import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalResults = 40;
  const resultsPerPage = 10;
  const totalPages = 15;

  // Always show 1–7, then "..." and last page
  const getPaginationPages = () => {
    const pages = [];
    const maxVisible = 7;

    for (let i = 1; i <= Math.min(maxVisible, totalPages); i++) {
      pages.push(i);
    }

    if (totalPages > maxVisible) {
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 bg-white">
      <div className="flex items-center space-x-1">
        {/* Prev Button */}
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="text-gray-500 hover:text-[#247b7b] disabled:text-gray-300"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Page Numbers */}
        {getPaginationPages().map((page, idx) =>
          page === "..." ? (
            <span key={idx} className="px-2 text-gray-400 select-none">
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => setCurrentPage(page)}
              className={`w-7 h-7 flex items-center justify-center text-sm font-medium transition ${
                currentPage === page
                  ? "bg-[#247b7b] text-white rounded-full"
                  : "text-gray-700 hover:text-[#247b7b]"
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="text-gray-500 hover:text-[#247b7b] disabled:text-gray-300"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Results info */}
      <p className="text-sm font-nunito font-medium ">
        showing {resultsPerPage} of {totalResults} results
      </p>
    </div>
  );
};

export default Pagination;
