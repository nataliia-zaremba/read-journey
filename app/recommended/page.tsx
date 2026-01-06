"use client";

import { useState } from "react";
import Header from "@/components/Header/Header";
import Dashboard from "@/components/Dashboard/Dashboard";
import styles from "./page.module.css";

export default function RecommendedPage() {
  const [filters, setFilters] = useState({ title: "", author: "" });

  const handleFilter = (data: { title: string; author: string }) => {
    setFilters(data);
    console.log("Filters applied:", data);
    // TODO: Відправити запит на API з фільтрами
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
                <button className={styles.arrowBtn} disabled>
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
                <button className={styles.arrowBtn}>
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

            <div className={styles.booksGrid}>
              <p className={styles.placeholder}>Loading books...</p>
              {/* TODO: Тут будуть картки книг */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
