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
        global.document = {};
        chai.spy.on(document, ['getElementById'], () => {
          return {
            value: 'customer52'
          }
        });

        expect(domUpdates.displayLoginError()).to.equal('Invalid credentials!');
      });

      it('should be able to return an error message for an invalid password', function() {
        global.document = {};
        chai.spy.on(document, ['getElementById'], () => {
          return {
            value: 'overloko2020'
          }
        })

        expect(domUpdates.displayLoginError()).to.equal('Invalid credentials!');
      });
    })
  })

  describe.only('Update Customer Dashboard', function() {
    it('should be able to create list items for a customers bookings', function() {
      let booking1 = {
        "id": "qwerty12345",
        "userID": 1,
        "date": "2020/04/21",
        "roomNumber": 9,
        "roomServiceCharges": []
      };

      expect(domUpdates.createBookingListItem(booking1)).to.equal('<li>Date: 2020/04/21; Room Number: 9</li>')
    })

    it('should display the users total spent for all bookings', function() {
      global.document = {};
      chai.spy.on(document, ['getElementById'], () => {
        return {
          innerText: ''
        }
      })
      domUpdates.displayTotalSpent();

      expect(document.getElementById).to.have.been.called(1);
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
