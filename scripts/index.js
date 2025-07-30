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

const newPostImageInput = document.querySelector("#image-link-input");
const newPostCaptionInput = document.querySelector("#post-caption-input");


const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const addCardFormElement = newPostModal.querySelector(".modal__form");
const nameInput = newPostModal.querySelector("#profile-caption-input");
const linkInput = newPostModal.querySelector("#image-link-input");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

//Open/Close modal functionality
function openModal(modal) {
  modal.classList.add("modal_is-opened");
};

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
};

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

editProfilebtn.addEventListener("click", function () {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

// Create the form submission handler.
function handleAddCardSubmit(evt) {
  // Prevent default browser behavior.
  evt.preventDefault();

  // Log both input values to the console.
  console.log(nameInput.value);
  console.log(linkInput.value);

  // Close the modal.
  closeModal(newPostModal);
}

// Create the submit listener.
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {

  closeModal(newPostModal);
});

editProfileForm.addEventListener("submit", handleProfileFormSubmit);
