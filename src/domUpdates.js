import Moment from 'moment';
Moment().format('YYYYMMDD');

const domUpdates = {
  usersData: null,
  roomsData: null,
  bookingsData: null,
  currentUser: null,
  today: '2020/02/10',

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

  createRoomNumbersArray(bookings) {
    return bookings.reduce((roomNumbers, booking) => {
      roomNumbers.push(booking.roomNumber);
      return roomNumbers;
    }, [])
  },

  displayTotalSpent(roomNumbers) {
    let totalSpentField = document.getElementById('user-total-spent');
    let currentUserTotal = this.roomsData.calculateTotalSpent(roomNumbers);
    totalSpentField.innerText = `$${currentUserTotal.toFixed(2)}`;
  },

  sortCurrentCustomerBookings() {
    console.log(this.currentUser.bookings)
    let sortedBookings = this.currentUser.bookings.sort((a, b) => new Moment(a.date).format('YYYYMMDD') - new Moment(b.date).format('YYYYMMDD'));
    this.currentUser.bookings = sortedBookings;
  },

  separateCurrentBookings() {
    let separatedBookings = this.currentUser.bookings.reduce((separatedBookingsAcc, booking) => {
      if (booking.date > this.today) {
        separatedBookingsAcc.upcomingBookings.push(booking)
      } else if (booking.date < this.today) {
        separatedBookingsAcc.pastBookings.push(booking)
      }
      return separatedBookingsAcc
    }, { pastBookings: [], upcomingBookings: [] })
    return separatedBookings;
  },

  createBookingListItem(booking) {
    return `<li>Date: ${booking.date}; Room Number: ${booking.roomNumber}</li>`
  },

  displayBookingData() {
    this.sortCurrentCustomerBookings();
    let separatedBookings = this.separateCurrentBookings();
    let upcomingReservationsList = document.getElementById('upcoming-bookings');
    separatedBookings.upcomingBookings.map(booking => {
      return upcomingReservationsList.insertAdjacentHTML('afterbegin', this.createBookingListItem(booking))
    })

    let pastReservationsList = document.getElementById('past-bookings');
    separatedBookings.pastBookings.map(booking => {
      return pastReservationsList.insertAdjacentHTML('afterbegin', this.createBookingListItem(booking))
    })
  },

  findVacantRooms(date) {
    let bookedRooms = this.bookingsData.findBookingsByDate(date);
    let bookedRoomNumbers = bookedRooms.reduce((roomNumbers, booking) => {
      roomNumbers.push(booking.roomNumber);
      return roomNumbers
    }, [])

    let vacantRooms = this.roomsData.rooms.filter(room => {
      if(!bookedRoomNumbers.includes(room.number)) {
        return room
      }
    });

    return vacantRooms;
  },

  createVacantRoomCards(rooms) {
    let roomCardHTML = rooms.map(room => {
      return `<div class="vacant-room-card" id=${room.number}>
      <h3><span id="room-card-roomType">${room.roomType}</span></h3>
      <hr>
      <p>Bidet: <span id="room-card-bidet">${room.bidet}</span></p>
      <p>Bed Size: <span id="room-card-bedSize">${room.bedSize}<span></p>
      <p>Number of Beds: <span id="room-card-numBeds">${room.numBeds}</span></p>
      <hr>
      <div>
      <h3><span id="room-card-costPerNight">${room.costPerNight}</span> per night</h3>
      <button class="book-room" id=${room.number}>Book Room</button>
      </div>
      </div>`;
    });
    roomCardHTML = roomCardHTML.join('');
    return roomCardHTML;
  },

  displayVacantRoomsDate() {
    let selectDateInput = new Moment(document.getElementById('select-date').value).format('YYYY/MM/DD');

    let vacantRooms = this.findVacantRooms(selectDateInput);
    let searchRoomsResults = document.querySelector('.searchRoom-results');
    searchRoomsResults.insertAdjacentHTML('afterbegin', this.createVacantRoomCards(vacantRooms));
  },

  displayVacantRoomsType() {
    let selectDateInput = new Moment(document.getElementById('select-date').value).format('YYYY/MM/DD');
    let roomTypeInput = document.getElementById('select-roomType').value.toLowerCase();

    let vacantRooms = this.findVacantRooms(selectDateInput);
    let vacantRoomsByType = this.roomsData.findRoomByType(roomTypeInput);

    let searchRoomsResults = document.querySelector('.searchRoom-results');
    searchRoomsResults.insertAdjacentHTML('afterbegin', this.createVacantRoomCards(vacantRoomsByType));
  },

  checkManagerLogin() {
    let usernameInput = document.getElementById('username-input');
    return (usernameInput.value === 'manager')
  },

  displayTotalRevenue() {
    let totalRevenueField = document.getElementById('today-revenue');
    let todaysBookings = this.bookingsData.findBookingsByDate(this.today);
    let todaysRoomNumbers = this.createRoomNumbersArray(todaysBookings)
    let totalRevenue =  this.roomsData.calculateTotalSpent(todaysRoomNumbers);
    totalRevenueField.innerText = `$${totalRevenue.toFixed(2)}`;
  },

  displayVacancyData() {
    let numberRoomsVacantField = document.getElementById('number-rooms-vacant');
    let todaysVacantRooms = this.findVacantRooms(this.today);
    let numRoomsVacant = todaysVacantRooms.length;
    numberRoomsVacantField.innerText = numRoomsVacant;

    let percentRoomsVacantField = document.getElementById('percent-rooms-vacant');
    let percentRoomsVacant = `${((numRoomsVacant / this.roomsData.rooms.length) * 100)}%`;
    percentRoomsVacantField.innerText = percentRoomsVacant;
  },

  createUserListOptions() {
    let userDataList = document.getElementById('users-dropdown');
    let allUsers = this.usersData.users;
    let alphabetizedUsers = allUsers.sort((a, b) => a.name > b.name ? 1 : -1)
    let allUsersHTML = alphabetizedUsers.map(user => `<option id="${user.id}">${user.name}</option>`).join('');

    userDataList.insertAdjacentHTML('afterbegin', allUsersHTML);
  },

  displayUserProfileCard() {
    let userCard = document.querySelector('.user-card');
    userCard.classList.remove('hidden');
  },

  clearUserProfileCard() {
    let userCard = document.querySelector('.user-card');
    userCard.classList.add('hidden');

    let profileCardHeader = document.getElementById('user-profile-name');
    profileCardHeader.innerHTML = '';

    let profileListOfBookings = document.getElementById('list-of-bookings');
    profileListOfBookings.innerHTML = '';
  },

  createBookingsHTMLManagerDash(booking) {
    let foundRoom = this.roomsData.rooms.find(room => room.number === booking.roomNumber);
    let bookingHTML = `
      <li class="booking-list-item" id="${booking.id}">
        ${booking.date}; ${foundRoom.roomType}
        <button class="deleteBooking" id="${booking.id}">Delete</button>
      </li>`;
    console.log(bookingHTML)
    return bookingHTML;
  },

  createUserProfileCard() {
    let selectedUserName = document.getElementById('select-user-by-name').value;
    let foundUser = this.usersData.findUserByName(selectedUserName);
    console.log(foundUser)

    let profileCardHeader = document.getElementById('user-profile-name');
    profileCardHeader.insertAdjacentHTML('afterbegin', foundUser.name)

    let profileListOfBookings = document.getElementById('list-of-bookings');
    let selectedUsersBookings = this.bookingsData.findBookingsByUser(foundUser.id);
    console.log(selectedUsersBookings)
    selectedUsersBookings.map(booking => {
      let bookingHTML = this.createBookingsHTMLManagerDash(booking);
      profileListOfBookings.insertAdjacentHTML('afterbegin', bookingHTML)
    })
  }
}

export default domUpdates;
