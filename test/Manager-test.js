import { expect } from 'chai';
import Manager from '../src/Manager';
import User from '../src/User';

describe('Manager', function() {
  let manager1;
  beforeEach(function() {
      manager1 = new Manager({
        id: 999,
        name: 'Manager'
      })
  });

  it('should be a function', function() {
    expect(Manager).to.be.a('function');
  });

  it('should be an instance of Manager', function() {
    expect(manager1).to.be.an.instanceof(Manager);
  });

  it('should be an instance of User', function() {
    expect(manager1).to.be.an.instanceof(User);
  });

  it('should have an id', function() {
    expect(manager1.id).to.equal(999);
  });

  it('should have a username', function() {
    expect(manager1.name).to.equal('Manager');
  });
})
