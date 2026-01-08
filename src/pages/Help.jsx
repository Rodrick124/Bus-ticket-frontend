import React from 'react';
import FAQ from '../components/FAQ';

const Help = () => {
  return (
    <div className="container max-w-7xl mx-auto p-8 dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10 text-primary">Help Center</h1>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-secondary">For Visitors (Booking Bus Tickets)</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-medium mb-3 text-primary">1. Creating Your Account</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Click on the "Sign Up" button in the navigation bar.</li>
              <li>Fill in your personal details: Name, Email, Password.</li>
              <li>Ensure your password is strong (mix of uppercase, lowercase, numbers, and symbols).</li>
              <li>Click "Register" to create your account. You'll be automatically logged in.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-medium mb-3 text-primary">2. Searching for Buses</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>From the Home page, enter your "Departure Location" and "Arrival Location".</li>
              <li>Select your "Travel Date" using the calendar.</li>
              <li>Click "Search Buses" to view available routes.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-medium mb-3 text-primary">3. Booking Your Ticket</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Browse the search results and select a bus that fits your schedule.</li>
              <li>Click "View Seats" to choose your preferred seat(s) on the bus.</li>
              <li>Proceed to the "Passenger Info" page to enter details for each passenger.</li>
              <li>Review your "Booking Summary" to ensure all details are correct.</li>
              <li>Complete the "Payment" process using your preferred method.</li>
              <li>Once payment is successful, you will receive a confirmation email with your e-ticket.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-medium mb-3 text-primary">4. Managing Your Bookings</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Log in to your account.</li>
              <li>Navigate to your "My Bookings" section (if available) to view past and upcoming trips.</li>
              <li>You may be able to cancel or modify bookings depending on the bus operator's policies.</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 text-secondary">For Bus Operators (Listing and Managing Routes)</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-medium mb-3 text-primary">1. Creating Your Operator Account</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Contact our support team to register as a Bus Operator through email or on WhatsApp.</li>
              <li>Provide necessary documentation for verification (e.g., business license, fleet details).</li>
              <li>Once approved, you will receive operator login credentials via email.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-medium mb-3 text-primary">2. Listing Buses and Routes</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Log in to your operator dashboard.</li>
              <li>Use the "Add New Bus" feature to input details like bus type, capacity, and amenities.</li>
              <li>Create new routes by specifying departure/arrival locations, timings, and pricing.</li>
              <li>Ensure all information is accurate and up-to-date to attract passengers.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-medium mb-3 text-primary">3. Managing Bookings and Passengers</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access your "Bookings" section to view all reservations for your buses.</li>
              <li>Monitor seat availability and passenger lists.</li>
              <li>Handle cancellations or modifications as per your company's policies.</li>
              <li>Generate reports on route performance and revenue.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-medium mb-3 text-primary">4. Communicating with Passengers</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Utilize our platform's communication tools (if available) to send updates or alerts to passengers.</li>
              <li>Provide excellent customer service to ensure repeat business.</li>
            </ul>
          </div>
        </div>
      </section>

      <p className="text-center mt-12 text-gray-600 dark:text-gray-400">
        If you have any further questions, please refer to our <a href="/contact" className="text-secondary hover:underline">Contact Us</a> page.
      </p>
      <FAQ />
    </div>
  );
};

export default Help;

