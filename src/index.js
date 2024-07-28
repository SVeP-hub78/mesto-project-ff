import './pages/index.css'; // добавьте импорт главного файла стилей
import { initialCards } from './components/cards.js'; //импорт карточек
import { createCard, deleteCard, switchLike } from './components/card.js'
import { openModal, closeModal } from './components/modal.js';

// @todo: DOM узлы
 const profileEditButton = document.querySelector('.profile__edit-button');
 const profileAddButton = document.querySelector('.profile__add-button');
 const popupTypeEdit = document.querySelector('.popup_type_edit');
 const popupClose = document.querySelector('.popup__close');
 const popupTypeNewCard = document.querySelector('.popup_type_new-card');
//     // выбор элементов, куда должны быть вставлены значения полей
 const nameElement = document.querySelector('.profile__title');
 const jobElement = document.querySelector('.profile__description');

//Находим форму в DOM
const formElement = document.querySelector('.popup__form_type_edit');

//Находим поля формы в DOM
 const nameInput = formElement.querySelector('.popup__input_type_name');
 const jobInput = formElement.querySelector('.popup__input_type_description');

//делаем форму для добавления карточки
const addCardForm = popupTypeNewCard.querySelector('.popup__form');

//делаем поля формы для добавления карточки
 const CardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
 const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');

 //делаем контейнер для карточек
 const cardsContainer = document.querySelector('.places__list');

//делаем функцию "отправки" формы
  function handleFormElementSubmit(evt) {
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.

    //получение значения полей jobInput и nameInput из свойства value
     const newName = nameInput.value;
     const newJob = jobInput.value;

    // вставить новые значения с помощью textContent
     nameElement.textContent = newName;
     jobElement.textContent = newJob;
    
    //используем функцию closeModal чтобы закрыть попап
      closeModal(popupTypeEdit);
  }

// прикрепить обработчик к форме
formElement.addEventListener('submit', handleFormElementSubmit);

//обработчик отправки формы для добавления карточки
 function handleAddCardSubmit(evt) {
     evt.preventDefault();

    //получить значения полей cardNameInput и cardLinkInput из свойства value
     const cardName = CardNameInput.value;
     const cardLink = cardLinkInput.value;

    //создать новую карточку
    const newCard = createCard({ name: cardName, link: cardLink}, deleteCard, clickImage, switchLike);

    //добавить карточку в начало контейнера
    cardsContainer.prepend(newCard);

    //очистить форму
     addCardForm.reset();
     closeModal(popupTypeNewCard);
 }

//прикрепить обработчик к форме для добавления карточки
addCardForm.addEventListener('submit', handleAddCardSubmit);

// открыть попап по клику на кнопку
profileEditButton.addEventListener('click', () => {
    //заполнить инпуты сведениями из профиля
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;

    //открыть модальное окно с помощью функции openModal
     openModal(popupTypeEdit);
 });

profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard)); 

//Делаем попап с картинкой
 const popupImage = document.querySelector('.popup__image');
 const popupCaption = document.querySelector('.popup__caption');
 const popupTypeImage = document.querySelector('.popup_type_image');

function clickImage(cardDetals) {
    //открыть попап с картинкой
     popupImage.src = cardDetals.link;
     popupImage.alt = cardDetals.name;
     popupCaption.textContent = cardDetals.name;
     openModal(popupTypeImage);
 }

//закрыть попап по клику на кнопку закрытия
popupClose.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closeModal(popup);
});

// @todo: Вывести карточки на страницу
function showInitialCards() {
    initialCards.forEach((cardDetals) => {
        cardsContainer.append(createCard(cardDetals, deleteCard, clickImage, switchLike));
    });
}
showInitialCards();






