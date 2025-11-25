import {
  createBrowserRouter,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import ProtectedRoute, { ProtectedRouteLogin } from "../ProtectedRoute";
import Post from "../components/Post/Post";
import Post_home from "../components/Home/Post_home/Post_home";
import Search from "../components/Home/Search/Search";
import { Friends } from "../components/Friends/Friends";
import { User } from "../components/User/User";
import { Group_info } from "../components/Group_info/Group_info";
import { FriendRe } from "../components/FriendRe/FriendRe";
import { Chat_new } from "../components/ChatSMS_new/Chat_new";
import { Security } from "../components/Settings/set/Security/Security";

export default function ProtectedStateRoute({
  children,
  redirect = "/us/home/posts",
}) {
  const location = useLocation();

  // Если state отсутствует — редиректим
  if (!location.state) {
    return <Navigate to={redirect} replace />;
  }

  return children;
}
export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/us",
        element: <App />,
        children: [
          {
            path: "/us",
            element: <Menu />,
            children: [
              {
                path: "home",
                element: <Homes />,
                children: [
                  {
                    path: "posts",
                    element: <Post_home />,
                  },
                  {
                    path: "post/:id_post",
                    element: <Post />,
                  },
                  {
                    path: "search",
                    element: <Search />,
                  },
                ],
              },
              {
                path: "chats",
                element: <Chats />,
              },
              {
                path: "group",
                element: <Group />,
              },
              {
                path: "myakk",
                // element:</>
              },
              {
                path: "chatsms",
                element: (
                  <ProtectedStateRoute>
                    {" "}
                    <Chat />
                  </ProtectedStateRoute>
                ),
              },
              {
                path: "chatsms_new",
                element: <Chat_new />,
              },
              {
                path: "user",
                element: (
                  <ProtectedStateRoute>
                    <User />
                  </ProtectedStateRoute>
                ),
              },
              {
                path: "friends",
                element: <Friends />,
              },
              {
                path: "friends_request",
                element: <FriendRe />,
              },
              {
                path: "group_info",
                element: <Group_info />,
              },
            ],
          },
          {
            path: "settings",
            element: <Settings />,
            children: [
              {
                path: "fav",
                element: <Fav />,
              },
              {
                path: "blacklist",
                element: <Blacklist />,
              },
              {
                path: "appearance",
                element: <Appearance />,
              },
              {
                path: "akk",
                element: <Akk />,
              },
              {
                path: "security",
                element: <Security />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRouteLogin />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <Registr />,
      },
    ],
  },
]);
