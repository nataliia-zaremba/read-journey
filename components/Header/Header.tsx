import Logo from "../Logo/Logo";
import UserNav from "../UserNav/UserNav";
import UserBar from "../UserBar/UserBar";
import LogoutButton from "../LogoutButton/LogoutButton";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <div className={styles.rightSection}>
          <UserNav />
          <UserBar />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
