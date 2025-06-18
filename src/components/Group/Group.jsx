import { useEffect, useState } from 'react';
import styles from './Group.module.css';
import { getGroupMe } from '../../hooks/api';
import { useNavigate } from 'react-router-dom';

const fallbackImg = "/imgs/log/Group 25 (2).svg";

const Group = () => {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getGroupMe()
      .then((data) => {
        setGroups(data);
        setFilteredGroups(data);
      })
      .catch((error) => {
        console.error("Ошибка при получении групп:", error.message);
        setGroups([]);
        setFilteredGroups([]);
      });
  }, []);
console.log(groups)
  useEffect(() => {
    const filtered = groups.filter(group =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGroups(filtered);
  }, [searchTerm, groups]);

  return (
        <div className={styles.all_chast_div}>
      
 

        <div className={styles.input_div}>
          <input value={ searchTerm}         placeholder="Поиск групп"     onChange={(e) => setSearchTerm(e.target.value)} type="text" />
        </div>

        {/* {!isSearching && isSms.map((smss) => (
          <CrElChats key={smss.id_chat} sms={smss} />
        ))} */}


          <div className={styles.div_groups}>
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <div
              className={styles.div_groups_elem}
              key={group.id_group}
              onClick={() => navigate("/us/group_info", { state: group })}
            >
             <img
  className={styles.groupPhoto}
  src={group.group_photo_base64 ? group.group_photo_base64 : fallbackImg}
  alt={group.name}
/>
              <div>
                <p>{group.name}</p>
                <p className={styles.description}>
                  {group.description || "Нет описания"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ padding: "20px" }}>Нет доступных групп</p>
        )}
      </div>

    
    </div>
    // 
    // 
    // 
    // 
    // <div>
    //   <div className={styles.search_input_wrapper}>
    //     <input
    //       type="text"
    //       value={searchTerm}
    //       onChange={(e) => setSearchTerm(e.target.value)}
    //       placeholder="Поиск по группам"
    //       className={styles.search_input}
    //     />
    //   </div>


    // </div>
  );
};

export default Group;
