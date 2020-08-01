class BookingsData {
  constructor(bookingData) {
    this.bookings = bookingData.bookings;
  }

  findBookingsByDate(date) {
    let foundBookings = this.bookings.filter(booking => booking.date === date);
    return foundBookings;
  }

  findBookingsByUser(userID) {
    let foundBookings = this.bookings.filter(booking => booking.userID === userID);
    return foundBookings;
  }
}

export default BookingsData
