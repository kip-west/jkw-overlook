class BookingsData {
  constructor(bookingData) {
    this.bookings = bookingData.bookings;
  }

  findBookingByDate(date) {
    return this.bookings.filter(booking => booking.date === date)
  }
}

export default BookingsData
