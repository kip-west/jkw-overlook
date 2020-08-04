// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import domUpdates from '../src/domUpdates';
import CustomerData from '../src/CustomerData';
import RoomsData from '../src/RoomsData';
import BookingsData from '../src/BookingsData';
import Moment from 'moment';
import Manager from '../src/Manager'

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';

let today = new Date();

window.onload = getDataFromServer();

const loginSubmitButton = document.getElementById("submit-login");
const searchRoomsButton = document.getElementById("searchRooms-button");
const clearResultsButton = document.getElementById("clear-searchRooms-button");
const searchUserButton = document.getElementById("searchUsers-button");
const clearUserButton = document.getElementById("clear-searchUsers-button");
const selectDateInput = document.getElementById("select-date-for-booking");
const findOpenRoomButton = document.getElementById("select-date-button");
const selectOpenRoomButton = document.getElementById("select-room-button");
const bookRoomManagerButton = document.getElementById('book-room-manager');
const bookingsList = document.getElementById("list-of-bookings")

loginSubmitButton.addEventListener("click", validateLogin);
searchRoomsButton.addEventListener("click", searchRooms);
clearResultsButton.addEventListener("click", clearSearchResults);
searchUserButton.addEventListener("click", searchUsers);
clearUserButton.addEventListener("click", clearUserProfile);
findOpenRoomButton.addEventListener("click", findRoomToBook);
selectOpenRoomButton.addEventListener("click", domUpdates.showManagerBookRoomButtons);
bookRoomManagerButton.addEventListener("click", bookRoomManager);
bookingsList.addEventListener("click", deleteBooking)

function validateUsername() {
  if (domUpdates.checkManagerLogin()) {
    createManager();
    domUpdates.showManagerDashboard();
    updateManagerDisplay();
  }

  else if (domUpdates.checkCustomerLogin().isValid) {
    let currentUserID = domUpdates.checkCustomerLogin().createCustomer;
    createCustomer(currentUserID)
    domUpdates.showCustomerDashboard();
    updateCustomerDisplay();
  }

  else {
    domUpdates.displayLoginError();
  }
}

function validateLogin() {
  event.preventDefault();
  if(domUpdates.checkPassword()) {
    validateUsername()
  } else {
    domUpdates.displayLoginError();
  }
}

/*----------Create Current User Functions----------*/
function createCustomer(id) {
  domUpdates.currentUser = domUpdates.usersData.findUserByID(id);
}

function createManager() {
  domUpdates.currentUser = new Manager({ id: 'Manager', name: 'Manager'})
}

function createHotelData(usersData, roomsData, bookingsData) {
  domUpdates.usersData = new CustomerData(usersData);
  domUpdates.roomsData = new RoomsData(roomsData);
  domUpdates.bookingsData = new BookingsData(bookingsData);
}

function updateCustomerDisplay() {
  domUpdates.retrieveCurrentCustomerBookings();
  domUpdates.displayBookingData();
  domUpdates.displayTotalSpent(domUpdates.createRoomNumbersArray(domUpdates.currentUser.bookings))
  console.log(domUpdates)
}

function updateManagerDisplay() {
  domUpdates.displayTotalRevenue();
  domUpdates.displayVacancyData();
  domUpdates.createUserListOptions();
}

function clearSearchResults() {
  document.querySelector('.searchRoom-results').innerHTML = '';
}

function searchRooms() {
  event.preventDefault();
  clearSearchResults();
  let selectDateInput = document.getElementById('select-date').value;
  let roomTypeInput = document.getElementById('select-roomType').value;
  if (selectDateInput && roomTypeInput) {
    domUpdates.displayVacantRoomsType()
  } else if (selectDateInput && !roomTypeInput) {
    domUpdates.displayVacantRoomsDate();
  }

  addListenersBookRoom();
}

function searchUsers() {
  event.preventDefault();
  domUpdates.createUserProfileCard();
  domUpdates.displayUserProfileCard();
}

function clearUserProfile() {
  domUpdates.clearUserProfileCard();
}

function addListenersBookRoom() {
  let bookRoomButtons = document.querySelectorAll('.book-room');
  for (let i = 0; i < bookRoomButtons.length; i++) {
    bookRoomButtons[i].addEventListener('click', bookRoomClickHandler);
  }
}

function bookRoomManager() {
  event.preventDefault()
  let postBody = domUpdates.createManagerPOSTBody();

  postBookingData(postBody);
}

function deleteBooking(event) {
  if(event.target.localName === "button") {
    confirm("Are you sure you want to delete this booking?");
    let bookingID = parseInt(event.target.id);
    let bookingBody = {
      "id": bookingID
    }
    deleteData(bookingBody);
    console.log(bookingBody)
  }
}

function bookRoomClickHandler(event) {
  let selectDateInput = document.getElementById('select-date').value;
  let selectDateInputMoment = new Moment(selectDateInput).format('YYYY/MM/DD')
  let postBody = {
    "userID": domUpdates.currentUser.id,
    "date": selectDateInputMoment,
    "roomNumber": parseInt(event.target.id)
  }

  postBookingData(postBody);
}

function findRoomToBook() {
  event.preventDefault();
  domUpdates.bookRoomSelectDate();
}

function bookRoom() {
  event.preventDefault();
  domUpdates.createPostBody();
}

/*----------GET/POST/DELETE Functions----------*/
function getDataFromServer() {
  Promise.all([
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users'),
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms'),
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  ])
  .then(responses => Promise.all(responses.map(response => response.json())))
  .then(([usersData, roomsData, bookingsData]) => createHotelData(usersData, roomsData, bookingsData))
  .catch(err => console.error(err))
};

function postBookingData(booking) {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(booking)
  })
  .then(response => console.log(response.status))
  .then(response => window.alert(`Room ${booking.roomNumber} Booked`))
  .catch(err => console.error(err))
};

function deleteData(booking) {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(booking)
  })
  .then(response => console.log(response.status))
  .catch(err => console.error(err))
};
