// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import domUpdates from '../src/domUpdates';
import CustomerData from '../src/CustomerData';
import RoomsData from '../src/RoomsData';
import BookingsData from '../src/BookingsData';
import moment from 'moment';
moment().format();

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';

let today = new Date();

window.onload = getDataFromServer();

const loginSubmitButton = document.getElementById("submit-login");
const searchRoomsButton = document.getElementById("searchRooms-button");
const clearResultsButton = document.getElementById("clear-searchRooms-button");

loginSubmitButton.addEventListener("click", validateLogin);
searchRoomsButton.addEventListener("click", searchRooms);
clearResultsButton.addEventListener("click", clearSearchResults)

function validateUsername() {
  if (domUpdates.checkManagerLogin()) {
    domUpdates.showManagerDashboard();
  } else if (domUpdates.checkCustomerLogin().isValid) {
    //Eventually, instantiate the customer based on their id -jkw 8/1/20 @6:15 PM
    let currentUserID = domUpdates.checkCustomerLogin().createCustomer;
    createCustomer(currentUserID)
    domUpdates.showCustomerDashboard();
  } else {
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

function createHotelData(usersData, roomsData, bookingsData) {
  domUpdates.usersData = new CustomerData(usersData);
  domUpdates.roomsData = new RoomsData(roomsData);
  domUpdates.bookingsData = new BookingsData(bookingsData);
  createCustomer(13);

  //This code creates a dummy user while I set up Customer Dashboard with real data.
  updateCustomerDisplay();
}

function updateCustomerDisplay() {
  domUpdates.retrieveCurrentCustomerBookings();
  domUpdates.displayBookingData();
  domUpdates.displayTotalSpent([1]);
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

function addListenersBookRoom() {
  let bookRoomButtons = document.querySelectorAll('.book-room');
  for (let i = 0; i < bookRoomButtons.length; i++) {
    bookRoomButtons[i].addEventListener('click', bookRoomClickHandler);
  }
}

function bookRoomClickHandler(event) {
  let selectDateInput = document.getElementById('select-date').value;
  let postBody = {
    'userID': domUpdates.currentUser.id,
    'date': selectDateInput,
    'roomNumber': event.target.id
  }

  return postBody;
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
}

function postBookingData(bookingObject) {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingObject)
  })
  .then(response => console.log(response.status))
  .catch(err => console.error(err))
};
