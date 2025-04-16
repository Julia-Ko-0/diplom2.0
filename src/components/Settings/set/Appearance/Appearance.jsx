import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";

export const Appearance = ()=>{


    // const location = useLocation();
    // const isChatsActive = location.pathname === '/us/settings' || location.pathname === '/us/settings';
    const { theme, setTheme } = useContext(ThemeContext);
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
      };
    return(
       <div >
        <h1>Appearance</h1>
                  <div style={{display:"flex"}}>
      <h1>Текущая тема: {theme}</h1>
      <button onClick={()=>setTheme("light" )}>Сменить тему light</button>
      <button onClick={()=>setTheme("dark" )}>dark</button>
      <button onClick={()=>setTheme("color")}>color</button>
    </div>
    </div>)
   
}