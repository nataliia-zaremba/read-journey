import Header from "@/components/Header/Header";
import styles from "./page.module.css";

export default function RecommendedPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Recommended Books</h1>
          <p className={styles.text}>Content coming soon...</p>
        </div>
      </main>
    </>
  );
}
