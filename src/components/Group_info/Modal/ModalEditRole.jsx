import { useEffect, useState } from "react"
import { addFeatureToRole, createRoleWithFeatures, getFeaturesInfo, getRolesInfoForGroup, removeFeature } from "../../../hooks/api"
import styles from "./Modal.module.css";

export const ModalEditRole = ({ role }) => {
  const [modalEditAddF, setmodalEditAddF] = useState(false);
    const [modalEditAddR, setmodalEditAddR] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalEdit, setModalEdit] = useState(null);
  const [isRole, setRole] = useState([]);
  const [isRoleAll, setRoleAll] = useState([]);

  // Состояния для чекбоксов и инпута
  const [selectedFeatureIds, setSelectedFeatureIds] = useState([]);
  const [roleName, setRoleName] = useState('');

  useEffect(() => {
    getRolesInfoForGroup(role?.group_id)
      .then((data) => {
        setRole(data?.roles);

        // Если редактируется какая-то роль — найдём её и обновим modalEdit
        if (modalEdit) {
          const updatedRole = data?.roles?.find(r => r.role_id === modalEdit?.role_id);
          setModalEdit(updatedRole || null);
        }
      })
      .catch((error) => {
        console.error("Ошибка при получении ролей:", error.message);
        setRole([]);
      });

    getFeaturesInfo()
      .then((data) => setRoleAll(data?.features))
      .catch((error) => {
        console.error("Ошибка при получении возможностей:", error.message);
        setRoleAll([]);
      });
  }, [modalLoading]);

  const handleCheckboxChange = (featureId) => {
    setSelectedFeatureIds(prev => {
      if (prev.includes(featureId)) {
        return prev.filter(id => id !== featureId);
      }
      return [...prev, featureId];
    });
  };

  const handleSubmit = async (featureId) => {
    try {
      await addFeatureToRole(modalEdit?.role_id, { feature_id: featureId });
      setmodalEditAddF(false);
      setModalLoading(prev => !prev); // триггерим перезапрос данных
    } catch (err) {
      console.error("Ошибка при добавлении возможности:", err);
      alert("Ошибка при добавлении возможности");
    }
  };
const RoleWithFeatures=()=>{
console.log(role?.group_id,roleName,selectedFeatureIds)
    createRoleWithFeatures(role?.group_id,
        {
            role_name:roleName,
            features_ids:selectedFeatureIds,

        }
    ).catch((err)=>console.log("error:",err))
     setModalLoading(prev => !prev);
     setRoleName([])
     setSelectedFeatureIds([])
}
  const handleSubmitremoveFeature = async (feature) => {
    try {
      await removeFeature(modalEdit?.role_id, feature?.feature_id);
      setModalLoading(prev => !prev);
    } catch (err) {
      console.error("Ошибка при удалении возможности:", err);
    }
  };

  return (
    <div>
      {!modalEditAddF && !modalEditAddR && modalEdit == null &&
        <div className={styles.div_roles_}>
         
                <button className={styles.btn_add} style={{width:"200px"}} onClick={() => {setmodalEditAddR(true)
                     setModalLoading(prev => !prev)
                }}>
            <svg width="20" height="20" viewBox="0 0 44 44" fill="none">
              <path d="M21.507 43L21.5 1M1 21.4999H43" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        Добавить роль
          </button>
          {isRole?.map((e) => (
            <div className={styles.div_roles} onClick={() => setModalEdit(e)} key={e?.role_id}>
              <p>{e?.role_name}</p>
            </div>
          ))}
        </div>
      }

      {!modalEditAddF && !modalEditAddR && modalEdit != null &&
        <div>
          <div className={styles.div_header_edit}>
            <p>Название роли:</p>
            <p>{modalEdit?.role_name}</p>
            <button style={{width:"80px",fontSize:"15px"}} onClick={() => setModalEdit(null)}>Назад</button>
          </div>

          <button className={styles.btn_add} onClick={() => setmodalEditAddF(true)}>
            <svg width="20" height="20" viewBox="0 0 44 44" fill="none">
              <path d="M21.507 43L21.5 1M1 21.4999H43" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Добавить возможность
          </button>

          <div className={styles.div_scroll}>
            {modalEdit?.features?.map((e) => (
              <div className={styles.div_roles} >
                <p>{e?.feature_name}</p>
                <p>{e?.feature_description}</p>
                <div onClick={() => handleSubmitremoveFeature(e)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25">
                    <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 C 6.023602 21.250335 6.8803207 22 7.875 22 H 16.123047 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 19.890625 5 L 21 5 V 3 H 15 L 14 2 Z M 6.125 5 H 17.875 L 16.123047 20 H 7.875 L 6.125 5 Z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.div_header_edit}>
            <button className={styles.btn_add} style={{ margin: '0px' }}>
              <svg width="20" height="20" viewBox="0 0 44 44" fill="none">
                <path d="M21.507 43L21.5 1M1 21.4999H43" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Добавить владельца роли
            </button>
            <p>Владельцы роли: </p>
          </div>

          <div className={styles.div_scroll}>
            {modalEdit?.users?.map((e) => (
              <div className={styles.div_user_role} key={e?.user_id}>
                <img style={{ width: "40px", marginLeft: 'auto' }} src={"/imgs/log/Group 25 (2).svg"} alt="" />
                <p>{e?.username}</p>
              </div>
            ))}
          </div>
        </div>
      }

      {modalEditAddF && !modalEditAddR  && 
        <div>
          <div className={styles.div_header_edit}>
            <p>Выберите возможность для добавления в роль: {modalEdit?.role_name}</p>
            <button style={{width:"80px",fontSize:"15px"}} onClick={() => setmodalEditAddF(false)}>Назад</button>
          </div>

          <div className={styles.div_scroll2}>
            {
              (() => {
                const existingIds = new Set(modalEdit?.features?.map(f => f?.feature_id));
                return isRoleAll
                  ?.filter(f => !existingIds.has(f?.id_featuresRole))
                  ?.map((e) => (
                    <div className={styles.div_roles} key={e?.id_featuresRole} onClick={() => handleSubmit(e?.id_featuresRole)}>
                      <p>{e?.name_featuresRole}</p>
                      <p>{e?.description_feature}</p>
                    </div>
                  ));
              })()
            }
          </div>
        </div>
      }
      { console.log(isRoleAll)}
     {modalEditAddR && <div>
          <div className={styles.div_header_edit}>
            <p>Добавление роли</p>
            <button style={{width:"80px",fontSize:"15px"}} onClick={() => setmodalEditAddR(false)}>Назад</button>
          </div>
          
          {/* Добавляем инпут для ввода названия роли */}
          <div className={styles.inputWrapper}>
            <input 
              type="text"
              placeholder="Введите название роли"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className={styles.input}
            />
          </div>

          {/* Чекбоксы для добавления возможностей */}
          <div className={styles.div_scroll2}>
            {isRoleAll?.map((e) => (
              <div className={styles.div_roles} key={e?.id_featuresRole}>
                <input 
                  type="checkbox" 
                  id={e?.id_featuresRole} 
                  checked={selectedFeatureIds.includes(e?.id_featuresRole)}
                  onChange={() => handleCheckboxChange(e?.id_featuresRole)} 
                />
                <label htmlFor={e?.id_featuresRole}>
                  <p>{e?.name_featuresRole}</p>
                  <p>{e?.description_feature}</p>
                </label>
              </div>
            ))}
          </div>

          {/* Кнопка для создания роли с выбранными возможностями */}
          <button 
            className={styles.btn_add} 
            style={{width:"100px",fontSize:"15px"}} 
            onClick={RoleWithFeatures}
          >
            Создать
          </button>
        </div>}
    </div>
  );
};
