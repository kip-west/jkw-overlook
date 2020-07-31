import { expect } from 'chai';
import Booking from '../src/Booking'

describe.only('Booking', function() {
  it('should be a function', function() {
    expect(Booking).to.be.a('function');
  })
})
