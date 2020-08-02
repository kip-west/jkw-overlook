// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import domUpdates from '../src/domUpdates';
import CustomerData from '../src/CustomerData';
import RoomsData from '../src/RoomsData';
import BookingsData from '../src/BookingsData';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';

let today;
let hotelData = {
  usersData: null,
  roomsData: null,
  bookingsData: null,
  currentUser: null
};

window.onload = getDataFromServer();

const loginSubmitButton = document.getElementById("submit-login");
loginSubmitButton.addEventListener("click", validateLogin);

function createCustomer(id) {
  hotelData.currentUser = hotelData.usersData.findUserByID(id);
}

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

function createHotelData(usersData, roomsData, bookingsData) {
  hotelData.usersData = new CustomerData(usersData);
  hotelData.roomsData = new RoomsData(roomsData);
  hotelData.bookingsData = new BookingsData(bookingsData);

  //This code creates a dummy user while I set up Customer Dashboard with real data.
  createCustomer(13);
  console.log(hotelData.currentUser)

  return hotelData;
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
