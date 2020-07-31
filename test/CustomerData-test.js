import { expect } from 'chai';
import customerData from './test-data/customerData'
import CustomerData from '../src/CustomerData'

describe.only('Customer Data', function() {
  let customerData1;
  beforeEach(function() {
    customerData1 = new CustomerData(customerData);
  });
  
  it('should be a function', function() {
    expect(CustomerData).to.be.a('function');
  });

  it('should be an instance of Customer Data', function() {
    expect(customerData1).to.be.an.instanceof(CustomerData);
  });

  it('should have a list of customers', function() {
    expect(customerData1.users).to.deep.equal(customerData.users);
  });
})
