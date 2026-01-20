"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Filters from "../Filters/Filters";
import AddBook from "../AddBook/AddBook";
import { Book } from "@/lib/api/books";
import styles from "./Dashboard.module.css";

interface DashboardProps {
  children?: React.ReactNode;
  showFilters?: boolean;
  showAddBook?: boolean;
  recommendedBooks?: Book[];
  onFilter?: (data: { title: string; author: string }) => void;
  onAddBook?: (data: {
    title: string;
    author: string;
    totalPages: number;
  }) => void;
}

export default function Dashboard({
  children,
  showFilters = true,
  showAddBook = false,
  recommendedBooks,
  onFilter,
  onAddBook,
}: DashboardProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 3;

  const handleFilter = (data: { title: string; author: string }) => {
    if (onFilter) {
      onFilter(data);
    }
  };

  const handleAddBook = (data: {
    title: string;
    author: string;
    totalPages: number;
  }) => {
    if (onAddBook) {
      onAddBook(data);
    }
  };

  const handleNextPage = () => {
    if (
      recommendedBooks &&
      (currentPage + 1) * booksPerPage < recommendedBooks.length
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const displayedBooks =
    recommendedBooks?.slice(
      currentPage * booksPerPage,
      (currentPage + 1) * booksPerPage
    ) || [];

  const hasNextPage =
    recommendedBooks &&
    (currentPage + 1) * booksPerPage < recommendedBooks.length;
  const hasPrevPage = currentPage > 0;

  return (
    <aside className={styles.dashboard}>
      {showFilters && <Filters onFilter={handleFilter} />}
      {showAddBook && <AddBook onAddBook={handleAddBook} />}

      {children}

      {recommendedBooks && recommendedBooks.length > 0 && (
        <div className={styles.recommendedBlock}>
          <div className={styles.recommendedHeader}>
            <h3 className={styles.recommendedTitle}>Recommended books</h3>
            <div className={styles.pagination}>
              <button
                className={styles.arrowBtn}
                onClick={handlePrevPage}
                disabled={!hasPrevPage}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M12.5 15L7.5 10L12.5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                className={styles.arrowBtn}
                onClick={handleNextPage}
                disabled={!hasNextPage}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M7.5 15L12.5 10L7.5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.recommendedList}>
            {displayedBooks.map((book) => (
              <div key={book._id} className={styles.recommendedCard}>
                <Image
                  src={book.imageUrl}
                  alt={book.title}
                  width={71}
                  height={107}
                  className={styles.recommendedImage}
                />
                <div className={styles.recommendedInfo}>
                  <h4 className={styles.recommendedBookTitle}>{book.title}</h4>
                  <p className={styles.recommendedAuthor}>{book.author}</p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/recommended" className={styles.homeLink}>
            Home
          </Link>
        </div>
      )}

      <div className={styles.workoutBlock}>
        <h3 className={styles.workoutTitle}>Start your workout</h3>
        <ul className={styles.workoutList}>
          <li className={styles.workoutItem}>
            <span className={styles.number}>1</span>
            <p className={styles.workoutText}>
              Create a personal library:{" "}
              <span className={styles.textMuted}>
                add the books you intend to read to it.
              </span>
            </p>
          </li>
          <li className={styles.workoutItem}>
            <span className={styles.number}>2</span>
            <p className={styles.workoutText}>
              Create your first workout:{" "}
              <span className={styles.textMuted}>
                define a goal, choose a period, start training.
              </span>
            </p>
          </li>
        </ul>

        <Link href="/library" className={styles.libraryLink}>
          My library
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      <div className={styles.quoteBlock}>
        <Image
          src="/books.png"
          alt="Books"
          width={40}
          height={40}
          className={styles.booksImage}
        />
        <p className={styles.quote}>
          Books are <span className={styles.quoteAccent}>windows</span> to the
          world, and reading is a journey into the unknown.
        </p>
      </div>
    </aside>
  );
}
