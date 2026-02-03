import "./index.css";
import {
  enableValidation,
  validationConfig,
  resetValidation,
} from "../scripts/validation.js";
import Api from "../../utils/Api.js";
import { setBtnText } from "../../utils/helpers.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "26ef0769-3efd-4a7c-a3e3-26a1547779aa",
    "Content-Type": "application/json",
  },
});



/* Card Template */
const cardTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".cards__list");




//edit profile modal elements

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileNameInput = editProfileModal.querySelector("#profile-name-input");

const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input");

//Avatar Form Elements
const profileAvatarBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#avatar-modal");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-btn");

const avatarFormElement = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__save-btn");
const avatarLinkInput = avatarModal.querySelector("#profile-avatar-input");


//Delete Modal Elements
const deleteModal = document.querySelector("#delete-modal");
const deleteConfirmBtn = deleteModal.querySelector(".modal__delete-btn");
const deleteCancelBtn = deleteModal.querySelector(".modal__cancel-btn");
const deleteCloseBtn = deleteModal.querySelector(".modal__close-delete");
const deleteFormElement = deleteModal.querySelector(".modal__form-close");
const disableBtnState = (buttonEl) => {
  buttonEl.disabled = true;
}

//New Post modal elements
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostFormElement = newPostModal.querySelector(".modal__form");

const addCardFormElement = newPostModal.querySelector(".modal__form");
const cardSubmitBtn = newPostModal.querySelector(".modal__save-btn");
const nameInput = newPostModal.querySelector("#profile-caption-input");
const linkInput = newPostModal.querySelector("#image-link-input");

const previewModal = document.querySelector("#modal__overlay");
const modalPreviewBtn = previewModal.querySelector(".modal__close_type_preview");



const previewNameEl = previewModal.querySelector(".modal__caption");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

let selectedCard, selectedCardId;


api.getUserInfo()
  .then((userData) => {
    console.log("user data: " + JSON.stringify(userData));
    const profileName = document.querySelector(".profile__name");
    const profileDescription = document.querySelector(
      ".profile__description"
    );
    const avatarImage = document.querySelector(".profile__avatar");

    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    avatarImage.src = userData.avatar;
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

  api.editAvatar({
    avatar: avatarLinkInput.value,
  }).then((userData) => {
    const avatarImage = document.querySelector(".profile__avatar");
    avatarImage.src = userData.avatar;
  }).catch((err) => {
    console.log(`Error: ${err}`);
  });




  api
  .getInitialCards()
  .then((cards) => {
    console.log("cards data: " + JSON.stringify(cards));
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardList.prepend(cardElement);
    });
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });


//Open/Close modal functionality
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}


function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function handleDeleteCard(evt,cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);


}






modalPreviewBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

function handleLike(evt,id) {
  const isLiked = evt.target.classList.contains("card__like-btn_active");
  api.changeLikeStatus(id, isLiked).then((updatedCard) => {
    evt.target.classList.toggle("card__like-btn_active");
  }).catch((err) => {
    console.log(`Error: ${err}`);
  });
}




//escape key functionality

document.addEventListener("keydown", handleEscapeKey);

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}


function handleProfileFormSubmit(evt) {
//change text content to saving ...
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setBtnText(submitBtn, true, "Saving...", "Save");



  profileName.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileDescriptionInput.value;

  api.editUserInfo({
    name: editProfileNameInput.value,
    about: editProfileDescriptionInput.value,
  }).then((userData) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
  }).catch((err) => {
    console.log(`Error: ${err}`);
  }).finally(() => {
    submitBtn.textContent = "Save";
  });


  // Close the modal.
  closeModal(editProfileModal);


};

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setBtnText(submitBtn, true, "Saving...", "Save");

  api.editAvatar({
    avatar: avatarLinkInput.value,
  }).then((userData) => {
    const avatarImage = document.querySelector(".profile__avatar");
    avatarImage.src = userData.avatar;
  }).catch((err) => {
    console.log(`Error: ${err}`);
  }).finally(() => {
    submitBtn.textContent = "Save";
    closeModal(avatarModal);
  });

};




function handleNewPostFormSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setBtnText(submitBtn, true, "Saving...", "Save");

  api.createCard({
    name: nameInput.value,
    link: linkInput.value,
  }).then((cardData) => {
    const cardElement = getCardElement(cardData);
    cardList.prepend(cardElement);
  }).catch((err) => {
    console.log(`Error: ${err}`);
  }).finally(() => {
    submitBtn.textContent = "Save";
    closeModal(newPostModal);
  });

  evt.target.reset();
  disableBtnState(cardSubmitBtn);
};


function handleDeleteSubmit(evt, cardElement) {
  evt.preventDefault();
  const submitBtn = document.querySelector(".modal__delete-btn");
  setBtnText(submitBtn, true, "Deleting...", "Delete");
  cardElement.remove();

  api.deleteCard(selectedCardId).then(() => {
    selectedCardId.remove();
    closeModal(deleteModal);
  }).catch((err) => {
    console.log(`Error: ${err}`);
  }).finally(() => {
    submitBtn.textContent = "Delete";
    closeModal(deleteModal);
  });
}

function handleImageClick(evt, data) {
  openModal(previewModal);
  const previewImage = previewModal.querySelector(".modal__image");
  previewImage.src = data.link;
  previewImage.alt = data.name;
  previewNameEl.textContent = data.name;
};



editProfileBtn.addEventListener("click", function (evt) {
  resetValidation(editProfileForm, validationConfig);
  openModal(editProfileModal);
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
});




editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

// Create the submit listener.
addCardFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const cardElement = getCardElement({
    name: nameInput.value,
    link: linkInput.value,
  });



  cardList.prepend(cardElement);
  evt.target.reset();
  disableBtnState(cardSubmitBtn);
  closeModal(newPostModal);
  addCardFormElement.reset();
});



const modalOverlay = document.querySelector("#modal__overlay");

modalOverlay.addEventListener("click", function (evt) {
  if (evt.target === modalOverlay) {
    closeModal(modalOverlay);
  }
});

newPostModal.addEventListener("click", function (evt) {
  if (evt.target === newPostModal) {
    closeModal(newPostModal);
  }
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
  resetValidation(addCardFormElement, validationConfig);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});



profileAvatarBtn.addEventListener("click", function () {
  openModal(avatarModal);
});

avatarCloseBtn.addEventListener("click", function () {
  closeModal(avatarModal);
});

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);

newPostFormElement.addEventListener("submit", handleNewPostFormSubmit);

deleteFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  handleDeleteSubmit(evt, selectedCard);
});

deleteConfirmBtn.addEventListener("submit", handleDeleteSubmit);


deleteCancelBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});

deleteCloseBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});



function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-btn");
  const deleteButton = cardElement.querySelector(".card__delete-btn");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  likeButton.addEventListener("click", (evt) => handleLike(evt, data._id));

  deleteButton.addEventListener("click", (evt) => handleDeleteCard(evt,cardElement, data._id));

  cardImage.addEventListener("click", (evt) => handleImageClick(evt,data));

  return cardElement;
};


enableValidation(validationConfig);
