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
    return (passwordInput.value === 'overlook2020')
  },

  checkUsername() {
    let usernameInput = document.getElementById('username-input');

    if(usernameInput.value === 'manager') {
      this.showManagerDashboard();
    }

    if(userName.input.value === 'customer') {
      this.showCustomerDashboard();
    }
  }
}

export default domUpdates;
