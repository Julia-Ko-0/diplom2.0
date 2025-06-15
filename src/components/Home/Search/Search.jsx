import styles from "./Search.module.css"
import { PostM } from "../../../models/models";
import { post } from "../../../data/elem";
import { data, Outlet, useNavigate, useOutletContext } from "react-router";
import { useEffect, useRef, useState } from "react";
import {
  getFilteredPosts,
  getGroupSubscribers,
  getRecommendedPosts,
  getUserInfo,
  getUserPosts,
  getUsersPosts,
  searchAll,
  searchGroups,
  searchPosts,
  searchUsers,
} from "../../../hooks/api";
import { formatDate, getImageSrc } from "../../../hooks/homeH";
import { useParams } from 'react-router-dom';
import { CrElPosts, Group, User } from "./SearchFun";


// interface PostsProps{
//     post: PostM
// }
  // const handleSubmit = async () => {

  //   try {
  //     await 
  //     alert("Пост успешно создан!");
  //   } catch (err) {
  //     console.error("Ошибка при создании поста:", err);
  //     // alert("Ошибка при создании поста");
  //   }
  // };

const Search = () => {
  async function sendMessage(
    senderId,
    receiverId,
    messageText,
    messageFileBase64 = ""
  ) {
    try {
      const response = await fetch("http://localhost:8080/update-info-user", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserID: 17,
          Patronymic: "J",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Ошибка:", errorData);
        return;
      }

      const result = await response.json();
      console.log("Успех:", result);
    } catch (err) {
      console.error("Сетевая ошибка:", err);
    }
  }
  const {id_post} = useParams()
  async function auth() {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ВАЖНО: позволяет браузеру сохранять/отправлять куки
        body: JSON.stringify({
          login: "user1",
          password: "emma_secure",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Ошибка:", errorData);
        return;
      }

      const result = await response.json();
      console.log("Успех:", result);
    } catch (err) {
      console.error("Сетевая ошибка:", err);
    }
  }

  async function info() {
    try {
      const response = await fetch("http://localhost:8080/user_info", {
        method: "POST",
        credentials: "include",
        // обязательно
      });

      const result = await response.json();
      if (!response.ok) {
        console.error("Ошибка:", result);
        return;
      }

      console.log("Успех:", result);
    } catch (err) {
      console.error("Сетевая ошибка:", err);
    }
  }


  const [activeTab, setActiveTab] = useState("1");

  const [posts2, setPost2] = useState([]);
      const [search_params, setSearxh] = useState();
      const navigate = useNavigate();
      const inputRef = useRef(null);
useEffect(() => {
    const fetchData = async () => {
      let responseData;
      try {
        switch (activeTab) {
          case '1':
            responseData = await searchAll({ search: search_params });
            break;
          case '2':
            responseData = await searchUsers({ search: search_params });
            break;
          case '3':
            console.log(search_params)
            responseData = await searchPosts({ search: search_params });
            break;
          case '4':
              console.log(search_params)
            responseData = await searchGroups({ search: search_params });
            break;
          default:
            responseData = [];
        }
        setPost2(responseData);
      } catch (error) {
        console.error("Ошибка поиска:", error.message);
        setPost2([]);
      }
    };

    fetchData();
}, [search_params, activeTab]);

  // useEffect(() => {
  //   getUserPosts()
  //     .then((data) => {
  //       console.log("Посты пользователя:", data);
  //       setPost2(data.posts);
  //     })
  //     .catch((error) => {
  //       console.error("Ошибка при получении постов:", error.message);
  //     });
  // }, []);


      useEffect(() => {
  inputRef.current?.focus();
}, []);
  return (
    // <div>sdgikljskgjh</div>
    <div className={styles.posts}>
       <div className={styles.add_posts}>
        <input
 ref={inputRef}
        value={search_params}
      //   onBlur={()=>{
          
      //  navigate('/us/home/posts');
      //   }}
      onChange={(e)=>{
        setSearxh(e.target.value)
      }}
         onFocus={()=>{
          
       navigate('/us/home/search');
        }}></input>
      </div>
         <div className={styles.forder_div} id="scrollable">
        <button
          className={activeTab === "1" ? styles.active : styles.tab}
          onClick={() => {
            setActiveTab("1");
              inputRef.current?.focus();
          }}
        >
          Все
        </button>{" "}
        <button
          className={activeTab === "2" ? styles.active : styles.tab}
          onClick={() => {
            setActiveTab("2");
              inputRef.current?.focus();
          }}
        >
          Пользователи
        </button>
          <button
          className={activeTab === "3" ? styles.active : styles.tab}
          onClick={() => {
            setActiveTab("3");
              inputRef.current?.focus();
          }}
        >
          Посты
        </button>
          <button
          className={activeTab === "4" ? styles.active : styles.tab}
          onClick={() => {
            setActiveTab("4");
              inputRef.current?.focus();
          }}
        >
          Группы
        </button>
      </div>
<div>
  { posts2 && posts2.length > 0 ? (
   activeTab == '1'?  posts2.map((e) => {
      const app = e;

      if (!app || !app.type) {
        console.warn("Invalid search result item", e);
        return null;
      }

      if (app.type === 'group') {
return(  <div className={styles.elem_post}>    <Group app={app}/> </div>)
      }

      if (app.type === 'post_user') {
        return <CrElPosts post={app} />;
      }

      if (app.type === 'post_group') {
        return <CrElPosts  post={app} />;
      }

      if (app.type === 'user') {
        return (
              <div className={styles.elem_post}>    <User app={app}/></div>
     
        );
      }

      return null;
    }):
    activeTab == '2'?

     posts2.map((e) => {
      const app = e;

      return (
              <div className={styles.elem_post}>    <User app={app}/></div>
     
        );
    }):activeTab == '3'?
     posts2.map((e) => {
      const app = e;
console.log(e)
     return <CrElPosts post={app} />;
   
    }):activeTab == '4'?
     posts2.map((e) => {
      const app = e;
// console.log(e)
    

        return (
          <div>
            <p>{app.group_name}</p>
            {/* <p>{app.username}</p> */}
          </div>
        );
   
    }):<p></p>
  ) : (
    <p>Введите или измените запрос</p>  
  )}
</div>


   

    </div>
  );
};
export default Search;
