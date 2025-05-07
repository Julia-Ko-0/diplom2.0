// api.js — модуль для работы с бэкендом
const API_BASE = "http://localhost:8080";

async function fetchWithAuth(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const defaultOptions = {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: { ...defaultOptions.headers, ...(options.headers || {}) },
  };

  const res = await fetch(url, mergedOptions);
  return res.json();
}

// 🔐 Авторизация
export const loginUser = (data) => fetchWithAuth("/login", { body: JSON.stringify(data) });
export const logoutUser = () => fetchWithAuth("/logout");

// 👤 Пользователь
export const getUserInfo = () => fetchWithAuth("/user_info");
export const getUsersInfo = (login) => fetchWithAuth(`/user_info/${login}`);
export const getUserPosts = (limit = 10, offset = 0) =>
  fetchWithAuth(`/user_info_post?limit=${limit}&offset=${offset}`);
export const getUsersPosts = (login, limit = 10, offset = 0) =>
    fetchWithAuth(`/user_info_post/${login}?limit=${limit}&offset=${offset}`);
// 📁 Папки и чаты
export const getUserChatFolders = () => fetchWithAuth("/user/chat-folders");
export const getUserChats = () => fetchWithAuth("/user/chats");
export const getChatsInFolder = (folderId) => fetchWithAuth(`/user/chats/${folderId}`);
export const getChatInfo = (chatId) => fetchWithAuth(`/user/chats/info/${chatId}`);
export const getChatMessages = (chatId, limit = 10, offset = 0) =>
  fetchWithAuth(`/user/chats/messenge/${chatId}?limit=${limit}&offset=${offset}`);

// 📝 История и профиль
export const getNameHistory = () => fetchWithAuth("/user/name-history");
export const updateUserInfo = (data) => fetchWithAuth("/update-info-user", { body: JSON.stringify(data) });
export const updateUserEmail = (email) => fetchWithAuth("/update-user-email", { body: JSON.stringify({ email }) });
export const updateBirthdate = (birthdate) => fetchWithAuth("/update-user-birthdate", { body: JSON.stringify({ birthdate }) });
export const updateUserLogin = (login) => fetchWithAuth("/update-user-login", { body: JSON.stringify({ login }) });
export const updateUserPassword = (password) => fetchWithAuth("/update-user-password", { body: JSON.stringify({ password }) });

// 💬 Чаты и сообщения
export const sendMessageOne = (data) => fetchWithAuth("/send-message-one", { body: JSON.stringify(data) });
export const sendMessageToChat = (data) => fetchWithAuth("/send-message", { body: JSON.stringify(data) });

// 📦 Папки и управление чатами
export const addChatFolder = (name) => fetchWithAuth("/add-chat-folder", { body: JSON.stringify({ name }) });
export const addChatToFolder = (data) => fetchWithAuth("/add-chat-to-folder", { body: JSON.stringify(data) });
export const updateGroupChat = (data) => fetchWithAuth("/update-group-chat", { body: JSON.stringify(data) });
export const removeUserFromChat = (chatId, userId) =>
  fetchWithAuth("/remove-user-from-chat", { body: JSON.stringify({ chatId, userId }) });

// 🗑️ Удаления
export const deleteMessage = (data) => fetchWithAuth("/delete-sms-from-chat", { body: JSON.stringify(data) });
export const deleteChat = (data) => fetchWithAuth("/delete-chat", { body: JSON.stringify(data) });
export const deleteFriendRequest = (data) => fetchWithAuth("/delete-friend-request", { body: JSON.stringify(data) });
export const deletePost = (data) => fetchWithAuth("/delete-post-user", { body: JSON.stringify(data) });
// 👥 Друзья и подписки
export const getFriendsList = () => fetchWithAuth("/user/friends/list");
export const removeFriend = (friendId) =>
  fetchWithAuth("/user/friends/remove", { body: JSON.stringify({ friend_id: friendId }) });

// 📨 Заявки в друзья
export const getFriendRequests = () => fetchWithAuth("/user/friend-request/incoming");
export const sendFriendRequest = (targetId) =>
  fetchWithAuth("/user/friend-request/send", { body: JSON.stringify({ target_id: targetId }) });
export const acceptFriendRequest = (targetId) =>
  fetchWithAuth("/user/friend-request/accept", { body: JSON.stringify({ target_id: targetId }) });
export const rejectFriendRequest = (targetId) =>
  fetchWithAuth("/user/friend-request/reject", { body: JSON.stringify({ target_id: targetId }) });

// 🚫 Чёрный список (блокировка)
export const addToBlacklist = (blockedId) =>
  fetchWithAuth("/user/blacklist/add", { body: JSON.stringify({ blocked_id: blockedId }) });
export const removeFromBlacklist = (blockedId) =>
  fetchWithAuth("/user/blacklist/remove", { body: JSON.stringify({ blocked_id: blockedId }) });

// 🔁 Репосты
export const removeRepost = (repostId) =>
  fetchWithAuth("/user/repost/remove", { body: JSON.stringify({ repost_id: repostId }) });
