const domUpdates = {
  loginDashboard: document.querySelector('.login-dashboard'),
  customerDashboard: document.querySelector('.customer-dashboard'),
  managerDashboard: document.querySelector('.manager-dashboard'),

  hideAll() {
    const allDashboards = [this.loginDashboard, this.customerDashboard, this.managerDashboard];
    allDashboards.map(dashboard => dashboard.classList.add('hidden'));
  },

  validateLogin() {

  }
}

module.export = domUpdates
