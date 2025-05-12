// src/components/Auth/ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProtectedRoute() {
  const [auth, setAuth] = useState(null); // null = проверка, true = ок, false = редирект

  useEffect(() => {
    axios.post('http://localhost:8080/check-auth', {}, { withCredentials: true }) // withCredentials для работы с куки
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <div>Загрузка...</div>; // Пока идет проверка
  return auth ? <Outlet /> : <Navigate to="/login" />;
}