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

import { Chat } from "../components/ChatSMS/Chat";
import { Settings } from "../components/Settings/Setting";
import { Fav } from "../components/Settings/set/Fav/Fav";
import { Akk } from "../components/Settings/set/Akk/Akk";
import { Blacklist } from "../components/Settings/set/Blacklist/Blacklist";
import { Appearance } from "../components/Settings/set/Appearance/Appearance";
import ProtectedRoute from "../ProtectedRoute";
import Post from "../components/Post/Post";

//  export  const router = createBrowserRouter([
//     {
// element: <ProtectedRoute/>,
// children:[
//   {
//         path:'/us',
//         element:<App/>,
//         children:[
//             {
//                 path:'/us',
//                 element: <Menu/>,
//                 children:[
//                     {
//                         path:'home',
//                         element: <Homes/>
//                     },
//                     {
//                         path:'chats',
//                         element: <Chats/>,
                     
            
//                     },
//                     {
//                         path:'group',
//                         element: <Group/>
//                     },
//                     {
//                         path:'myakk',
//                         // element:</>
//                     },
//                     {
//                         path:'chatsms',
//                         element:<Chat/>
//                     },
                
//                 ]
//             },
//             {
//                 path:'settings',
//                 element: <Settings/>,
//                 children:[
//                     {
//                         path:'fav',
//                         element: <Fav/>
//                     },
//                     {
//                         path:'blacklist',
//                         element: <Blacklist/>
//                     },
//                     {
//                         path:'appearance',
//                         element: <Appearance/>
//                     },
//                     {
//                         path:'akk',
//                         element: <Akk/>
//                     },
                   
//                 ]
//             },

         
//         ]
//     },
// ]
//     } ,
  
//     {
        
//         path:'/login',
//         element:<Login/>
//     },
//     {
        
//         path:'/',
//         element:<Registr/>
//     },
  
//  ])

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/us',
        element: <App />,
        children: [
          {
            path: '/us',
            element: <Menu />,
            children: [
              {
                path: 'home',
                element: <Homes />,
                children:[
                    {
            path:'post/:id_post',
               element: <Post />,
           }
                ]
              },
              {
                path: 'chats',
                element: <Chats />,
              },
              {
                path: 'group',
                element: <Group />,
              },
              {
                path: 'myakk',
                // element:</>
              },
              {
                path: 'chatsms',
                element: <Chat />,
              },
         
            ],
          },
          {
            path: 'settings',
            element: <Settings />,
            children: [
              {
                path: 'fav',
                element: <Fav />,
              },
              {
                path: 'blacklist',
                element: <Blacklist />,
              },
              {
                path: 'appearance',
                element: <Appearance />,
              },
              {
                path: 'akk',
                element: <Akk />,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Registr />,
  },
]);