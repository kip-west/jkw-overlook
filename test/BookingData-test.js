import { expect } from 'chai';
import BookingsData from '../src/BookingsData';
import bookingData from './test-data/bookingData'

describe.only('Bookings Data', function() {
  let bookingsData1;
  beforeEach(function() {
    bookingsData1 = new BookingsData(bookingData);
  });

  it('should be a function', function() {
    expect(BookingsData).to.be.a('function');
  });

  it('should be an instance of Bookings Data', function() {
    expect(bookingsData1).to.be.an.instanceof(BookingsData);
  });

  it('should have a list of bookings', function() {
    expect(bookingsData1.bookings).to.be.an('array');
    expect(bookingsData1.bookings).to.deep.equal(bookingsData1.bookings);
  });

  describe('Find Bookings By Date', function() {
    it('should return a list of bookings for a specific date', function() {
      expect(bookingsData1.findBookingsByDate('2020/04/22')).to.deep.equal([
        {
          id: "qwerty12345",
          userID: 1,
          date: "2020/04/22",
          roomNumber: 15,
          roomServiceCharges: []
        }
        ,
        {
          id: "zxcvb56789",
          userID: 2,
          date: "2020/04/22",
          roomNumber: 13,
          roomServiceCharges: []
        }
      ]);
    });
  })

  describe('Find Bookings By User', function() {
    it('should return a list of bookings for a specific user', function() {
      expect(bookingsData1.findBookingsByUser(1)).to.deep.equal([
        {
          id: "qwerty12345",
          userID: 1,
          date: "2020/04/22",
          roomNumber: 15,
          roomServiceCharges: []
        },
        {
          id: "qwerty56789",
          userID: 1,
          date: "2020/04/23",
          roomNumber: 15,
          roomServiceCharges: []
        }
      ])
    })
  })
})
