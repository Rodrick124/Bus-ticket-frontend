# Bus Ticket Reservation System – Frontend (TranspoHub)

A modern, responsive **Bus Ticket Reservation System frontend** built with **React.js** and **Tailwind CSS**.
This project allows users to search for bus routes, select seats, book tickets, and view booking history through a clean and intuitive user interface.

---

## Table of Contents

* [Project Overview](#-project-overview)
* [Live Preview](#-live-preview)
* [Tech Stack](#-tech-stack)
* [Features](#-features)
* [Application Pages](#-application-pages)
* [Folder Structure](#-folder-structure)
* [Installation & Setup](#-installation--setup)
* [Usage](#-usage)
* [State Management](#-state-management)
* [UI & UX Design](#-ui--ux-design)
* [Dummy Data](#-dummy-data)
* [Future Improvements](#-future-improvements)
* [Contribution](#-contribution)
* [License](#-license)
* [Author](#-author)

---

## Project Overview

The **Bus Ticket Reservation System** is a frontend-only web application designed to simulate a real-world bus booking experience.

Users can:

* Search available bus routes
* View schedules and pricing
* Select seats interactively
* Enter passenger details
* Complete bookings (UI simulation)
* Access booking history via a dashboard

This project focuses on **frontend architecture, UI/UX design, and scalability**, making it ideal for **portfolio presentation** or integration with a backend API in the future.

---

## Live Preview

> Live demo coming soon
> *(You can deploy using Vercel, Netlify, or Render)*

---

## Tech Stack

| Technology                      | Description             |
| ------------------------------- | ----------------------- |
| **React.js**                    | Frontend framework      |
| **Tailwind CSS**                | Utility-first styling   |
| **React Router DOM**            | Client-side routing     |
| **Context API / Redux Toolkit** | State management        |
| **JavaScript (ES6+)**           | Application logic       |
| **Vite / CRA**                  | Development environment |

---

## Features

* Route search (departure, destination, date)
* Bus listing with filters
* Interactive seat selection
* Passenger information form with validation
* Payment page (UI only)
* Booking confirmation page
* User dashboard with booking history
* Fully responsive design
* Reusable UI components
* Fast and optimized performance

---

## Application Pages

### Home Page

* Hero section with route search
* Popular routes display
* Call-to-action buttons

### Search Results Page

* List of available buses
* Filters:

  * Price
  * Departure time
  * Bus type
* View seat availability

### Seat Selection Page

* Interactive seat layout
* Seat status:

  * Available
  * Selected
  * Booked
* Real-time price calculation

### Passenger Details Page

* Input fields:

  * Full name
  * Phone number
  * Email
  * ID number
* Form validation and error handling

### Payment Page

* Payment method selection
* Booking summary
* Confirm booking (UI simulation)

### Booking Confirmation Page

* Booking reference number
* Ticket details
* Download / print ticket option

### User Dashboard

* View booking history
* Booking status (Upcoming / Completed)
* Cancel booking (UI only)

---

## Folder Structure

```
src/
│
├── components/
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Modal.jsx
│   ├── Seat.jsx
│   └── Navbar.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── SearchResults.jsx
│   ├── SeatSelection.jsx
│   ├── PassengerDetails.jsx
│   ├── Payment.jsx
│   ├── Confirmation.jsx
│   └── Dashboard.jsx
│
├── context/
│   └── BookingContext.jsx
│
├── data/
│   ├── buses.js
│   ├── routes.js
│   └── seats.js
│
├── routes/
│   └── AppRoutes.jsx
│
├── styles/
│   └── index.css
│
├── App.jsx
└── main.jsx
```

---

## Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/Rodrick124/Bus-ticket-frontend.git
cd bus-ticket-reservation-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

## Usage

1. Select departure and destination cities
2. Choose a travel date
3. Browse available buses
4. Select seats
5. Enter passenger details
6. Confirm booking
7. View bookings in the dashboard

---

## State Management

The application uses **Context API / Redux Toolkit** to manage:

* Selected route
* Bus details
* Seat selection
* Passenger information
* Booking history

This ensures:

* Centralized state
* Clean component communication
* Scalability for backend integration

---

## UI & UX Design

* Mobile-first responsive design
* Clean typography and spacing
* Hover effects & transitions
* Accessible form inputs
* Consistent color palette
* Reusable UI components

---

## Dummy Data

All data is simulated using **local JSON files**:

* Bus schedules
* Routes
* Seat availability
* Booking records

This allows easy replacement with real API endpoints later.

---

## Future Improvements

* Authentication & user accounts
* Backend API integration
* Real payment gateway (Mobile Money / Stripe)
* Admin dashboard
* Google Maps route visualization
* Dark mode
* Multi-language support

---

## Contribution

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## License

This project is licensed under the **MIT License**.

---

## Author

**Ilufung Rodrick Younyi**
Frontend / Full-Stack Developer
📧 Email: [rodrickilufung@gmail.com]
🌐 Portfolio: 
🐙 GitHub: [https://github.com/Rodrick124]
