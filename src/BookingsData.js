class BookingsData {
  constructor(bookingData) {
    this.bookings = bookingData.bookings;
  }

  findBookingByDate(date) {
    let foundBookings = this.bookings.filter(booking => booking.date === date);
    return foundBookings;
  }
}

export default BookingsData
