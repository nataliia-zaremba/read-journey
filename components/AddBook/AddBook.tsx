"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./AddBook.module.css";

// Схема валідації
const addBookSchema = yup
  .object({
    title: yup.string().required("Book title is required"),
    author: yup.string().required("Author is required"),
    totalPages: yup
      .number()
      .typeError("Must be a number")
      .positive("Must be positive")
      .integer("Must be an integer")
      .required("Number of pages is required"),
  })
  .required();

type AddBookFormData = yup.InferType<typeof addBookSchema>;

interface AddBookProps {
  onAddBook: (data: AddBookFormData) => void;
}

export default function AddBook({ onAddBook }: AddBookProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddBookFormData>({
    resolver: yupResolver(addBookSchema),
  });

  const onSubmit = (data: AddBookFormData) => {
    onAddBook(data);
    reset();
  };

  return (
    <div className={styles.addBook}>
      <h3 className={styles.title}>Create your library:</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Book title: I See You Are Interested In Th..."
            className={styles.input}
            {...register("title")}
          />
          {errors.title && (
            <span className={styles.error}>{errors.title.message}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="The author: Hilarion Pavliuk"
            className={styles.input}
            {...register("author")}
          />
          {errors.author && (
            <span className={styles.error}>{errors.author.message}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Number of pages: 666"
            className={styles.input}
            {...register("totalPages")}
          />
          {errors.totalPages && (
            <span className={styles.error}>{errors.totalPages.message}</span>
          )}
        </div>

        <button type="submit" className={styles.submitBtn}>
          Add book
        </button>
      </form>
    </div>
  );
}
