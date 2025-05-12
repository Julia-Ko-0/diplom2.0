import bcrypt from 'bcryptjs';

// Функция для хеширования пароля
export const hashPassword = async (password) => {
  const saltRounds = 10; // Количество раундов для соли
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword; // Возвращаем хешированный пароль
  } catch (err) {
    console.error("Ошибка при хешировании пароля", err);
    throw new Error("Ошибка при хешировании пароля");
  }
};

// Функция для проверки пароля
export const checkPassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch; // Возвращаем true, если пароли совпадают
  } catch (err) {
    console.error("Ошибка при проверке пароля", err);
    return false;
  }
};