import { expect } from 'chai';

import User from '../src/User'

describe.only('User', function() {
  let user1, user2, bookings;

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
        roomNumber: 1,
        roomServiceCharges: []
      },
      {
        id: "987654321",
        userId: 1,
        date: "2020/04/02",
        roomNumber: 2,
        roomServiceCharges: []
      }
    ]
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
      }
    ])
  })
})
