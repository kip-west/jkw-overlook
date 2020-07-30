import { expect } from 'chai';

import User from '../src/User'

describe.only('User', function() {
  let user1, user2;

  beforeEach(function() {
    user1 = new User({
      id: 1,
      name: 'Belinda Jenkins'
    })
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
    expect(user1.name).to.equal('Belinda Jenkins')
  })
})
