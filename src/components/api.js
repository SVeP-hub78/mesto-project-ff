const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-19',
    headers: {
        authorization: '6d0b5d03-51a9-4d7e-ad03-d555d05c369e',
        'Content-Type': 'application/json'
    },
};

function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

// Получение карточек
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    }).then(checkResponse);
  };
  
// Загрузка информации о пользователе
export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    }).then(checkResponse);
  };

// Обновление профиля пользователя
export const updateUserProfile = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({ name, about }),
    }).then(checkResponse);
  };

// Добавление новой карточки
export const addCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({ name, link }),
    }).then(checkResponse);
  };

// Удаление карточки
export const deleteCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    }).then(checkResponse);
  };

  // Постановка лайка
export const likeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: config.headers,
    }).then(checkResponse);
  };

// Снятие лайка
export const unlikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    }).then(checkResponse);
  };
  
// Обновление аватара пользователя
export const updateUserAvatar = (avatarUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({ avatar: avatarUrl }),
    }).then(checkResponse);
  };  