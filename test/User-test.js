import { expect } from 'chai';

import User from '../src/User'

describe.only('User', function() {
  it('should be a function', function() {
    expect(User).to.be.a('function');
  })
})
