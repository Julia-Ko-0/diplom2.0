import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
export function usePost(){
        
  const [test, settest] = useState([])
  const [error, setError] = useState('')

  async function fetchTest() {
    try{
        setError('')
        const response = await axios.get('https://kitsu.io/api/edge/manga?page[limit]=2&page[offset]=0')
        settest(response.data.data)
    }catch(e){
        const error = e 
        setError(error.message)
    }
  
  }
  useEffect(()=>{
    fetchTest()
  },[])
   console.log(test)
   return{test, error}
}
export function formatDate(dateString) {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы с 0
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}.${month}.${year}`;
}
export function getImageSrc(base64String) {
  if (!base64String) {
    return 'https://i.pinimg.com/564x/00/47/f9/0047f95b65904798dde37033fdcfdd1e.jpg'; // путь к дефолтной картинке, если нет изображения
  }
  return `data:image/png;base64,${base64String}`;
}