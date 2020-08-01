const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
import domUpdates from '../src/domUpdates';
chai.use(spies);

describe('domUpdates', function() {
  describe.only('Check Login Methods', function() {
    describe.only('Check Password', function() {
      beforeEach(function() {
        global.document = {};
        chai.spy.on(document, ['getElementById'], () => {
          return {
            value: 'overlook2020'
          }
        });
      });

      it('should check the password input field', function() {
        expect(domUpdates.checkPassword()).to.equal(true);
      });

      it('should spy on the checkPassword field', function() {
        domUpdates.checkPassword();

        expect(document.getElementById).to.have.been.called(1)
      });
    })

    // describe.only('Check Username', function() {
    //   it('should spy on the checkUsername field', function() {
    //     global.document = {};
    //     global.clas
    //     chai.spy.on(document, ['getElementById', 'querySelector'], () => {
    //       return {
    //         classList: [],
    //         value: 'manager'
    //       }
    //     });
    //
    //     domUpdates.checkUsername();
    //
    //     expect(domUpdates.showManagerDashboard).to.have.been.called(1)
    //   })
    // })
  })
});
