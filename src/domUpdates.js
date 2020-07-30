const domUpdates = {
  hideAll() {
    let loginDashboard = document.querySelector('.login-dashboard');
    let customerDashboard = document.querySelector('.customer-dashboard');
    let managerDashboard = document.querySelector('.manager-dashboard');
    let allDashboards = [loginDashboard, customerDashboard, managerDashboard];
    console.log(allDashboards)

    allDashboards.map(dashboard => dashboard.classList.add('hidden'));
  },
}

export default domUpdates;
