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
    }catch(e:unknown){
        const error = e as AxiosError
        setError(error.message)
    }
  
  }
  useEffect(()=>{
    fetchTest()
  },[])
   console.log(test)
   return{test, error}
}