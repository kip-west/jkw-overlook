import Moment from 'moment';

const domUpdates = {
  usersData: null,
  roomsData: null,
  bookingsData: null,
  currentUser: null,
  today: /*new Date()*/ '2020/01/30',

  hideAll() {
    let dashboards = document.querySelectorAll('.dashboard');
    dashboards.forEach(dashboard => dashboard.classList.add('hidden'))
  },

  showCustomerDashboard() {
    this.hideAll();

    let customerDashboard = document.querySelector('.customer-dashboard');
    customerDashboard.classList.remove('hidden');
  },

  showManagerDashboard() {
    this.hideAll();

    let managerDashboard = document.querySelector('.manager-dashboard');
    managerDashboard.classList.remove('hidden');
  },

  showLoginDashboard() {
    this.hideAll();

    let loginDashboard = document.querySelector('.login-dashboard');
    loginDashboard.classList.remove('hidden');
  },

  checkPassword() {
    let passwordInput = document.getElementById('password-input');
    return(passwordInput.value === 'overlook2020');
  },

  displayLoginError() {
    //Eventually, turn this into a method that prints this message in the space beneath Login & Username -jkw 8/1/20 @ 6:10 PM
    if(!this.checkCustomerLogin().isValid || !this.checkPassword()) {
      return 'Invalid credentials!'
    }
  },

  checkID(id) {
    return (id >= 0 && id <= 50)
  },

  checkCustomerLogin() {
    let usernameInput = document.getElementById('username-input').value;

    let splitUsername = usernameInput.split(/([0-9]+)/)
    let root = splitUsername[0];
    let id = splitUsername[1];

    return {
      isValid: (root === 'customer' && this.checkID(id)),
      createCustomer: parseInt(id)
    }
  },

  retrieveCurrentCustomerBookings() {
    let currentUserBookings = this.bookingsData.findBookingsByUser(this.currentUser.id);
    this.currentUser.bookings = currentUserBookings;
  },

  sortCurrentCustomerBookings() {
    let sortedBookings = this.currentUser.bookings.sort((a, b) => new Moment(a).format('YYYMMDD') - new Moment(b).format('YYYMMDD'));
    this.currentUser.bookings = sortedBookings;
    console.log(sortedBookings)
  },

  displayBookingData() {
    let upcomingReservationsField = document.getElementById('upcoming-bookings');
    this.sortCurrentCustomerBookings();
    this.currentUser.bookings.map(booking => {
      return upcomingReservationsField.insertAdjacentHTML('afterbegin', this.createBookingListItem(booking))
    })
  },

  createBookingListItem(booking) {
    return `<li>Date: ${booking.date}; Room Number: ${booking.roomNumber}</li>`
  },

  displayTotalSpent(roomNumbers) {
    let totalSpentField = document.getElementById('user-total-spent');
    let currentUserTotal = this.roomsData.calculateTotalSpent(roomNumbers);
    totalSpentField.innerText = `$${currentUserTotal}`;
  },

  checkManagerLogin() {
    let usernameInput = document.getElementById('username-input');
    return (usernameInput.value === 'manager')
  },
}

export default domUpdates;
