import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import styles from "./Appearan.module.css";
export const Appearance = ()=>{


    // const location = useLocation();
    // const isChatsActive = location.pathname === '/us/settings' || location.pathname === '/us/settings';
    const { theme, setTheme } = useContext(ThemeContext);
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
      };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Appearance</h1>
      <p className={styles.currentTheme}>Текущая тема: <strong>{theme}</strong></p>
      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${theme === "light" ? styles.active : ""}`}
          onClick={() => setTheme("light")}
        >
          Светлая тема
        </button>
        <button
          className={`${styles.button} ${theme === "dark" ? styles.active : ""}`}
          onClick={() => setTheme("dark")}
        >
          Тёмная тема
        </button>
        <button
          className={`${styles.button} ${theme === "color" ? styles.active : ""}`}
          onClick={() => setTheme("color")}
        >
          Цветная тема
        </button>
      </div>
    </div>
  );
}