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

  calculateTotalSpent(rooms) {
    return this.bookings.reduce((totalSpent, booking) => {
      let foundRoom = rooms.find(room => room.number === booking.roomNumber);
      let foundRoomCost = foundRoom.costPerNight;
      return totalSpent += foundRoomCost
    }, 0)
  }
}

export default User
