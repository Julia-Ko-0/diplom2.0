import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./novbar.module.css";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../hooks/api";
let img_p =
  "https://i.pinimg.com/564x/36/e8/98/36e898e3c962164b04091ff4e752db6f.jpg";
async function logout() {
  try {
    const response = await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include", // обязательно для отправки куки
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Ошибка:", errorData);
      return;
    }

    const result = await response.json();
    console.log("Успех:", result);
  } catch (err) {
    console.error("Сетевая ошибка:", err);
  }
}
export const NovBar = () => {
  const [isUserInfo, setUserIndo] = useState({});
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    getUserInfo()
      .then((data) => setUserIndo(data.user_info))
      .catch((error) => {
        console.error("Ошибка при получении:", error.message);
        setUserIndo({});
      });
  }, []);
  console.log(isUserInfo);
  return (
    <div className={styles.div_novbar}>
      <div className={styles.div_novbar_}>
        <div className={styles.div_novbar_left}></div>
        <div className={styles.div_novbar_img_wrapper} ref={buttonRef}>
          <div className={styles.div_novbar_img}>
            {/* <svg   onClick={()=>{
        navigate('/us/settings');
   }}
     width="48" height="46" viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.5 36.5L3.5 31.5C9.5 25.9 5 22.8333 2 22L3 16.5C10.2 16.1 9 10.6667 7.5 8L12 4.5C18 8.5 20.5 3.83333 21 1H27C28.6 8.6 33.6667 5.83333 36 3.5L40.5 7.5C37.3 14.7 42.5 16.1667 45.5 16L46.5 21.5C38.5 23.9 41.8333 29.1667 44.5 31.5L42 36C34.8 33.6 34 39.3333 34.5 42.5L29 44.5C25 37.7 21 41.6667 19.5 44.5L14 42.5C14.8 34.5 9.33333 35.1667 6.5 36.5Z" stroke="black" stroke-width="2"/>
<circle cx="24" cy="22.5" r="9.5" stroke="black" stroke-width="2"/>
</svg> */}

            <img
              src={isUserInfo.profile_picture || img_p}
              style={{ width: "50px" }}
              onClick={() => {
                navigate("/us/user", {
                  state: {
                    login: isUserInfo.username,
                    id: isUserInfo.id_user,
                    me: true,
                  },
                });
              }}
            ></img>
            <p>{isUserInfo.username}</p>
            <div
              style={{ width: "35px" }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                width="20"
                height="15"
                viewBox="0 0 47 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L23 20L46 1"
                  stroke-linecap="round"
                  stroke-width="5"
                />
              </svg>{" "}
            </div>
          </div>
          {menuOpen && (
            <div className={styles.div_novbar_menu} ref={menuRef}>
              <div
                className={styles.div_novbar_menu_elem}
                onClick={() => {
                  navigate("/us/friends_request");
                  setMenuOpen(false);
                }}
              >
                <svg
                  viewBox="0 0 48 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.5 36.5L3.5 31.5C9.5 25.9 5 22.8333 2 22L3 16.5C10.2 16.1 9 10.6667 7.5 8L12 4.5C18 8.5 20.5 3.83333 21 1H27C28.6 8.6 33.6667 5.83333 36 3.5L40.5 7.5C37.3 14.7 42.5 16.1667 45.5 16L46.5 21.5C38.5 23.9 41.8333 29.1667 44.5 31.5L42 36C34.8 33.6 34 39.3333 34.5 42.5L29 44.5C25 37.7 21 41.6667 19.5 44.5L14 42.5C14.8 34.5 9.33333 35.1667 6.5 36.5Z"
                    stroke-width="2"
                  />
                  <circle cx="24" cy="22.5" r="9.5" stroke-width="2" />
                </svg>
                <p>Заявки в друзья</p>
              </div>
              <div
                className={styles.div_novbar_menu_elem}
                onClick={() => {
                  navigate("/us/settings/appearance");
                  setMenuOpen(false);
                }}
              >
                <svg
                  viewBox="0 0 48 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.5 36.5L3.5 31.5C9.5 25.9 5 22.8333 2 22L3 16.5C10.2 16.1 9 10.6667 7.5 8L12 4.5C18 8.5 20.5 3.83333 21 1H27C28.6 8.6 33.6667 5.83333 36 3.5L40.5 7.5C37.3 14.7 42.5 16.1667 45.5 16L46.5 21.5C38.5 23.9 41.8333 29.1667 44.5 31.5L42 36C34.8 33.6 34 39.3333 34.5 42.5L29 44.5C25 37.7 21 41.6667 19.5 44.5L14 42.5C14.8 34.5 9.33333 35.1667 6.5 36.5Z"
                    stroke-width="2"
                  />
                  <circle cx="24" cy="22.5" r="9.5" stroke-width="2" />
                </svg>
                <p>Настройки</p>
              </div>
              <div
                className={styles.div_novbar_menu_elem}
                onClick={() => {
                  navigate("/login");
                  logout();
                }}
              >
                <svg
                  viewBox="0 0 48 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.5 36.5L3.5 31.5C9.5 25.9 5 22.8333 2 22L3 16.5C10.2 16.1 9 10.6667 7.5 8L12 4.5C18 8.5 20.5 3.83333 21 1H27C28.6 8.6 33.6667 5.83333 36 3.5L40.5 7.5C37.3 14.7 42.5 16.1667 45.5 16L46.5 21.5C38.5 23.9 41.8333 29.1667 44.5 31.5L42 36C34.8 33.6 34 39.3333 34.5 42.5L29 44.5C25 37.7 21 41.6667 19.5 44.5L14 42.5C14.8 34.5 9.33333 35.1667 6.5 36.5Z"
                    stroke-width="2"
                  />
                  <circle cx="24" cy="22.5" r="9.5" stroke-width="2" />
                </svg>
                <p>Выйти</p>
              </div>
            </div>
          )}{" "}
        </div>{" "}
      </div>
    </div>
  );
};
