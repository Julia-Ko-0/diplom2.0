import styles from "./User.module.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { areFriends, getUserInfo, getUsersInfo } from "../../hooks/api";

export const User = () => {
  const { state } = useLocation();
  const [isUserInfo, setUserIndo] = useState({});
  const [isBoolean, setBoolean] = useState({});
  console.log(state);
  useEffect(() => {
    getUsersInfo(state.login)
      .then((data) => setUserIndo(data.user_info))
      .catch((error) => {
        console.error("Ошибка при получении:", error.message);
        setUserIndo({});
      });
    areFriends(state.id)
      .then((data) => setBoolean(data.are_friends))
      .catch((error) => {
        console.error("Ошибка при получении:", error.message);
        setBoolean({});
      });
  }, [state]);
  console.log(isBoolean);
  console.log(isUserInfo);
  // useEffect(()=>{

  // },[isUserInfo.id_user])

  return (
    <div>
      <div>
        <img
          className={styles.img_avatar}
          src={isUserInfo.profile_picture || "/imgs/log/Group 25 (2).svg"}
          alt="avatar"
          style={
            isUserInfo.profile_picture == null
              ? {
                  width: "auto",
                //   height: "00px",
                }
              : {
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }
          }
        />
        <p>{isUserInfo.username}</p>
        <p>0</p>
        <p>{isUserInfo.date_birth}</p>
        {isBoolean && (
          <div>
            <p>В друзьях</p>
          </div>
        )}
        {!isBoolean && (
          <div>
            <button>Добавить в друзья</button>
          </div>
        )}
      </div>
      <div>
        <div>
          <p>Друзья</p>
          <p>{isUserInfo.friends_count}</p>
        </div>
        <div>
          <p>Подписчики</p>
          <p>{isUserInfo.subscribers_count}</p>
        </div>
      </div>
    </div>
  );
};
