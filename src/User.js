class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name
  }

  validateLogin(loginInfo) {
    return (loginInfo.username === `customer${this.id}` && loginInfo.password === "overlook2020")
  }

  findBookingHistory(bookings) {
    this.bookings = bookings.filter(booking => booking.userID === this.id)
  }
}

export default User
