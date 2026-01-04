import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import styles from "./LoginForm.module.css";

// Схема валідації
const loginSchema = yup
  .object({
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

type LoginFormData = yup.InferType<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log("Form data:", data);
      // TODO: Відправка на backend
      // const response = await fetch('https://readjourney.b.goit.study/api/users/signin', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });

      // TODO: Обробка відповіді та редірект на /recommended
    } catch (error) {
      console.error("Login error:", error);
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
            Log In
          </button>
        </form>

        <p className={styles.linkText}>
          Dont have an account?{" "}
          <Link href="/register" className={styles.link}>
            Registration
          </Link>
        </p>
      </div>
    </div>
  );
}
