"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Book } from "@/lib/api/books";
import styles from "./BookDetailsModal.module.css";

interface BookDetailsModalProps {
  book: Book;
  onClose: () => void;
  onAddToLibrary: (bookId: string) => void;
}

export default function BookDetailsModal({
  book,
  onClose,
  onAddToLibrary,
}: BookDetailsModalProps) {
  // Закриття по ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Блокування скролу body
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToLibrary = () => {
    onAddToLibrary(book._id);
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <Image
              src={book.imageUrl}
              alt={book.title}
              fill
              className={styles.image}
            />
          </div>

          <div className={styles.info}>
            <h2 className={styles.title}>{book.title}</h2>
            <p className={styles.author}>{book.author}</p>
            <p className={styles.pages}>{book.totalPages} pages</p>

            <button className={styles.addBtn} onClick={handleAddToLibrary}>
              Add to library
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
