// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import domUpdates from '../src/domUpdates';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';

let hotelData = {
  usersData: null,
  roomsData: null,
  bookingsData: null
}

window.onload = getDataFromServer();

const loginSubmitButton = document.getElementById("submit-login");
loginSubmitButton.addEventListener("click", checkLoginSubmission);

function checkLoginSubmission() {
  event.preventDefault();
  if(domUpdates.checkPassword()) {
    domUpdates.hideAll();
    domUpdates.checkUsername();
  }
}

function createHotelData(usersData, roomsData, bookingsData) {
  hotelData.usersData = usersData;
  hotelData.roomsData = roomsData;
  hotelData.bookingsData = bookingsData;

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
