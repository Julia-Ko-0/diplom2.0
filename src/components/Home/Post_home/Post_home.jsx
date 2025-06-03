import styles from "./Post_home.module.css"
import { PostM } from "../../../models/models";
import { post } from "../../../data/elem";
import { Outlet, useNavigate, useOutletContext } from "react-router";
import { useEffect, useState } from "react";
import {
  getFilteredPosts,
  getGroupSubscribers,
  getRecommendedPosts,
  getUserInfo,
  getUserPosts,
  getUsersPosts,
  searchAll,
} from "../../../hooks/api";
import { formatDate, getImageSrc } from "../../../hooks/homeH";
import { useParams } from 'react-router-dom';

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
function CrElPosts({ post }) {
    const navigate = useNavigate();
  console.log(post);
  return (
    <div className={styles.elem_post}>
      <div className={styles.elem_post_header}>
        {/* <img className={styles.elem_post_header_ava} src={post.author.profile_picture == '' || post.author.profile_picture == ''? "../imgs/log/Group 25 (2).svg" :post.author.profile_picture}></img> */}
      
      <img
          className={styles.elem_post_header_ava}
          src=        "../imgs/log/Group 25 (2).svg"

        ></img>
        <div className={styles.elem_post_h_name}>
       {post.post_type =='user' &&   
         <div className={styles.elem_post_header_text}> 
            
            <span className={styles.h_name}>{post.author.username}</span>
            {/* <span className={styles.h_name}>{post.text}</span> */}
            </div>}
                {post.post_type =='group' &&     <div className={styles.elem_post_header_text}> 
                <span className={styles.h_name}>{post.group_info.name}</span>
            <span className={styles.h_name}>{post.author.username}</span>
        
            </div>}
          <div className={styles.elem_post_h_name_datetime}>
            <p>{formatDate(post.dateTime_post)}</p>
            {/* <p>21/08/2024</p> */}
          </div>
        </div>
        {/* <img
          className={styles.elem_post_header_btn}
          src="../imgs/Home/Group 8.svg"
        ></img> */}
        <svg width="8" height="28" viewBox="0 0 8 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="-1" width="6" height="6" rx="3" transform="matrix(1 0 0 -1 0 6)" fill="#A8B6E6" stroke="black" stroke-width="2"/>
<path d="M1 24C1 25.6569 2.34315 27 4 27C5.65685 27 7 25.6569 7 24C7 22.3431 5.65685 21 4 21C2.34315 21 1 22.3431 1 24Z" fill="#A8B6E6" stroke="black" stroke-width="2"/>
<rect x="1" y="-1" width="6" height="6" rx="3" transform="matrix(1 0 0 -1 0 16)" fill="#A8B6E6" stroke="black" stroke-width="2"/>
</svg>

      </div>
      <div className={styles.elem_post_body}>
        {/* <p>{post.}</p> */}
          <div  className={styles.elem_post_header_text}>
                <span className={styles.h_name}>{post.header}</span>
            <span className={styles.h_name}>{post.text}</span>
          </div>
        {/* <img  className={styles.elem_post_body_img} src=""></img> */}{
          post.fale_post != 'data:image/png;base64,' ? <img className={styles.elem_post_body_img}  alt="" src={post.fale_post}></img> :''        }
   
      </div>
      <div className={styles.elem_post_btn}>
        <div className={styles.elem_post_btn_el} onClick={()=>{
            
        }}>
   <svg
          width="46"
          height="38"
          viewBox="0 0 46 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1.06153 15.1591C0.838299 13.1958 1.12459 9.20148 3.5786 5.91548C4.10447 5.21133 4.72988 4.5397 5.47115 3.92755C8.03732 1.80839 10.455 1.13002 12.3811 1.01774C13.3314 0.962346 14.1361 1.04606 14.742 1.13945C14.9851 1.17692 15.2045 1.21747 15.3705 1.24816L15.4714 1.26674C15.6218 1.29417 15.6758 1.30172 15.6758 1.30172C16.3593 1.31099 17.3323 1.59435 18.2464 1.99697C19.224 2.42751 20.3557 3.09074 21.2925 4.01908C21.9695 4.69001 22.6481 5.61708 23.2295 6.51576C23.5643 5.99834 23.9383 5.55938 24.3367 5.18828C24.6406 4.77665 24.9546 4.39269 25.2685 4.06797C26.1775 3.12729 27.2777 2.45351 28.2305 2.01532C29.1126 1.60962 30.064 1.31705 30.7467 1.30486L30.7647 1.30174C30.7902 1.29753 30.8433 1.28878 30.9356 1.2712L31.0324 1.25258C31.193 1.2216 31.407 1.18028 31.6439 1.14215C32.2346 1.04707 33.021 0.961549 33.9503 1.01811C35.8374 1.13298 38.1925 1.82728 40.6818 3.97377C44.7481 7.48013 45.2008 12.8981 44.9406 15.278C44.899 17.117 43.733 20.7945 39.937 24.0677C36.4158 27.104 28.5297 32.2308 24.6115 34.6817L24.614 34.6844L23.3426 36L21.3897 33.9792C17.162 31.4258 9.68244 26.7312 6.24125 23.8894C2.32806 20.6579 1.10664 17.0115 1.06153 15.1591Z" />
        </svg>
        <p>{post.likes_count}</p>
        </div>
             <div className={styles.elem_post_btn_el} onClick={()=>{
              
       navigate(`/us/home/post/${post.post_id}`,{state:{post}});
             }}>
           <svg style={{marginTop:'5px'}}
          width="44"
          height="40"
          viewBox="0 0 44 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M40.9 1H38.8H15.7H5.2H3.1C1.42 1 1 2.45833 1 3.1875V25.0625C1 26.8125 2.4 27.25 3.1 27.25H9.4V36L15.7 27.25H40.9C42.58 27.25 43 25.7917 43 25.0625V3.1875C43 1.4375 41.6 1 40.9 1Z" />
          <path d="M5.2 1H15.7M15.7 1H38.8H40.9C41.6 1 43 1.4375 43 3.1875C43 4.9375 43 18.5 43 25.0625C43 25.7917 42.58 27.25 40.9 27.25C39.22 27.25 23.4 27.25 15.7 27.25L9.4 36V27.25H3.1C2.4 27.25 1 26.8125 1 25.0625C1 23.3125 1 9.75 1 3.1875C1 2.45833 1.42 1 3.1 1C4.78 1 12.2 1 15.7 1Z" />
        </svg>
            <p>{post.comments_count}</p>
        </div>
             <div className={styles.elem_post_btn_el}>
             <svg
          width="38"
          height="40"
          viewBox="0 0 38 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21.3565 37.7214L20.5189 26.2125C22.7054 28.6515 24.6747 29.8029 26.9135 30.4226C28.8713 30.9645 31.0351 31.0999 33.7305 31.3341L21.3565 37.7214Z" />
          <path d="M15.8321 2.48197L17.6875 13.922C15.2929 11.619 13.2289 10.5884 10.9435 10.1049C8.9451 9.68214 6.77741 9.67774 4.07142 9.60673L15.8321 2.48197Z" />
          <path d="M26.9135 30.4226C28.8713 30.9645 31.0351 31.0999 33.7305 31.3341L21.3565 37.7214L20.5189 26.2125C22.7054 28.6515 24.6747 29.8029 26.9135 30.4226ZM26.9135 30.4226C28.6659 28.7705 32.7715 24.3834 35.1751 20.052C37.5787 15.7207 36.9791 11.9795 36.3789 10.6503C34.498 7.28961 29.2707 1.18421 23.4082 3.64839M10.9435 10.1049C8.9451 9.68213 6.77742 9.67774 4.07142 9.60673L15.8321 2.48197L17.6875 13.922C15.2929 11.619 13.2289 10.5884 10.9435 10.1049ZM10.9435 10.1049C9.34434 11.8603 5.64338 16.4884 3.63309 20.9581C1.62281 25.4279 2.55196 29.1269 3.26782 30.4177C5.43971 33.6594 11.1889 39.4393 16.8107 36.6248" />
        </svg>
           <p>{post.repost}</p>
        </div>
     
       
     
      </div>
    </div>
  );
}
const Post_home = () => {
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
  const navigate = useNavigate();

  const [search_params, setSearxh] = useState();


  const [activeTab, setActiveTab] = useState("1");
  const [posts, setPost] = useState([]);
  const [posts2, setPost2] = useState([]);
  useEffect(() => {
    activeTab == "2"
      ? getRecommendedPosts(10, 0)
          .then((data) => {
            console.log("Посты пользователя:", data);
            setPost(data);
          })
          .catch((error) => {
            console.error("Ошибка при получении постов:", error.message);
                setPost([])
          })
      : getFilteredPosts()
          .then((data) => {
            console.log("Посты пользователя:", data);
            setPost(data);
          })
          .catch((error) => {
            console.error("Ошибка при получении постов:", error.message);
            setPost([])
          });
  }, [activeTab]);
  useEffect(() => {
    getUserPosts()
      .then((data) => {
        console.log("Посты пользователя:", data);
        setPost2(data.posts);
      })
      .catch((error) => {
        console.error("Ошибка при получении постов:", error.message);
      });
  }, []);

  return (
    // <div>sdgikljskgjh</div>
    <div className={styles.posts}>
            <div className={styles.add_posts}>
        <input
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
       {
                    id_post ==null  && 
      <div>
       
      {/* <div className={styles.forder_div} id="scrollable">
        <button
          className={activeTab === "1" ? styles.active : styles.tab}
          onClick={() => {
            setActiveTab("1");
          }}
        >
          Подписки
        </button>{" "}
        <button
          className={activeTab === "2" ? styles.active : styles.tab}
          onClick={() => {
            setActiveTab("2");
          }}
        >
          Рекомендации
        </button>
      </div> */}
      </div>

                 }
    

                 {
                    id_post !=null  && <Outlet />
                 }
                    {
                    id_post ==null  && posts.map((posts) => (
        <CrElPosts post={posts}/>
      ))
                 }
   

    </div>
  );
};
export default Post_home;

      {/* <div><button onClick={()=>{
            // sendMessage(17,4,'gjvjubnt')
            auth()
         }}>
          
          auth</button><button onClick={()=>{
            sendMessage(17,4,'gjvjubnt')
            // auth()
         }}>
          
          sendMessage</button>
          <button onClick={()=>{
         
            // logout()
         }}>
          
          logout</button>
          <button onClick={()=>{
         
        //  info()
        getUserInfo()
        // getUserPosts()
        // getUsersPosts('JuliaKo')
        getGroupSubscribers(1)
      }}>
       
       info</button></div> */}
      {/* <CrElPosts/>
                <CrElPosts/> */}