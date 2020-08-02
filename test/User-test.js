import { expect } from 'chai';

import User from '../src/User';
import BookingData from '../src/BookingsData';
import RoomsData from '../src/RoomsData';
import customerData from './test-data/customerData';
import bookingData from './test-data/bookingData';
import roomsData from './test-data/roomsData';

describe.only('User', function() {
  let user1, user2, bookings, rooms;

  beforeEach(function() {
    user1 = new User(customerData.users[0]);
    bookings = new BookingData(bookingData);
    rooms = new RoomsData(roomsData);

  })
  it('should be a function', function() {
    expect(User).to.be.a('function');
  })

  it('should be an instance of User', function() {
    expect(user1).to.be.an.instanceof(User)
  })

  it('should have an id', function() {
    expect(user1.id).to.equal(1)
  })

  it('should have a name', function() {
    expect(user1.name).to.equal('Wendy Torrance')
  })

  it('should be able to validate login info', function() {
    expect(user1.validateLogin({
      username: 'customer1',
      password: 'overlook2020'
    })).to.equal(true)
  })

  it('should be able to retrieve a list of it\'s own bookings', function() {
    user1.findBookingHistory(bookings.bookings)
    expect(user1.bookings).to.deep.equal([
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

  // it('should be able to calculate the total spent on its bookings (given a list of rooms)', function() {
  //   user1.findBookingHistory(bookings.bookings);
  //
  //   expect(user1.calculateTotalSpent(rooms.rooms)).to.equal(954.76);
  // })
})
