# The Overlook
This project represents the solo work of Jake West (FE 2005)

## Abstract
The Overlook is a web application designed to simulate a hotel booking website. Both Customers and The Overlook Manager can sign in & view a variety of data about thier bookings/expenses. In addition, Customers have the ability to book a new room & Managers can both book & delete reservations for any customer.

## Installation Instructions
1. Clone down the repo at: https://github.com/jkwest-93/jkw-overlook, you can use an optional argument when you run `git clone` (you replace the `[...]` with the terminal command arguments): `git@github.com:jkwest-93/jkw-overlook.git [what you want to name the repo]`
1. Then install the library dependencies. Switch into your new directory & run: `npm install` in the terminal.
1. To verify that it is setup correctly, run `npm start` in your terminal. Go to `http://localhost:8080/` in the browser to visit the deployed application.

## Project in Action
* On page load, all users are taken to the Login Dashboard. Here, both users and manager can enter their ID and login.
![](src/images/jkw-customer-login)
![](src/images/jkw-manager-login)

* When a Customer logs in, they are taken to their dashboard. Here, they can see how much money they've spent with The Overlook, as well as any upcoming or past reservations. A customer also has the ability to book a new room, based on specific date and room type criteria.
![](src/images/jkw-customer-bookRoom)

* When a Manager logs in, they are taken to their dashboard. Here, they can see The Overlook's total revenue today, how many rooms are booked, as well as the percentage of rooms booked. Managers are also able to select from existing users to view a customer profile, providing stats & upcoming bookings for this customer. From this profile, Managers are able to book new rooms and delete upcoming bookings for customers.
![](src/images/manager-addBooking.gif)
![](src/images/manager-deleteBooking.gif)

* When any user is done with the site, they can `Log Out`- allowing another user on!
![](src/images/jkw-logout.gif)

## Contributors
* Jake West: https://github.com/jkwest-93
