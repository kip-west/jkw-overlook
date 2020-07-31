import { expect } from 'chai';
import Room from '../src/Room';

describe.only('Room', function() {
  let room1, room2, room3;
  beforeEach(function() {
    room1 = new Room ({
      "number": 1,
      "roomType": "residential suite",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 358.4
    });
    room2 = new Room({
      "number": 2,
      "roomType": "suite",
      "bidet": false,
      "bedSize": "full",
      "numBeds": 2,
      "costPerNight": 477.38
    });
    room3 = ({
      "number": 3,
      "roomType": "single room",
      "bidet": false,
      "bedSize": "king",
      "numBeds": 1,
      "costPerNight": 491.14
    });
  });

  it('should be a function', function() {
    expect(Room).to.be.a('function');
  });

  it('should be an instance of Room', function() {
    expect(room1).to.be.an.instanceof(Room);
  });

  it('should have a room number', function() {
    expect(room1.number).to.equal(1);
  });

  it('should have a type', function() {
    expect(room3.roomType).to.equal('single room');
  });

  it('may or may not have a bidet', function() {
    expect(room1.bidet).to.equal(true);
    expect(room2.bidet).to.equal(false);
  });

  it('should have a bed size', function() {
    expect(room2.bedSize).to.equal('full');
  });

  it('should have a number of beds', function() {
    expect(room3.numBeds).to.equal(1);
  });

  it('should have a cost per night', function() {
    expect(room3.costPerNight).to.equal(491.14)
  })
})
