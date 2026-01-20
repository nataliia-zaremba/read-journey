"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import Dashboard from "@/components/Dashboard/Dashboard";
import MyLibraryBooks from "@/components/MyLibraryBooks/MyLibraryBooks";
import { booksAPI, Book } from "@/lib/api/books";
import toast from "react-hot-toast";
import styles from "./page.module.css";

export default function LibraryPage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);

  // Завантаження рекомендованих книг
  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const response = await booksAPI.getRecommended({ page: 1, limit: 10 });
        setRecommendedBooks(response.results);
      } catch (error) {
        console.error("Error fetching recommended books:", error);
      }
    };
    fetchRecommended();
  }, []);
  const handleAddBook = async (data: {
    title: string;
    author: string;
    totalPages: number;
  }) => {
    try {
      console.log("Adding book:", data);
      toast.success("Book added successfully!");
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    } catch (err) {
      console.error("Error adding book:", err);
      toast.error("Failed to add book");
    }
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Dashboard
            showFilters={false}
            showAddBook={true}
            recommendedBooks={recommendedBooks}
            onAddBook={handleAddBook}
          />

          <MyLibraryBooks />
        </div>
      </main>

      {showSuccessModal && (
        <div className={styles.successModal}>
          <div className={styles.modalContent}>
            <div className={styles.checkIcon}>✓</div>
            <p className={styles.modalText}>Book added successfully!</p>
          </div>
        </div>
      )}
    </>
  );
}
