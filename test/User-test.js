import { expect } from 'chai';

import User from '../src/User'

describe('User', function() {
  let user1, user2, bookings, rooms;

  beforeEach(function() {
    user1 = new User({
      id: 1,
      name: 'Belinda Jenkins'
    });
    bookings = [
      {
        id: "123456789",
        userId: 1,
        date: "2020/04/01",
        roomNumber: 1,
        roomServiceCharges: []
      },
      {
        id: "192837465",
        userId: 2,
        date: "2020/04/01",
        roomNumber: 3,
        roomServiceCharges: []
      },
      {
        id: "987654321",
        userId: 1,
        date: "2020/04/02",
        roomNumber: 2,
        roomServiceCharges: []
      },
      {
        id: "192837465",
        userId: 2,
        date: "2020/04/03",
        roomNumber: 3,
        roomServiceCharges: []
      },
      {
        id: "192837465",
        userId: 1,
        date: "2020/04/03",
        roomNumber: 1,
        roomServiceCharges: []
      }
    ];
    let rooms = [
      {
        "number": 1,
        "roomType": "residential suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 358.4
      },
      {
        "number": 2,
        "roomType": "suite",
        "bidet": false,
        "bedSize": "full",
        "numBeds": 2,
        "costPerNight": 477.38
      },
      {
        "number": 3,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "king",
        "numBeds": 1,
        "costPerNight": 491.14
      }
    ];
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
    expect(user1.name).to.equal('Belinda Jenkins')
  })

  it('should be able to validate login info', function() {
    expect(user1.validateLogin({
      username: 'customer1',
      password: 'overlook2020'
    })).to.equal(true)
  })

  it('should have an array of it\'s own bookings once the user logs in', function() {
    user1.findBookingHistory(bookings)
    expect(user1.bookings).to.deep.equal([
      {
        id: "123456789",
        userId: 1,
        date: "2020/04/01",
        roomNumber: 1,
        roomServiceCharges: []
      },
      {
        id: "987654321",
        userId: 1,
        date: "2020/04/02",
        roomNumber: 2,
        roomServiceCharges: []
      },
      {
        id: "192837465",
        userId: 1,
        date: "2020/04/03",
        roomNumber: 1,
        roomServiceCharges: []
      }
    ])
  })

  it('should be able to return a list of available rooms for a given date', function() {
    expect(user1.findRooms("2020/04/03", rooms, bookings)).to.deep.equal([
      {
        id: "192837465",
        userId: 1,
        date: "2020/04/03",
        roomNumber: 1,
        roomServiceCharges: []
      }
    ])
  })
})
