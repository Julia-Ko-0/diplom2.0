import { useEffect, useState } from "react";
import styles from "./akk.module.css";
import SHA256 from "crypto-js/sha256";
import {
  updateUserPassword,
  updateUserInfo,
  updateUserEmail,
  updateBirthdate,
  updateUserLogin,
  getUserInfo,
} from "../../../../hooks/api";

export const Akk = () => {
  const [allDate, setAlldate] = useState();
  const [lastname, setLastname] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [patronymic, setPatronymic] = useState(null);
  const [birthdate, setBirthdate] = useState(null);
  const [email, setEmail] = useState(null);
  const [login, setLogin] = useState(null);
  const [message, setMessage] = useState(null);
  //
  const getUsInf = async () => {
    try {
      const data = await getUserInfo();
      console.log();
      setLogin(data.user_info.username);
      setLastname(data.user_info.lastname);
      setFirstname(data.user_info.firstname);
      setPatronymic(data.user_info.patronymic);
      setBirthdate(data.user_info.date_birth);
      setEmail(data.user_info.email);
      setAlldate(data.user_info);
    } catch (error) {
      setMessage("Ошибка ");
      console.error(error);
    }
  };
  useEffect(() => {
    getUsInf();
  }, []);
  const handleSaveUsInf = async () => {
    try {
      const name =
        allDate.lastname == lastname && allDate.lastname == ""
          ? null
          : lastname;
      const firstname_ =
        allDate.firstname == firstname && allDate.firstname == ""
          ? null
          : firstname;
      const patronymic_ =
        allDate.patronymic == patronymic && allDate.patronymic == ""
          ? null
          : patronymic;
      console.log(name, firstname_, patronymic_);
      await updateUserInfo({
        Lastname: name,
        Firstname: firstname_,
        Patronymic: patronymic_,
      });
      setMessage("Данные успешно обновлены");
    } catch (error) {
      setMessage(
        "Ошибка при обновлении данных, кажеться вы уже меняли имя, фамилию или отчество 3 раза "
      );
      console.error(error);
    }
  };
  const handleSaveEmail = async () => {
    try {
      // Хешируем пароль, если он был изменен

      await updateUserEmail(email);

      // setMessage("Данные успешно обновлены");
    } catch (error) {
      setMessage("Ошибка при обновлении данных");
      console.error(error);
    }
  };
  const handleSaveBirtDate = async () => {
    try {
      // Хешируем пароль, если он был изменен
      console.log(birthdate);
      await updateBirthdate(birthdate);

      // setMessage("Данные успешно обновлены");
    } catch (error) {
      setMessage("Ошибка при обновлении данных");
      console.error(error);
    }
  };
  const handleSaveLogin = async () => {
    try {
      await updateUserLogin(login);
      // setMessage("Данные успешно обновлены");
    } catch (error) {
      setMessage("Ошибка при обновлении данных");
      console.error(error);
    }
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Настройки аккаунта</h2>
      <h3 className={styles.title} style={{ fontSize: "12px" }}>
        Обратите внимание имя фамилию отчество можно менять не бльше 3х раз
      </h3>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Никнейм"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder=" Фамилия"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Имя"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Отчество"
          value={patronymic}
          onChange={(e) => setPatronymic(e.target.value)}
          className={styles.input}
        />
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />

        <button
          onClick={() => {
            handleSaveBirtDate();
            handleSaveEmail();
            handleSaveLogin();
            handleSaveUsInf();
          }}
          className={styles.saveButton}
        >
          Сохранить
        </button>

        {message && <div className={styles.message}>{message}</div>}
      </div>
    </div>
  );
};
