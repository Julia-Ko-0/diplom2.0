// src/components/Auth/ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProtectedRoute() {
  const [auth, setAuth] = useState(null); 
  const handleRegister = async () => {
    try {

      const response = await fetch('http://localhost:8080/check-auth', {
        method: 'POST',
           credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({})
      });

      const result = await response.json();
      if (response.ok) {
        setAuth(true)
        console.log('Авторизация успешна', result);
      } else {
        setAuth(false)
        console.log('Ошибка при авторизации', result);
      }
    } catch (error) {
         setAuth(false)
      console.error("Ошибка при авторизации:", error);
    }
  };
  useEffect(() => {
    handleRegister()
  }, []);

  if (auth === null) return <div>Загрузка...</div>; // Пока идет проверка
  return auth ? <Outlet /> : <Navigate to="/login" />;
}
export  function ProtectedRouteLogin() {
  const [auth, setAuth] = useState(null); 
  const handleRegister = async () => {
    try {
  
      const response = await fetch('http://localhost:8080/check-auth', {
        method: 'POST',
           credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({})
      });

      const result = await response.json();
      if (response.ok) {
        setAuth(true)
        console.log('Авторизация успешна', result);
      } else {
        setAuth(false)
        console.log('Ошибка при авторизации', result);
      }
    } catch (error) {
         setAuth(false)
      console.error("Ошибка при авторизации:", error);
    }
  };
  useEffect(() => {
    handleRegister()
  }, []);

  if (auth === null) return <div>Загрузка...</div>; // Пока идет проверка
  return !auth ? <Outlet /> : <Navigate to="/us/home/posts" />;
}