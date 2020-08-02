const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
import domUpdates from '../src/domUpdates';
chai.use(spies);

describe('domUpdates', function() {
  describe.only('Check Login Methods', function() {
    describe('Check Password', function() {
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

    describe('Check Username', function() {
      beforeEach(function() {
        global.document = {};
        chai.spy.on(document, ['getElementById'], () => {
          return {
            value: 'customer35'
          }
        })
      });

      it('should be able to check a customer login', function() {
        expect(domUpdates.checkCustomerLogin()).to.deep.equal({
          isValid: true,
          createCustomer: 35
        });
      })

      it('should spy on the checkUsername field', function() {
        domUpdates.checkCustomerLogin();

        expect(document.getElementById).to.have.been.called(1)
      })
    });

    describe('Display Login Error Messages', function() {
      it('should be able to return an error message for an invalid username', function() {
        expect(domUpdates.displayUsernameError()).to.equal('Username not recognized; please try again!');
      });

      it('should be able to return an error message for an invalid password', function() {
        expect(domUpdates.displayPasswordError()).to.equal('Password not recognized; please try again!');
      });
    })
  })

  // describe('Change View Methods', function() {
  //   beforeEach(() => {
  //     global.document = {};
  //     chai.spy.on(document, ['querySelectorAll'], () => {
  //       return {
  //         dashboards: [],
  //       }
  //     });
  //   });
  //
  //   it('should spy on domUpdates.hideAll', function() {
  //     domUpdates.hideAll();
  //
  //     expect(document.querySelectorAll).to.have.been.called(1);
  //   });
  //
  //   it('should spy on showCustomerDashboard', function() {
  //     domUpdates.showCustomerDashboard();
  //
  //     expect(document.querySelector).to.have.been.called(1);
  //   });
  //
  //   it('should spy on showManagerDashboard', function() {
  //     domUpdates.showManagerDashboard();
  //
  //     expect(document.querySelector).to.have.been.called(1);
  //   });
  //
  //   it('should spy on showLoginDashboard', function() {
  //     domUpdates.showLoginDashboard();
  //
  //     expect(document.querySelector).to.have.been.called(1);
  //   });
  // })
});
