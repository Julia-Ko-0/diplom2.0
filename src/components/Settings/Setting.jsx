import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./Setting.module.css";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

export const Settings = () => {
  const location = useLocation();
  const isChatsActive = location.pathname === "/us/settings";

  const navigate = useNavigate();

  return (
    <div className={styles.div_settings}>
      <div className={styles.div_settings_}>
        <div>
          <button
            onClick={() => {
              navigate("/us/home/posts");
            }}
          >
            Назад
          </button>
        </div>
        <div className={styles.div_settings_select}>
          <Outlet />
        </div>

        <div className={styles.menu}>
          <NavLink
            to="akk"
            className={({ isActive }) =>
              isActive
                ? `${styles.elem_menu} ${styles.active}`
                : styles.elem_menu
            }
          >
            Аккаунт
          </NavLink>

          <NavLink
            to="appearance"
            className={({ isActive }) =>
              isActive
                ? `${styles.elem_menu} ${styles.active}`
                : styles.elem_menu
            }
          >
            Внешний вид
          </NavLink>
          <NavLink
            to="blacklist"
            className={({ isActive }) =>
              isActive
                ? `${styles.elem_menu} ${styles.active}`
                : styles.elem_menu
            }
          >
            Черный список
          </NavLink>

          <NavLink
            to="fav"
            className={({ isActive }) =>
              isActive
                ? `${styles.elem_menu} ${styles.active}`
                : styles.elem_menu
            }
          >
            Избранное
          </NavLink>
          <NavLink
            to="security"
            className={({ isActive }) =>
              isActive
                ? `${styles.elem_menu} ${styles.active}`
                : styles.elem_menu
            }
          >
            Безопасность
          </NavLink>
        </div>
      </div>
    </div>
  );
};
