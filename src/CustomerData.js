import Customer from '../src/Customer'

class CustomerData {
  constructor(userData) {
    this.users = userData.users.map(user => new Customer(user));
  }

  findUserByName(name) {
    let foundUser = this.users.find(user => user.name === name);
    return foundUser;
  }

  findUserByID(id) {
    let foundUser = this.users.find(user => user.id === parseInt(id));
    return foundUser;
  }
}

export default CustomerData
