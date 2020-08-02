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
})
