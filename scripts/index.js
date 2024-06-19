// @todo: Темплейт карточки
const cardTemplateBox = document.querySelector('#card-template');
cardTemplate = cardTemplateBox.content.querySelector('.card');

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCards(name, link, deleteCallback) {
    const card = cardTemplate.cloneNode(true);
    card.querySelector('.card__title').textContent = name;
    card.querySelector('.card__image').src = link;
    card.querySelector('.card__delete-button').addEventListener('click', (event) => {
        deleteCallback(card);
    });
    return card;
}
// @todo: Функция удаления карточки
function deleteCard(event) {
    event.remove();
} 
// @todo: Вывести карточки на страницу
initialCards.forEach((cardInfo) => {
    const card = createCards(cardInfo.name, cardInfo.link, deleteCard, undefined);
    placesList.append(card);
});