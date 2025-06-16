import { useEffect, useState } from 'react';
import styles from './Group.module.css';
import { getGroupMe } from '../../hooks/api';
import { useNavigate } from 'react-router-dom';

const fallbackImg = "/imgs/log/Group 25 (2).svg";

const Group = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getGroupMe()
      .then((data) => {

          console.log(data);
setGroups(data)
     
      })
      .catch((error) => {
        console.error("Ошибка при получении групп:", error.message);
        setGroups([]);
      });
  }, []);

  return (
    <div className={styles.div_groups}>
      {groups.length > 0 ? (
        groups.map((group) => (
          <div
            className={styles.div_groups_elem}
            key={group.id_group}
            onClick={() => navigate("/us/group", { state: group })}
          >
            <img
              src={group.profile_picture || fallbackImg}
              alt={group.name}
            />
            <p>{group.name}</p>
            <p className={styles.description}>{group.description}</p>
          </div>
        ))
      ) : (
        <p style={{ padding: "20px" }}>Нет доступных групп</p>
      )}
    </div>
  );
};

export default Group;
