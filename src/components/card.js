let userId; //Объявляем переменную в userId

// @todo: Функция создания карточки
export function createCard(
  cardDetals,
  onDeleteCard,
  clickImage,
  onLikeClick,
  userId
) {
  // @todo: Темплейт карточки
  const cardTemplate = document.querySelector("#card-template").content;
  //присваиваем к карточке темплейт
  const card = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = card.querySelector(".card__image");
  cardImage.src = cardDetals.link;
  cardImage.alt = cardDetals.name;
  card.querySelector(".card__title").textContent = cardDetals.name;

  cardImage.addEventListener("click", () => {
    clickImage(cardDetals); //вызов обработчика клика по изображению
  });

  const likeCounter = card.querySelector(".card__like-counter");

  const deleteButton = card.querySelector(".card__delete-button");

  const likeButton = card.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    onLikeClick(card, cardDetals._id);
  });

  // Проверяем, принадлежит ли карточка текущему пользователю
  if (cardDetals.owner._id !== userId) {
    deleteButton.style.display = "none";
  } else {
    // Устанавливаем обработчик события удаления только если карточка принадлежит текущему пользователю
    deleteButton.addEventListener("click", () => {
      onDeleteCard(card, cardDetals._id);
    });
  }

  // Устанавливаем начальное состояние лайка и счетчик лайков
  updateLikeStatus(likeButton, likeCounter, cardDetals.likes);

  return card;
}

//@todo Изменение цвета
export function updateLikeStatus(likeButton, likeCounter, likes) {
  likeCounter.textContent = likes.length;
  if (likes.some((like) => like._id === window.userId)) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }
}

//Переключение лайка
export function switchLike(card, newLikes) {
  const likeButton = card.querySelector(".card__like-button");
  const likeCounter = card.querySelector(".card__like-counter");
  updateLikeStatus(likeButton, likeCounter, newLikes);
}

// @todo: Функция удаления карточки
export function deleteCard(card) {
  card.remove();
}
