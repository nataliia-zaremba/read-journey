import Link from "next/link";
import Image from "next/image";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <Link href="/recommended" className={styles.logo}>
      <Image
        src="/logo.svg"
        alt="Read Journey"
        width={42}
        height={17}
        priority
      />
      <span className={styles.text}>READ JOURNEY</span>
    </Link>
  );
}
