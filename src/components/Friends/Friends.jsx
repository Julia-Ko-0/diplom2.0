import styles from './Friends.module.css';
import { getFriendsList, removeFriend } from '../../hooks/api';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

let img_p = "/imgs/log/Group 25 (2).svg";

export const Friends = () => {
  const [isFriends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
    const [load, setLoad] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (friendId) => {
    try {
      await removeFriend(friendId);
      // После удаления обновляем список друзей
      setFriends((prevFriends) => prevFriends.filter((friend) => friend.id_user !== friendId));
      setFilteredFriends((prevFriends) => prevFriends.filter((friend) => friend.id_user !== friendId));
    setLoad(p=>!p)
    } catch (err) {
      console.error('Ошибка при удалении друга:', err);
      alert('Ошибка при удалении друга');
    }
  };

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
  }, [load]);

  useEffect(() => {
    const filtered = isFriends?.filter(friend =>
      friend.login.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFriends(filtered);
  }, [searchTerm, isFriends]);

  console.log(isFriends);

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
              <img
                src={e?.avatar || img_p}
                alt={e.login}
                style={
                  e?.avatar == null
                    ? {
                        width: "85px",
                      }
                    : {
                        width: "85px",
                        height: "85px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }
                }
              />
              <p>{e.login}</p>
              <button onClick={( event) => {
                 event.stopPropagation(); 
                 handleSubmit(e?.id)}}>Удалить из друзей</button>
            </div>
          ))}
        {filteredFriends?.length === 0 && <p style={{ padding: "20px" }}>Нет совпадений</p>}
      </div>
    </div>
  );
};
