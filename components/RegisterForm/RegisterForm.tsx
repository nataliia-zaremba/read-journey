import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import styles from "./RegisterForm.module.css";

// Схема валідації
const registerSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(7, "Password must be at least 7 characters")
      .required("Password is required"),
  })
  .required();

type RegisterFormData = yup.InferType<typeof registerSchema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log("Form data:", data);
      // TODO: Відправка на backend
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });

      // TODO: Обробка відповіді та редірект на /recommended
    } catch (error) {
      console.error("Registration error:", error);
      // TODO: Показати notification з помилкою
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>
          Expand your mind, reading{" "}
          <span className={styles.titleAccent}>a book</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              Name:
            </label>
            <input
              id="name"
              type="text"
              placeholder="Ilona Bazulchuk"
              className={styles.input}
              {...register("name")}
            />
            {errors.name && (
              <span className={styles.error}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Mail:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your@email.com"
              className={styles.input}
              {...register("email")}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Yourpasswordhere"
              className={styles.input}
              {...register("password")}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          <button type="submit" className={styles.submitBtn}>
            Registration
          </button>
        </form>

        <p className={styles.linkText}>
          Already have an account?{" "}
          <Link href="/login" className={styles.link}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
