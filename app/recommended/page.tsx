"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import Dashboard from "@/components/Dashboard/Dashboard";
import BookCard from "@/components/BookCard/BookCard";
import BookDetailsModal from "@/components/BookDetailsModal/BookDetailsModal";
import { booksAPI, Book } from "@/lib/api/books";
import toast from "react-hot-toast";
import styles from "./page.module.css";

export default function RecommendedPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ title: "", author: "" });
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Завантаження книг
  const fetchBooks = async (page: number, filterData = filters) => {
    try {
      setLoading(true);
      const response = await booksAPI.getRecommended({
        page,
        limit: 10,
        title: filterData.title,
        author: filterData.author,
      });

      setBooks(response.results);
      setTotalPages(response.totalPages);
      setCurrentPage(response.page);
    } catch (error: any) {
      console.error("Error fetching books:", error);
      toast.error("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  // Завантаження при монтуванні
  useEffect(() => {
    fetchBooks(1);
  }, []);

  // Обробка фільтрів
  const handleFilter = (data: { title: string; author: string }) => {
    setFilters(data);
    fetchBooks(1, data);
  };

  // Обробка пагінації
  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchBooks(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchBooks(currentPage + 1);
    }
  };

  // Обробка кліку по книзі
  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  // Закриття модалки
  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  // Додавання книги до бібліотеки
  const handleAddToLibrary = async (bookId: string) => {
    try {
      await booksAPI.addBook(bookId);
      toast.success("Book added to library!");
      setSelectedBook(null);
    } catch (error: any) {
      console.error("Error adding book:", error);
      toast.error(error.response?.data?.message || "Failed to add book");
    }
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Dashboard showFilters={true} onFilter={handleFilter} />

          <div className={styles.content}>
            <div className={styles.header}>
              <h1 className={styles.title}>Recommended</h1>
              <div className={styles.pagination}>
                <button
                  className={styles.arrowBtn}
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
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
                  disabled={currentPage === totalPages}
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

            {loading ? (
              <div className={styles.placeholder}>Loading books...</div>
            ) : books.length > 0 ? (
              <div className={styles.booksGrid}>
                {books.map((book) => (
                  <BookCard
                    key={book._id}
                    id={book._id}
                    title={book.title}
                    author={book.author}
                    imageUrl={book.imageUrl}
                    totalPages={book.totalPages}
                    onClick={() => handleBookClick(book)}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.placeholder}>No books found</div>
            )}
          </div>
        </div>
      </main>

      {selectedBook && (
        <BookDetailsModal
          book={selectedBook}
          onClose={handleCloseModal}
          onAddToLibrary={handleAddToLibrary}
        />
      )}
    </>
  );
}
