import "./pages/index.css"; // добавьте импорт главного файла стилей
import { initialCards } from "./components/cards.js"; //импорт карточек
import { createCard, deleteCard, switchLike } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import "./pages/index.css";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getInitialCards,
  getUserInfo,
  addCard,
  deleteCardApi,
  likeCard,
  unlikeCard,
  updateUserProfile,
  updateUserAvatar,
} from "./components/api.js";

// @todo: DOM узлы
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupClose = document.querySelectorAll(".popup__close");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
// выбор элементов, куда должны быть вставлены значения полей
const nameElement = document.querySelector(".profile__title");
const jobElement = document.querySelector(".profile__description");

//Находим форму в DOM
const editPopupFormType = document.querySelector(".popup__form_type_edit");

//Находим поля формы в DOM
const nameInput = editPopupFormType.querySelector(".popup__input_type_name");
const jobInput = editPopupFormType.querySelector(
  ".popup__input_type_description"
);

//делаем форму для добавления карточки
const addCardForm = popupTypeNewCard.querySelector(".popup__form");

//делаем поля формы для добавления карточки
const cardNameInout = addCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");

//Делаем попап с картинкой
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupTypeImage = document.querySelector(".popup_type_image");

//делаем контейнер для карточек
const cardsContainer = document.querySelector(".places__list");
const avatarElement = document.querySelector(".profile__image");
const avatarEditButton = document.querySelector(".profile__image-button");
const popupUpdateAvatar = document.querySelector(".popup_type_update-avatar");
const avatarForm = popupUpdateAvatar.querySelector(
  ".popup__form_type_update-avatar"
);
const avatarUrlInput = avatarForm.querySelector(
  ".popup__input_type_avatar-url"
);

//настройки валидации
const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function renderLoading(
  button,
  isLoading,
  loadingText = "Сохранение...",
  originalText = "Сохранить"
) {
  if (isLoading) {
    button.textContent = loadingText;
    button.disabled = true;
  } else {
    button.textContent = originalText;
    button.disabled = false;
  }
}

//делаем функцию "отправки" формы
function handleEditPopupFormTypeSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
  const submitButton = evt.submitter;
  renderLoading(submitButton, true);
  //получение значения полей jobInput и nameInput из свойства value
  const newName = nameInput.value;
  const newJob = jobInput.value;

  updateUserProfile(newName, newJob)
    .then((updatedUser) => {
      updateUserInfo(updatedUser);
      closeModal(popupTypeEdit);
    })
    .catch((err) => console.error("Ошибка при обновлении профиля:", err))
    .finally(() => renderLoading(submitButton, false));
}

//обработчик отправки формы для добавления карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  renderLoading(submitButton, true, "Создание...", "Создать");

  //получить значения полей cardNameInout и cardLinkInput из свойства value
  const cardName = cardNameInout.value;
  const cardLink = cardLinkInput.value;

  addCard(cardName, cardLink)
    .then((newCardData) => {
      const newCard = createCard(
        newCardData,
        handleDeleteCard,
        clickImage,
        handleLikeClick,
        window.userId
      );
      cardsContainer.prepend(newCard);
      closeModal(popupTypeNewCard);
      evt.target.reset();
    })
    .catch((err) => console.error("Ошибка при добавлении карточки:", err))
    .finally(() =>
      renderLoading(submitButton, false, "Создание...", "Создать")
    );
}

function clickImage(cardDetals) {
  popupImage.src = cardDetals.link;
  popupImage.alt = cardDetals.name;
  popupCaption.textContent = cardDetals.name;
  openModal(popupTypeImage);
}

//Функция обновления информации о пользователе
function updateUserInfo(userData) {
  nameElement.textContent = userData.name;
  jobElement.textContent = userData.about;
  avatarElement.style.backgroundImage = `url(${userData.avatar})`;
}

//делаем функцию рендеринга карточек
function renderCards(cards) {
  cardsContainer.innerHTML = "";
  cards.forEach((cardDetals) => {
    const picture = createCard(
      cardDetals,
      handleDeleteCard,
      clickImage,
      handleLikeClick,
      window.userId
    );
    cardsContainer.append(picture);
  });
}

//прикрепить обработчик к форме для добавления карточки
function initialDataLoad() {
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cards]) => {
      window.userId = userData._id;
      updateUserInfo(userData);
      renderCards(cards);
    })
    .catch((err) => {
      console.error("Ошибка при загрузке начальных данных:", err);
    });
}

function handleDeleteCard(card, cardId) {
  deleteCardApi(cardId)
    .then(() => {
      deleteCard(card);
    })
    .catch((err) => console.error("Ошибка при удалении карточки:", err));
}

function handleLikeClick(card, cardId) {
  const likeButton = card.querySelector(".card__like-button");
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const likeAction = isLiked ? unlikeCard : likeCard;
  likeAction(cardId)
    .then((updateCard) => {
      switchLike(card, updateCard.likes);
    })
    .catch((err) => console.error("Ошибка при обновлении лайка:", err));
}

function handleAvatarUpdate(event) {
  event.preventDefault();
  const submitButton = event.submitter;
  renderLoading(submitButton, true);
  const avatarUrl = avatarUrlInput.value;
  updateUserAvatar(avatarUrl)
    .then((updatedUser) => {
      avatarElement.style.backgroundImage = `url(${updatedUser.avatar})`;
      closeModal(popupUpdateAvatar);
      event.target.reset();
    })
    .catch((error) => console.error("Ошибка при обновлении аватара:", error))
    .finally(() => renderLoading(submitButton, false));
}

document.addEventListener("DOMContentLoaded", () => {
  initialDataLoad();

  enableValidation(validationSettings);

  editPopupFormType.addEventListener("submit", handleEditPopupFormTypeSubmit);
  addCardForm.addEventListener("submit", handleAddCardSubmit);

  profileEditButton.addEventListener("click", () => {
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
    clearValidation(editPopupFormType, validationSettings);
    openModal(popupTypeEdit);
  });

  profileAddButton.addEventListener("click", () => {
    addCardForm.reset();
    clearValidation(addCardForm, validationSettings);
    openModal(popupTypeNewCard);
  });

  avatarEditButton.addEventListener("click", () => {
    avatarForm.reset();
    clearValidation(avatarForm, validationSettings);
    openModal(popupUpdateAvatar);
  });

  avatarForm.addEventListener("submit", handleAvatarUpdate);

  popupClose.forEach((button) => {
    button.addEventListener("click", () => {
      const popup = button.closest(".popup");
      closeModal(popup);
    });
  });
});
