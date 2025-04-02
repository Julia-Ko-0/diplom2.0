import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import styles from './novbar.module.css'
let img_p = 'https://i.pinimg.com/564x/36/e8/98/36e898e3c962164b04091ff4e752db6f.jpg'


export const NovBar = ()=>{
  const { theme, setTheme } = useContext(ThemeContext);

const toggleTheme = () => {
  setTheme(theme === "light" ? "dark" : "light");
};


    return( <div className={styles.div_novbar}>
                  <div style={{display:"flex"}}>
      <h1>Текущая тема: {theme}</h1>
      <button onClick={()=>setTheme("light" )}>Сменить тему light</button>
      <button onClick={()=>setTheme("dark" )}>dark</button>
      <button onClick={()=>setTheme("color")}>color</button>
    </div>
      <img src={img_p}></img>

    </div>)
   
}