import React from "react";

import styles from "./Pagination.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 7,
}: PaginationProps) => {
  const getPageNumbers = (
    totalPages: number,
    currentPage: number,
    maxVisiblePages: number
  ) => {
    let delta = Math.floor(maxVisiblePages / 2);
    let left = currentPage - delta;
    let right = currentPage + delta + (maxVisiblePages % 2 === 0 ? 0 : 1);
    let range = [];
    let rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers(totalPages, currentPage, maxVisiblePages);

  const handleClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className={styles.pagination}>
      <div
        className={`${styles.pagination__item} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        onClick={() => {
          if (currentPage !== 1) handleClick(currentPage - 1);
        }}
      >
        {"<"}
      </div>
      {pageNumbers.map((pageNumber, index) => (
        <div
          key={index}
          className={`${styles.pagination__item} ${
            pageNumber === "..." ? styles.dots : ""
          } ${pageNumber === currentPage ? styles.active : ""}`}
          onClick={() => {
            if (pageNumber !== "...") handleClick(pageNumber as number);
          }}
        >
          {pageNumber}
        </div>
      ))}
      <div
        className={`${styles.pagination__item} ${
          currentPage === totalPages ? styles.disabled : ""
        }`}
        onClick={() => {
          if (currentPage !== totalPages) handleClick(currentPage + 1);
        }}
      >
        {">"}
      </div>
    </div>
  );
};
