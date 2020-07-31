import { expect } from 'chai'
import roomsData from './test-data/roomsData'
import RoomsData from '../src/RoomsData'

describe.only('RoomsData', function() {
  let roomsData1;
  beforeEach(function() {
    roomsData1 = new RoomsData(roomsData)
  });

  it('should be a function', function() {
    expect(RoomsData).to.be.a('function');
  });

  it('should be an instance of RoomsData', function() {
    expect(roomsData1).to.be.an.instanceof(RoomsData);
  });

  it('should have a list of rooms', function() {
    expect(roomsData1.rooms).to.deep.equal(roomsData.rooms)
  });
})
