import { expect } from 'chai';
import Customer from '../src/Customer'
import User from '../src/User'

describe('Customer', function() {
  let customer1;

  beforeEach(function() {
    customer1 = new Customer({
      id: 1,
      name: 'Belinda Jenkins'
    });
  });

  it('should be a function', function() {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of Customer', function() {
    expect(customer1).to.be.an.instanceof(Customer);
  });

  it('should be an instance of User', function() {
    expect(customer1).to.be.an.instanceof(User);
  });

  it('should have an id', function() {
    expect(customer1.id).to.equal(1);
  });

  it('should have a name', function() {
    expect(customer1.name).to.equal('Belinda Jenkins');
  });
})
