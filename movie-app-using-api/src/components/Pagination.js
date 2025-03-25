import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
}) {
  return (
    <div className="pagination d-flex justify-content-between">
      <button
        className="btn btn-primary"
        disabled={currentPage === 1}
        onClick={onPrevPage}
      >
        Prev
      </button>
      <button
        className="btn btn-primary"
        disabled={currentPage === totalPages}
        onClick={onNextPage}
      >
        Next
      </button>
    </div>
  );
}
