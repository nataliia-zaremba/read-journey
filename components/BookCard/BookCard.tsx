import Image from "next/image";
import styles from "./BookCard.module.css";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages?: number;
  onClick?: () => void;
}

export default function BookCard({
  id,
  title,
  author,
  imageUrl,
  totalPages,
  onClick,
}: BookCardProps) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>{author}</p>
      </div>
    </div>
  );
}
