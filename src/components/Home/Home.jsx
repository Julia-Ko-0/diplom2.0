import styles from "./home.module.css";
import { PostM } from "../../models/models";
import { post } from "../../data/elem";
import { Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
  getFilteredPosts,
  getGroupSubscribers,
  getRandomPosts,
  getRecommendedPosts,
  getUserInfo,
  getUserPosts,
  getUsersPosts,
} from "../../hooks/api";
import { formatDate, getImageSrc } from "../../hooks/homeH";
import { useParams } from "react-router-dom";
import { usePosts } from "../PostaContext/PostaContext";

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

const Homes = () => {
  const [activeTab, setActiveTab] = useState("1");
  // const [posts, setPost] = useState([]);
  const { setPosts } = usePosts();
  const [posts2, setPost2] = useState([]);
  // useEffect(() => {
  //   activeTab == "2"
  //     ? getRecommendedPosts(10, 0)
  //         .then((data) => {
  //           setPosts(data);
  //         })
  //         .catch((error) => {
  //           console.error("Ошибка при получении постов:", error.message);
  //           setPosts([]);
  //         })
  //     : getFilteredPosts()
  //         .then((data) => {
  //           setPosts(data);
  //         })
  //         .catch((error) => {
  //           console.error("Ошибка при получении постов:", error.message);
  //           setPosts([]);
  //           // getRandomPosts()
  //           //   .then((data) => {
  //           //     setPosts(data);
  //           //   })
  //           //   .catch((error) => {
  //           //     console.error("Ошибка при получении постов:", error.message);
  //           //     setPosts([]);
  //           //   });
  //         });
  // }, [activeTab]);
  useEffect(() => {
    // getUserPosts()
    //   .then((data) => {
    //     setPost2(data.posts);
    //   })
    //   .catch((error) => {
    //     console.error("Ошибка при получении постов:", error.message);
    //   });
  }, []);
  return (
    <div className={styles.posts}>
      <Outlet />
    </div>
  );
};
export default Homes;
