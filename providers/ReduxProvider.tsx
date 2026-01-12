"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import { useEffect } from "react";
import { restoreSession, getCurrentUser } from "@/lib/redux/authSlice";
import { Toaster } from "react-hot-toast";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Відновлюємо сесію при завантаженні додатку
    const token = localStorage.getItem("token");
    if (token) {
      store.dispatch(restoreSession());
      // Завантажуємо дані користувача
      store.dispatch(getCurrentUser());
    }
  }, []);

  return (
    <Provider store={store}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#262626",
            color: "#f9f9f9",
            border: "1px solid rgba(249, 249, 249, 0.1)",
          },
          success: {
            iconTheme: {
              primary: "#4ade80",
              secondary: "#f9f9f9",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#f9f9f9",
            },
          },
        }}
      />
      {children}
    </Provider>
  );
}
