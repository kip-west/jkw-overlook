import { expect } from 'chai';
import Booking from '../src/Booking'

describe.only('Booking', function() {
  let booking1;
  beforeEach(function() {
      booking1 = new Booking({
        id: "qwerty12345",
        userID: 9,
        date: "2020/04/22",
        roomNumber: 7,
        roomServiceCharges: []
      })
  });

  it('should be a function', function() {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of booking', function() {
    expect(booking1).to.be.an.instanceof(Booking);
  });

  it('should have an id', function() {
    expect(booking1.id).to.equal('qwerty12345');
  });

  it('should have a userID', function() {
    expect(booking1.userID).to.equal(9);
  });

  it('should have a date', function() {
    expect(booking1.date).to.equal('2020/04/22');
  });

  it('should be assigned to a specific room number', function() {
    expect(booking1.roomNumber).to.equal(7);
  });

  it('should have a list of room service charges', function() {
    expect(booking1.roomServiceCharges).to.deep.equal([]);
  });
})
