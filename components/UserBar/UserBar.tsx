"use client";

import { useAppSelector } from "@/lib/redux/hooks";
import styles from "./UserBar.module.css";

export default function UserBar() {
  const { user } = useAppSelector((state) => state.auth);

  // Отримуємо першу літеру імені для аватара
  const initial = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className={styles.userBar}>
      <div className={styles.avatar}>{initial}</div>
      <span className={styles.name}>{user?.name || "User"}</span>
    </div>
  );
}
