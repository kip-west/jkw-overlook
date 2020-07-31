import { expect } from 'chai';
import BookingsData from '../src/BookingsData';
import bookingData from './test-data/bookingData'

describe.only('Bookings Data', function() {
  let bookingsData;
  beforeEach(function() {
    bookingsData = new BookingsData(bookingData);
  });

  it('should be a function', function() {
    expect(BookingsData).to.be.a('function');
  });

  it('should be an instance of Bookings Data', function() {
    expect(bookingsData).to.be.an.instanceof(BookingsData);
  });

  it('should have a list of bookings', function() {
    expect(bookingsData.bookings).to.be.an('array');
    expect(bookingsData.bookings).to.deep.equal(bookingsData.bookings);
  })
})
