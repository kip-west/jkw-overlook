import Booking from '../src/Booking'

class BookingsData {
  constructor(bookingData) {
    this.bookings = bookingData.bookings.map(booking => new Booking(booking));
  }

  findBookingsByDate(date) {
    let foundBookings = this.bookings.filter(booking => booking.date === date);
    return foundBookings;
  }

  findBookingsByUser(userID) {
    let foundBookings = this.bookings.filter(booking => booking.userID === userID);
    return foundBookings;
  }

  findBookingByID(bookingID) {
    let foundBooking = this.bookings.find(booking => booking.id === bookingID)

    return foundBooking
  }
}

export default BookingsData
