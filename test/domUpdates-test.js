const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
import domUpdates from '../src/domUpdates';
chai.use(spies);

describe('domUpdates', function() {
  beforeEach(() => {
    global.document = {};
    chai.spy.on(document, ['getElementById', 'querySelector'])
  });

  describe('Change View Methods', function() {
    it('should spy on domUpdates.hideAll', function() {
      domUpdates.hideAll();

      expect(document.querySelector).to.have.been.called(3)
    })
  })
});
