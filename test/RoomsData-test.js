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

  describe('Find Room By Type', function() {
    it('should be able to return a list of rooms by type', function() {
      expect(roomsData1.findRoomByType('suite')).to.deep.equal([
        {
          number: 2,
          roomType: "suite",
          bidet: false,
          bedSize: "full",
          numBeds: 2,
          costPerNight: 477.38
        },
        {
          number: 15,
          roomType: "suite",
          bidet: true,
          bedSize: "full",
          numBeds: 2,
          costPerNight: 477.38
        }
      ]);
    });

    it('should not find a room if undefined', function() {
      expect(roomsData1.findRoomByType()).to.deep.equal([]);
    });

    it('should not find a room if it\'s anything other than a room type', function() {
      expect(roomsData1.findRoomByType(-47)).to.deep.equal([]);
      expect(roomsData1.findRoomByType(null)).to.deep.equal([]);
    });

    it('should check to make sure that user input is a room type', function() {
      expect(roomsData1.checkRoomType('banana')).to.equal(false);
      expect(roomsData1.checkRoomType('junior suite')).to.equal(true);
    })

    it('should return an error message if there are no rooms available for that type', function() {
      let foundRooms = roomsData1.findRoomByType('junior suite');

      expect(foundRooms.errorMessage).to.equal('Sorry! There are no junior suite rooms available.')
    })

    describe('Calculate Total Spent', function() {
      it('should return a total amount spent for a list of room numbers', function() {
        let roomNumbers = [1, 3, 3, 1, 2];

        expect(roomsData1.calculateTotalSpent(roomNumbers)).to.equal(2176.46)
      })
    })
  });
});
