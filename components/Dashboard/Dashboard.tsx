import Link from "next/link";
import Image from "next/image";
import Filters from "../Filters/Filters";
import styles from "./Dashboard.module.css";

interface DashboardProps {
  children?: React.ReactNode;
  showFilters?: boolean;
  onFilter?: (data: { title: string; author: string }) => void;
}

export default function Dashboard({
  children,
  showFilters = true,
  onFilter,
}: DashboardProps) {
  const handleFilter = (data: { title: string; author: string }) => {
    if (onFilter) {
      onFilter(data);
    }
  };

  return (
    <aside className={styles.dashboard}>
      {showFilters && <Filters onFilter={handleFilter} />}

      {children}

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
