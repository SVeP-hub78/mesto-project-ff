
// @todo: Функция создания карточки
export function createCard(cardDetals, onDeleteCard, clickImage, switchLike) {
    // @todo: Темплейт карточки 
const cardTemplate = document.querySelector('#card-template').content;
    //присваиваем к карточке темплейт
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    
    
    const cardImage = card.querySelector('.card__image');
    cardImage.src = cardDetals.link;
    cardImage.alt = cardDetals.name;
    card.querySelector('.card__title').textContent = cardDetals.name;
    
    cardImage.addEventListener('click', () => {
        clickImage(cardDetals);//вызов обработчика клика по изображению
    });
    
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        onDeleteCard(card);
    });

    const likeButton = card.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => {
        switchLike(likeButton);
    });
    return card;
}
    //@todo Изменение цвета
export function switchLike(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active')
}

// @todo: Функция удаления карточки
export function deleteCard(card) {
    card.remove();
} 
