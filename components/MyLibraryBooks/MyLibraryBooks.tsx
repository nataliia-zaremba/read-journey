import styles from "./MyLibraryBooks.module.css";

export default function MyLibraryBooks() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My library</h1>
        <select className={styles.filter}>
          <option value="all">All books</option>
          <option value="unread">Unread</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className={styles.emptyState}>
        <div className={styles.icon}>📚</div>
        <p className={styles.emptyText}>
          To start training, add{" "}
          <span className={styles.link}>some of books</span> or from the
          recommended ones
        </p>
      </div>
    </div>
  );
}
