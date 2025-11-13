// src/components/Home/Post_home/Post_home.jsx
import styles from "./Post_home.module.css";
import { Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { usePosts } from "../../PostaContext/PostaContext";
import { getFilteredPosts } from "../../../hooks/api";
import { PostC } from "../../Group_info/Group_info";

const LIMIT = 10;

export default function Post_home() {
  const navigate = useNavigate();
  const {
    posts,
    setPosts,
    offset,
    setOffset,
    hasMore,
    setHasMore,
    hasLoaded,
    setHasLoaded,
    loading,
    setLoading,
  } = usePosts();

  const [searchParams, setSearchParams] = useState("");

  const fetchPosts = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    setLoading(true);

    try {
      const data = await getFilteredPosts(LIMIT, reset ? 0 : offset);
      const validData = Array.isArray(data) ? data : [];

      if (reset) {
        setPosts(validData);
        setOffset(LIMIT);
        setHasMore(validData.length === LIMIT);
      } else {
        setPosts((prev) => [...prev, ...validData]);
        setOffset((prev) => prev + LIMIT);
        if (validData.length < LIMIT) setHasMore(false);
      }

      setHasLoaded(true);
    } catch (err) {
      console.error("Ошибка при получении постов:", err);
      setHasMore(false);
      if (reset) setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка постов при монтировании
  useEffect(() => {
    if (!hasLoaded) fetchPosts(true);
  }, []);

  // Подгрузка при скролле
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight - 200;
      if (bottom && hasMore) fetchPosts();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset, loading, hasMore]);

  // Надёжное восстановление scroll при возврате
  useEffect(() => {
    const scroll = sessionStorage.getItem("scrollPosition");
    if (!scroll) return;

    // Даем браузеру подгрузить DOM и изображения
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(scroll, 10));
        sessionStorage.removeItem("scrollPosition");
      });
    }, 150); // 100–200 мс обычно достаточно

    return () => clearTimeout(timeoutId);
  }, [hasLoaded, posts.length]);

  const handleOpenPost = (post) => {
    sessionStorage.setItem("scrollPosition", window.scrollY);
    navigate(`/us/home/post/${post.post_id}`, { state: { post } });
  };

  return (
    <div className={styles.posts}>
      <div className={styles.add_posts}>
        <input
          value={searchParams}
          onChange={(e) => setSearchParams(e.target.value)}
          onFocus={() => navigate("/us/home/search")}
          placeholder="Поиск..."
        />
      </div>

      <div style={{ display: "grid", gap: "20px" }}>
        {posts.map((post, index) => (
          <PostC
            key={`${post.post_id}-${index}`}
            groupName={
              post.post_type === "user"
                ? post.author.username
                : post.group_info.group_name
            }
            groupPhoto={
              post.post_type === "user"
                ? post.author?.profile_picture?.trim() ||
                  "/imgs/log/Group 25 (2).svg"
                : post.group_info?.photo ||
                  post.author?.profile_picture ||
                  "/imgs/log/Group 25 (2).svg"
            }
            post={post}
            onClickPost={handleOpenPost}
          />
        ))}
      </div>

      {loading && <p>Загрузка...</p>}
      {!hasMore && <p>Все посты загружены</p>}

      <Outlet />
    </div>
  );
}
