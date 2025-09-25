const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

//edit profile modal elements

const editProfilebtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);

const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

//New Post modal elements
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const addCardFormElement = newPostModal.querySelector(".modal__form");
const cardSubmitBtn = newPostModal.querySelector(".modal__save-btn");
const nameInput = newPostModal.querySelector("#profile-caption-input");
const linkInput = newPostModal.querySelector("#image-link-input");

const previewModal = document.querySelector("#modal__overlay");

const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");

previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

const previewNameEl = previewModal.querySelector(".modal__caption");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

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





//Open/Close modal functionality
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");


}

// Create the form submission handler for editing profile.
function handleProfileFormSubmit(evt) {
  // Prevent default browser behavior.
  evt.preventDefault();

  console.log("Submitting");
  profileName.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileDescriptionInput.value;

  // Close the modal.
  closeModal(editProfileModal);
}



editProfileModal.addEventListener("click", function (evt) {
  if (evt.target === editProfileModal) {
    closeModal(editProfileModal);
  }
});

editProfilebtn.addEventListener("click", function () {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
  resetValidation(editProfileForm, [
    editProfileNameInput,
    editProfileDescriptionInput,
  ]);
  openModal(editProfileModal);
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
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

/* NEW OPEN/CLOSE MODAL FUNCTIONALITY ? */
// Removed duplicate openModal and closeModal function definitions.

/* Card Template */
const cardTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = data.link;
  cardImage.alt = data.name;

  const cardLikeBtnElement = cardElement.querySelector(".card__like-btn");
  cardLikeBtnElement.addEventListener("click", () => {
    cardLikeBtnElement.classList.toggle("card__like-btn_active");
  });

  const cardDeleteBtnElement = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtnElement.addEventListener("click", () => {
    cardDeleteBtnElement.closest(".card").remove();
  });

  //image click listener
  const imagePreview = cardElement.querySelector(".card__image");

  imagePreview.addEventListener("click", () => {
    const modalImage = document.querySelector("#modal__image");
    modalImage.src = imagePreview.src;
    modalImage.alt = imagePreview.alt;

    previewNameEl.textContent = imagePreview.alt;

    openModal(document.querySelector("#modal__overlay"));
  });

  cardTitle.textContent = data.name;

  return cardElement;
}

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);

  cardList.prepend(cardElement);
});
