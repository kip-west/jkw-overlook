class RoomsData {
  constructor(roomsData) {
    this.rooms = roomsData.rooms;
  }

  findRoomByType(roomType) {
    return this.rooms.filter(room => room.roomType === roomType);
  }
}

export default RoomsData
