const domUpdates = {
  hideAll() {
    let dashboards = document.querySelectorAll('.dashboard');
    dashboards.forEach(dashboard => dashboard.classList.add('hidden'))
  },

  showCustomerDashboard() {
    let customerDashboard = document.querySelector('.customer-dashboard');
    customerDashboard.classList.remove('hidden');
  },

  showManagerDashboard() {
    let managerDashboard = document.querySelector('.manager-dashboard');
    managerDashboard.classList.remove('hidden');
  },

  showLoginDashboard() {
    let loginDashboard = document.querySelector('.login-dashboard');
    loginDashboard.classList.remove('hidden');
  },

  checkPassword() {
    let passwordInput = document.getElementById('password-input');

    if(passwordInput.value === 'overlook2020') {
      return true
    } else {
      this.displayPasswordError()
    }
  },

  displayUsernameError() {
    return 'Username not recognized; please try again!'
  },

  displayPasswordError() {
    return 'Password not recognized; please try again!'
  },

  checkID(id) {
    return (id >= 0 && id <= 50)
  },

  inspectUsernameInput(username) {
    let splitUsername = username.split(/([0-9]+)/)
    let root = splitUsername[0];
    let id = splitUsername[1];

    if (root === 'customer' && this.checkID(id)) {
      this.showCustomerDashboard();
    } else {
      this.displayUsernameError();
    }
  },

  checkUsername() {
    let usernameInput = document.getElementById('username-input');

    if(usernameInput.value === 'manager') {
      this.showManagerDashboard();
    } else {
      this.inspectUsernameInput(usernameInput.value);
    }
  },
}

export default domUpdates;
