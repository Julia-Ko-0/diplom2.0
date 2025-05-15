const API_BASE = "http://localhost:8080";

// Базовый метод для запросов
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
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Ошибка API: ${res.status} - ${error}`);
  }
  return res.json();
}

// Универсальный GET с авторизацией
async function fetchGetWithAuth(endpoint) {
  return fetchWithAuth(endpoint, { method: "GET" });
}

/* 🔐 Авторизация */
export const loginUser = (data) => fetchWithAuth("/login", { body: JSON.stringify(data) });
export const logoutUser = () => fetchWithAuth("/logout");

/* 👤 Пользователь */
export const getUserInfo = () => fetchWithAuth("/user_info");
export const getUsersInfo = (login) => fetchWithAuth(`/user_info/${login}`);
export const getUserPosts = (limit = 10, offset = 0) =>
  fetchWithAuth(`/user_info_post?limit=${limit}&offset=${offset}`);
export const getUsersPosts = (login, limit = 10, offset = 0) =>
  fetchWithAuth(`/user_info_post/${login}?limit=${limit}&offset=${offset}`);

/* 📝 История и профиль */
export const getNameHistory = () => fetchWithAuth("/user/name-history");
export const updateUserInfo = (data) => fetchWithAuth("/update-info-user", { body: JSON.stringify(data) });
export const updateUserEmail = (email) => fetchWithAuth("/update-user-email", { body: JSON.stringify({ email }) });
export const updateBirthdate = (birthdate) => fetchWithAuth("/update-user-birthdate", { body: JSON.stringify({ birthdate }) });
export const updateUserLogin = (login) => fetchWithAuth("/update-user-login", { body: JSON.stringify({ login }) });
export const updateUserPassword = (password) => fetchWithAuth("/update-user-password", { body: JSON.stringify({ password }) });

/* 💬 Чаты и сообщения */
export const getUserChatFolders = () => fetchWithAuth("/user/chats");
export const getUserChats = () => fetchWithAuth("/user/chats");
export const getChatsInFolder = (folderId) => fetchWithAuth(`/user/chats/${folderId}`);
export const getChatInfo = (chatId) => fetchWithAuth(`/user/chats/info/${chatId}`);
export const getChatMessages = (chatId, limit = 10, offset = 0) =>
  fetchWithAuth(`/user/chats/messages/${chatId}?limit=${limit}&offset=${offset}`);
export const sendMessageOne = (data) => fetchWithAuth("/send-message-one", { body: JSON.stringify(data) });
export const sendMessageToChat = (data) => fetchWithAuth("/send-message", { body: JSON.stringify(data) });

/* 📦 Папки и управление чатами */
export const addChatFolder = (name) => fetchWithAuth("/add-chat-folder", { body: JSON.stringify({ name }) });
export const addChatToFolder = (data) => fetchWithAuth("/add-chat-to-folder", { body: JSON.stringify(data) });
export const updateGroupChat = (data) => fetchWithAuth("/update-group-chat", { body: JSON.stringify(data) });
export const removeUserFromChat = (chatId, userId) =>
  fetchWithAuth("/remove-user-from-chat", { body: JSON.stringify({ chatId, userId }) });

/* 🗑️ Удаления */
export const deleteMessage = (data) => fetchWithAuth("/delete-sms-from-chat", { body: JSON.stringify(data) });
export const deleteChat = (data) => fetchWithAuth("/delete-chat", { body: JSON.stringify(data) });
export const deleteFriendRequest = (data) => fetchWithAuth("/delete-friend-request", { body: JSON.stringify(data) });
export const deletePost = (data) => fetchWithAuth("/delete-post-user", { body: JSON.stringify(data) });

/* 👥 Друзья и подписки */
export const getFriendsList = () => fetchWithAuth("/friends/list");
export const removeFriend = (friendId) =>
  fetchWithAuth("/friends/remove", { body: JSON.stringify({ friend_id: friendId }) });

/* 📨 Заявки в друзья */
export const getFriendRequests = () => fetchWithAuth("/friend-request/incoming");
export const sendFriendRequest = (targetId) =>
  fetchWithAuth("/friend-request/send", { body: JSON.stringify({ target_id: targetId }) });
export const acceptFriendRequest = (targetId) =>
  fetchWithAuth("/friend-request/accept", { body: JSON.stringify({ target_id: targetId }) });
export const rejectFriendRequest = (targetId) =>
  fetchWithAuth("/friend-request/reject", { body: JSON.stringify({ target_id: targetId }) });

/* 🚫 Чёрный список */
export const addToBlacklist = (blockedId) =>
  fetchWithAuth("/blacklist/add", { body: JSON.stringify({ blocked_id: blockedId }) });
export const removeFromBlacklist = (blockedId) =>
  fetchWithAuth("/blacklist/remove", { body: JSON.stringify({ blocked_id: blockedId }) });

/* 🔁 Репосты */
export const removeRepost = (repostId) =>
  fetchWithAuth("/reposts/remove", { body: JSON.stringify({ repost_id: repostId }) });

/* 👤 Подписчики и подписки */
export const getSubscribersList = () => fetchWithAuth("/user/subscribers");
export const getGroupSubscribers = (id_group) => fetchWithAuth(`/group/${id_group}/subscribers`);
export const subscribeToUser = (targetId) => fetchWithAuth("/user/subscribe", { body: JSON.stringify({ target_id: targetId }) });
export const unsubscribeFromUser = (targetId) => fetchWithAuth("/user/unsubscribe", { body: JSON.stringify({ target_id: targetId }) });

/* 📄 Посты */
export const createPost = (data) => fetchWithAuth("/add-post-user", { body: JSON.stringify(data) });
export const updatePost = (postId, content) =>
  fetchWithAuth("/update-post-user", { body: JSON.stringify({ post_id: postId, content }) });

/* 🏷️ Теги */
export const createTag = (data) => fetchWithAuth("/tags/create", { body: JSON.stringify(data) });
export const getTags = (groupId) => fetchWithAuth(`/tags/${groupId}`);
export const updateTagsInGroup = (data) => fetchWithAuth("/group/update-tags", { body: JSON.stringify(data) });

/* 👾 Стикеры */
export const createStickerPack = (data) => fetchWithAuth("/user/sticker-pack/create", { body: JSON.stringify(data) });
export const addStickerToPack = (data) => fetchWithAuth("/user/sticker-pack/add-sticker", { body: JSON.stringify(data) });
export const getUserStickerPacks = () => fetchWithAuth("/user/sticker-pack/list");
export const sendStickerToUser = (data) => fetchWithAuth("/sticker/send", { body: JSON.stringify(data) });

/* 🛠 Роли и разрешения */
export const getRolesInfoForGroup = (groupId) => fetchWithAuth(`/groups/${groupId}/roles`);

/* 💬 Комментарии */
export const getComments = (postId) => fetchWithAuth(`/comments?post_id=${postId}`);
export const toggleLikeComment = (commentId) => fetchWithAuth("/toggle_like_comment", { body: JSON.stringify({ comment_id: commentId }) });

/* ✨ Уведомления и избранное */
export const addToFavourites = (data) => fetchWithAuth("/add_to_favourites", { body: JSON.stringify(data) });
export const getUserFavouriteSMS = () => fetchWithAuth("/user/favourite-sms");

/* Управление чатами и папками чатов */
export const getChatsByFolder = (folderId) => fetchWithAuth("/user/chats-in-folder", { body: JSON.stringify({ folder_id: folderId }) });
export const removeChatFromFolder = (chatId) => fetchWithAuth("/user/folder/chat/remove", { body: JSON.stringify({ chat_id: chatId }) });
export const removeChatFolder = (folderId) => fetchWithAuth("/user/folder/remove", { body: JSON.stringify({ folder_id: folderId }) });
export const addRepost = (data) => fetchWithAuth("/add-repost", { body: JSON.stringify(data) });
export const getUserReposts = () => fetchWithAuth("/reposts");
export const getUsersReposts = (login) => fetchWithAuth(`/reposts/${login}`);

export const registerUser = (data) => fetchWithAuth("/register", { body: JSON.stringify(data) });
export const checkAuth = () => fetchWithAuth("/check-auth");
export const getUserChatsByFolderName = (folder) =>
  fetchWithAuth(`/user/chats/${folder}`);

export const createRoleWithFeatures = (groupId, data) => 
  fetchWithAuth(`/groups/${groupId}/roles`, { body: JSON.stringify(data) });

export const addFeatureToRole = (roleId, data) => 
  fetchWithAuth(`/roles/${roleId}/features`, { body: JSON.stringify(data) });

export const addUserToRoleGroup = (roleId, data) => 
  fetchWithAuth(`/roles/${roleId}/users`, { body: JSON.stringify(data) });
export const getChatsByFolderId = (folderId) => fetchGetWithAuth(`/user/chats-by-folder?folder_id=${folderId}`);
export const getGroupInfo = (groupId) => fetchGetWithAuth(`/group/info?group_id=${groupId}`);
export const addGroup = (data) =>
  fetchWithAuth("/user/group/add", { body: JSON.stringify(data) });

export const getGroupPosts = (groupId) =>
  fetchWithAuth(`/group/${groupId}/posts`);

export const addCommentToGroupPost = (groupId, data) =>
  fetchWithAuth(`/group/${groupId}/add-post-comment`, { body: JSON.stringify(data) });

export const addUserToGroupBlacklist = (groupId, userId) =>
  fetchWithAuth(`/group/${groupId}/blacklist/add`, { body: JSON.stringify({ user_id: userId }) });

export const removeUserFromGroupBlacklist = (groupId, userId) =>
  fetchWithAuth(`/group/${groupId}/blacklist/remove`, { body: JSON.stringify({ user_id: userId }) });
export const searchPosts = (query) =>
  fetchWithAuth("/search/posts", { body: JSON.stringify({ query }) });

export const searchUsers = (query) =>
  fetchWithAuth("/search/users", { body: JSON.stringify({ query }) });

export const searchGroups = (query) =>
  fetchWithAuth("/search/group", { body: JSON.stringify({ query }) });

export const searchAll = (query) =>
  fetchWithAuth("/search/all", { body: JSON.stringify({ query }) });
export const deleteUserPost = (postId) =>
  fetchWithAuth("/user/post/delete", { body: JSON.stringify({ post_id: postId }) });
export const updateUserPost = (postId, content) =>
  fetchWithAuth("/user/post/update", { body: JSON.stringify({ post_id: postId, content }) });
export const removeSubscriber = (userId) =>
  fetchWithAuth("/user/remove-subscriber", { body: JSON.stringify({ user_id: userId }) });


// Обновление даты рождения
export const updateUserBirthDate = (birthDate) =>
  fetchWithAuth('/update-user-birthdate', { birthDate }); // birthDate формат "YYYY-MM-DD"

// ======================== Стикеры ========================
export const sendStickerToChat = (chatId, stickerId) =>
  fetchWithAuth('/stickers/send/chat', { chat_id: chatId, sticker_id: stickerId });

// ======================== Чаты ========================

export const createGroupChat = (creatorId, chatName, userIds, photoBase64 = null) =>
  fetchWithAuth('/chats/group/create', {
    creator_id: creatorId,
    chat_name: chatName,
    user_ids: userIds,
    photo_base64: photoBase64,
  });

export const deleteSMSFromChat = (smsId) =>
fetchWithAuth('/chats/sms/delete', { sms_id: smsId });



export const addFeature = (adminId, name, description) =>
fetchWithAuth('/features/add', {
    admin_id: adminId,
    name_feature_role: name,
    description_feature: description,
  });
  export const getRecommendedPosts = ( limit = 50, offset = 0) =>
  fetchWithAuth(`/recommended-posts?limit=${limit}&offset=${offset}`);
  export const getFilteredPosts = ( limit = 50, offset = 0) =>
  fetchWithAuth(`/filtered-posts?limit=${limit}&offset=${offset}`);