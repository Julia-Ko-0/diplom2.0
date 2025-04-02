import { createBrowserRouter } from "react-router-dom"
import App from "../App";
// import { Homes } from "../components/Home/Home";
import { NovBar } from "../components/NovBar/novbar";
import Menu from "../layout/Menu/Menu";
import Homes from "../components/Home/Home";
import Group from "../components/Group/Group";
import Login from "../components/Login/Login";
import Registr from "../components/Registr/Registr";
import Chats from "../components/Chats/Chats";
// <<<<<<< HEAD
import Rab from "../components/rab/rab";
import { Chat } from "../components/ChatSMS/Chat";
// =======
// import MyAkk from "../components/Myakk/MyAkk";
// >>>>>>> 38653995a712cdd64f66b79495f9ae0a8960ea49

 export  const router = createBrowserRouter([
    {
        path:'/us',
        element:<App/>,
        children:[
            {
                path:'/us',
                element: <Menu/>,
                children:[
                    {
                        path:'home',
                        element: <Homes/>
                    },
                    {
                        path:'chats',
                        element: <Chats/>,
            
                    },
                    {
                        path:'group',
                        element: <Group/>
                    },
                    {
                        path:'myakk',
// <<<<<<< HEAD
//                         element: <Homes/>
//                     },
//                     {
//                         path:'chatsms',
//                         element:<Chat/>
// =======
//                         element: <MyAkk/>
// >>>>>>> 38653995a712cdd64f66b79495f9ae0a8960ea49
                    }
                ]
            }
        ]
    },
    {
        
        path:'/login',
        element:<Login/>
    }
    ,
    {
        
        path:'/',
        element:<Registr/>
    },
    {
        
        path:'/rab',
        element:<Rab/>
    }
 ])