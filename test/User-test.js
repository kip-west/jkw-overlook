import { expect } from 'chai';

import User from '../src/User';
import customerData from './test-data/customerData';

describe('User', function() {
  let user1;

  beforeEach(function() {
    user1 = new User(customerData.users[0]);

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
    expect(user1.name).to.equal('Wendy Torrance')
  })
})
