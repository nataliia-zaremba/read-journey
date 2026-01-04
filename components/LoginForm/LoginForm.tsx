"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { loginUser } from "@/lib/redux/authSlice";
import Logo from "@/components/Logo/Logo";
import styles from "./LoginForm.module.css";

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
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/recommended");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: LoginFormData) => {
    await dispatch(loginUser(data));
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.formWrapper}>
          <div className={styles.logoContainer}>
            <Logo />
          </div>

          <h1 className={styles.title}>
            Expand your mind, reading{" "}
            <span className={styles.titleAccent}>a book</span>
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                id="email"
                type="email"
                placeholder="Mail: Your@email.com"
                className={styles.input}
                {...register("email")}
                disabled={isLoading}
              />
              {errors.email && (
                <span className={styles.error}>{errors.email.message}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password: Yourpasswordhere"
                  className={styles.input}
                  {...register("password")}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.password && (
                <span className={styles.error}>{errors.password.message}</span>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Log In"}
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

      <div className={styles.rightSection}>
        <Image
          src="/iPhone 15 Black.png"
          alt="Read Journey App"
          width={400}
          height={800}
          priority
          className={styles.phoneImage}
        />
      </div>
    </div>
  );
}
