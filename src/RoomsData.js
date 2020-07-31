class RoomsData {
  constructor(roomsData) {
    this.rooms = roomsData.rooms;
  }

  findRoomByType(roomType) {
    let foundRooms = this.rooms.filter(room => room.roomType === roomType);

    if (foundRooms.length > 0) {
      return foundRooms
    }
    if (this.checkRoomType(roomType)) {
      let errorMessage = {
        errorMessage: `Sorry! There are no ${roomType} rooms available.`
      }
      return errorMessage
    }
    else {
      return []
    }
  }

  checkRoomType(roomType) {
    const roomTypes = ['residential suite', 'suite', 'single room', 'junior suite']

    return roomTypes.includes(roomType)
  }
}

export default RoomsData
