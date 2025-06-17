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
        setGroups(data);
      })
      .catch((error) => {
        console.error("Ошибка при получении групп:", error.message);
        setGroups([]);
      });
  }, []);

  return (
<div>
        <div className={styles.div_groups}>
      {groups.length > 0 ? (
        groups.map((group) => (
          <div
            className={styles.div_groups_elem}
            key={group.id_group}
            
            onClick={() =>  navigate("/us/group_info", { state:   group })}
          >
            <img
              src={group.profile_picture ? group.profile_picture : fallbackImg}
              alt={group.name}
            />
            <div>
              <p>{group.name}</p>
              <p className={styles.description}>{group.description || "Нет описания"}</p>
            </div>
          </div>
        ))
      ) : (
        <p style={{ padding: "20px" }}>Нет доступных групп</p>
      )}
    </div>

</div>
  );
};

export default Group;
