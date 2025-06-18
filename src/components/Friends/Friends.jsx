import styles from './Friends.module.css';
import { getFriendsList } from '../../hooks/api';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

let img_p = "/imgs/log/Group 25 (2).svg";

export const Friends = () => {
  const [isFriends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getFriendsList()
      .then((data) => {
        setFriends(data.friends);
        setFilteredFriends(data.friends);
      })
      .catch((error) => {
        console.error("Ошибка при получении:", error.message);
        setFriends([]);
        setFilteredFriends([]);
      });
  }, []);

  useEffect(() => {
    const filtered = isFriends?.filter(friend =>
      friend.login.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFriends(filtered);
  }, [searchTerm, isFriends]);

  return (
    <div>
        <div className={styles.input_div}>
        <input
          type="text"
          placeholder="Поиск друзей"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
          <div className={styles.div_frends}>
      
      {filteredFriends?.length > 0 &&
        filteredFriends.map((e) => (
          <div
            className={styles.div_frends_elem}
            key={e.id_user}
            onClick={() => {
              navigate("/us/user", { state: e });
            }}
          >
            <img src={e.avatar || img_p} alt={e.login} />
            <p>{e.login}</p>
            <button>Удалить из друзей</button>
          </div>
        ))}

      {filteredFriends?.length === 0 && (
        <p style={{ padding: "20px" }}>Нет совпадений</p>
      )}
    </div>

    </div>

  );
};
