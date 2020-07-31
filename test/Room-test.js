import { expect } from 'chai';
import Room from '../src/Room';

describe.only('Room', function() {
  it('should be a function', function() {
    expect(Room).to.be.a('function');
  })

  it('should be an instance of Room', function() {
    let room1 = new Room();
    expect(room1).to.be.an.instanceof(Room);
  })
})
