class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name
  }

  validateLogin(loginInfo) {
    return (loginInfo.username === `customer${this.id}` && loginInfo.password === "overlook2020")
  }

  findBookingHistory(bookings) {
    this.bookings = bookings.filter(booking => booking.userId === this.id)
  }

  findRooms(date, rooms, bookings) {
    //Filter bookings for room numbers that !date; return rooms that match the room numbers.
    let filteredBookings = bookings.filter(booking => booking.date === date);
    return filteredBookings
    // let occupiedRooms = rooms.reduce((room))
    // let vacantRooms = rooms.filter(room => {
    //
    // })
    // })
    // rooms.reduce(room => )
  }
}

export default User
