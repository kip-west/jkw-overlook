// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import domUpdates from '../src/domUpdates';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';

const loginSubmitButton = document.getElementById("submit-login");

loginSubmitButton.addEventListener("click", checkLoginSubmission);

function checkLoginSubmission() {
  event.preventDefault();
  console.log(document.querySelector('.manager-dashboard'));
}
