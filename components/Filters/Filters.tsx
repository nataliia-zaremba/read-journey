"use client";

import { useForm } from "react-hook-form";
import styles from "./Filters.module.css";

interface FiltersFormData {
  title: string;
  author: string;
}

interface FiltersProps {
  onFilter: (data: FiltersFormData) => void;
}

export default function Filters({ onFilter }: FiltersProps) {
  const { register, handleSubmit, reset } = useForm<FiltersFormData>();

  const onSubmit = (data: FiltersFormData) => {
    onFilter(data);
  };

  return (
    <div className={styles.filters}>
      <h3 className={styles.title}>Filters:</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            id="title"
            type="text"
            placeholder="Book title: Enter text"
            className={styles.input}
            {...register("title")}
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            id="author"
            type="text"
            placeholder="The author: Enter text"
            className={styles.input}
            {...register("author")}
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          To apply
        </button>
      </form>
    </div>
  );
}
