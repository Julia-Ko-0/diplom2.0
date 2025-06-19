import { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import { getTags, UpdateGroupInfo, updateTagsInGroup } from "../../../hooks/api";

export const ModalEditAll = ({ role, groupInfo, feauteres_us, setLoading_ }) => {
  const [nameGroup, setnameGroup] = useState(groupInfo.name);
  const [descriptionGroup, setdescriptionGroup] = useState(groupInfo.description);
  const [selectedTags, setSelectedTags] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);
  const [isTags, setTags] = useState([]);
  const [newPhoto, setNewPhoto] = useState(null); // Состояние для новой фотографии
  const [preview, setPreview] = useState(  groupInfo?.photo );
  const [base64Image, setBase64Image] = useState('');

  useEffect(() => {
    if (groupInfo?.tags) {
      setSelectedTags(groupInfo?.tags?.map(tag => tag.id_tag));
    }

    getTags()
      .then((data) => setTags(data))
      .catch((error) => {
        console.error("Ошибка при получении тегов:", error.message);
        setTags([]);
      });
  }, [groupInfo]);

  const handleSubmitRemoveTag = async () => {
    try {
      await updateTagsInGroup({
        group_id: groupInfo.id_group,
        tags: selectedTags,
      });
      setModalEdit(false);
      setLoading_((p) => !p);
    } catch (err) {
      console.error("Ошибка при обновлении тегов:", err);
    }
  };
const handleSubmitSave = async () => {
  try {

console.log({
          group_id: groupInfo.id_group,
          new_name: nameGroup,
          new_photo: base64Image, // отправляем изображение как Base64
          new_description: descriptionGroup,
        })
        await UpdateGroupInfo({
          group_id: groupInfo.id_group,
          new_name: nameGroup,
          new_photo: base64Image, // отправляем изображение как Base64
          new_description: descriptionGroup,
        });

        setModalEdit(false);
        setLoading_((p) => !p);
      

    
  } catch (err) {
    console.error("Ошибка при обновлении группы:", err);
  }
};
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setPreview(localUrl);

      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result); // сохраняем как data:image/...;base64,...
      };
      reader.readAsDataURL(file); // читаем как base64
    }
  };

const fallbackImg = "/imgs/log/Group 25 (2).svg";
  const toggleTagSelection = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  return (
    <div>
      {!modalEdit && (
        <div>
          <div className={styles.div_header_edit}>
            <p>Редактирование группы</p>
            <button className={styles.btn_add} style={{ padding: "10px" }} onClick={handleSubmitSave}>
              Сохранить
            </button>
          </div>
 {/* <img src={groupInfo?.group_photo_base64 }></img> */}
          {/* Если картинка есть, показываем её, если нет — заглушка */}
          <div className={styles.imageWrapper}>
           
            <label htmlFor="avatar-upload" className={styles.avatar_label}>
              <img
                className={styles.img_avatar}
                src={preview || fallbackImg} // Отображаем выбранную картинку
                alt="Group Avatar"
                style={preview ? { objectFit: "cover", borderRadius: "50%"  } : {}}
              />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          <div className={styles.div_}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Название группы"
                value={nameGroup}
                onChange={(e) => setnameGroup(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Описание группы"
                value={descriptionGroup}
                onChange={(e) => setdescriptionGroup(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.div_header_edit}>
              <p>Теги</p>
              <button
                className={styles.btn_add}
                style={{ padding: "10px" }}
                onClick={() => setModalEdit(true)}
              >
                Редактировать теги
              </button>
            </div>

            <div className={styles.div_scroll}>
              {groupInfo?.tags?.map((e) => (
                <div className={styles.div_roles} key={e.id_tag}>
                  <p>{e.name_tag}</p>
                  <p>{e.description_tag}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {modalEdit && (
        <div>
          <div className={styles.div_header_edit}>
            <p>Теги</p>
            <button
              style={{ width: "100px", fontSize: "15px", marginLeft: "0px" }}
              onClick={handleSubmitRemoveTag}
            >
              Сохранить
            </button>
            <button
              style={{ width: "80px", fontSize: "15px" }}
              onClick={() => setModalEdit(false)}
            >
              Назад
            </button>
          </div>

          <div className={styles.div_scroll2}>
            {isTags.map((tag) => (
              <div className={styles.div_chec} key={tag.id_tag} style={{ marginBottom: "10px" }}>
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag.id_tag)}
                  onChange={() => toggleTagSelection(tag.id_tag)}
                />
                <label style={{ marginLeft: "8px" }}>
                  <p style={{ margin: 0 }}>{tag.name_tag}</p>
                  <p style={{ margin: 0, fontSize: "13px", color: "gray" }}>{tag.description_tag}</p>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
