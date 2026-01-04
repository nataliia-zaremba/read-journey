"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/hooks";
import { logoutUser } from "@/lib/redux/authSlice";
import styles from "./LogoutButton.module.css";

export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push("/login");
  };

  return (
    <button onClick={handleLogout} className={styles.logoutBtn}>
      Log out
    </button>
  );
}
