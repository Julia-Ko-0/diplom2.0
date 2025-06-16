import styles from "./FriendRe.module.css";
import { useEffect, useState } from "react";
import { getFriendRequests } from "../../hooks/api";

// Запасной аватар, добавь своё изображение
const imgPlaceholder ="/imgs/log/Group 25 (2).svg"; // путь подкорректируй

export const FriendRe = () => {
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    getFriendRequests()
      .then((data) => setRequests(data.requests || []))
      .catch((error) => {
        console.error("Ошибка при получении заявок:", error.message);
        setRequests([]);
      });
  }, []);

  const handleAccept = (id) => {
    console.log("Принять", id);
  };

  const handleDecline = (id) => {
    console.log("Отклонить", id);
  };

  if (requests === null) {
    return <p>Загрузка...</p>;
  }

  if (requests.length === 0) {
    return <p>Похоже, заявок нет.</p>;
  }

  return (
    <ul className={styles.request_list}>
      {requests.map((req) => (
        <li key={req.id} className={styles.request_item}>
          <img
            src={req.avatar || imgPlaceholder}
            alt="avatar"
            className={styles.avatar}
          />
          <div className={styles.info}>
            <span className={styles.name}>{req.login}</span>
            <div className={styles.actions}>
              <button onClick={() => handleAccept(req.id)}>Принять</button>
              <button onClick={() => handleDecline(req.id)}>Отклонить</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
