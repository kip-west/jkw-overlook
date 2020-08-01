class CustomerData {
  constructor(userData) {
    this.users = userData.users;
  }

  findUserByName(name) {
    let foundUser = this.users.find(user => user.name === name);

    return foundUser;
  }
}

export default CustomerData
