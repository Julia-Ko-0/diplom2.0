import { createContext, useContext, useState } from "react";

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        offset,
        setOffset,
        hasMore,
        setHasMore,
        hasLoaded,
        setHasLoaded,
        loading,
        setLoading
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);