import { useState } from 'react';
import styles from './Group_info.module.css';
import { ModalEditAll } from './Modal/ModalEditAll';
import { ModalEditRoleAdmin } from './Modal/ModalEditRoleAdmin';
import { ModalEditRole } from './Modal/ModalEditRole';

export const ModalEdit = ({ setModal, id_gr,role}) => {
  const [formData, setFormData] = useState({
    header: '',
    text_post: '',
    fale_post: '', // base64 image
  });
  const [activeTab, setActiveTab] = useState('all');
  const [imagePreview, setImagePreview] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        setImagePreview(base64);
        setFormData((prev) => ({ ...prev, fale_post: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        setImagePreview(base64);
        setFormData((prev) => ({ ...prev, fale_post: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      console.log('Пост успешно создан!');
      setFormData({ header: '', text_post: '', fale_post: '' });
      setImagePreview(null);
    } catch (err) {
      console.error('Ошибка при создании поста:', err);
      alert('Ошибка при создании поста');
    }
  };

  // Функция для отрисовки содержимого вкладки
  const renderContent = () => {
    switch (activeTab) {
      case 'all':
      return( <ModalEditAll role={role}/>)

      case 'role':
        return( <ModalEditRoleAdmin role={role}/>)

      case 'editRole':
       return( <ModalEditRole role={role}/>)
      default:
        return <p>Выберите вкладку</p>;
    }
  };

  return (
    <div className={styles.modal_overlay}>
      <div
        className={styles.div_add_post}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className={styles.div_header_modalEdit}>
          <p>Редактирование</p>
          <button onClick={() => setModal(false)}>
            <svg
              width="43"
              height="37"
              viewBox="0 0 43 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1C4.62339 4.53502 14.3547 12.8719 24.0099 21M24.0099 21C30.7425 26.6678 37.4381 32.2341 42 36L24.0099 21ZM42 1L1 36"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.forder_div} id="scrollable">
          <button
            className={activeTab === 'all' ? styles.active : styles.tab}
            onClick={() => setActiveTab('all')}
          >
            Главное
          </button>


          <button
            className={activeTab === 'editRole' ? styles.active : styles.tab}
            onClick={() => setActiveTab('editRole')}
          >
            Настройки ролей
          </button>
        </div>

        {/* Здесь рендерим содержимое активной вкладки */}
        <div className={styles.tab_content}>{renderContent()}</div>
      </div>
    </div>
  );
};
