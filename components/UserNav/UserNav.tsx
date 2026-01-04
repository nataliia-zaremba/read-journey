"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./UserNav.module.css";

export default function UserNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <Link
        href="/recommended"
        className={`${styles.link} ${
          pathname === "/recommended" ? styles.active : ""
        }`}
      >
        Home
      </Link>
      <Link
        href="/library"
        className={`${styles.link} ${
          pathname === "/library" ? styles.active : ""
        }`}
      >
        My library
      </Link>
    </nav>
  );
}
