// Registration functionality
document.getElementById('registrationForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get the registration input values
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // Store the registration details in localStorage
    localStorage.setItem('registeredName', name);
    localStorage.setItem('registeredEmail', email);
    localStorage.setItem('registeredPassword', password);

    // Show success message and redirect to login
    alert('Registration successful! You can now log in.');
    window.location.href = 'login.html'; // Redirect to login page
});

// Login functionality
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get the login input values
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // Retrieve the stored registration details from localStorage
    const registeredEmail = localStorage.getItem('registeredEmail');
    const registeredPassword = localStorage.getItem('registeredPassword');

    // Check if the user is registered
    if (loginEmail === registeredEmail) {
        // Check if the password matches
        if (loginPassword === registeredPassword) {
            alert('Login successful!');
            window.location.href = 'doctors.html'; // Redirect to doctors page
        } else {
            alert('Incorrect password. Please try again.');
        }
    } else {
        alert('Email not registered. Please register first.');
    }
});



document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get the form values
    const name = document.querySelector('input[name="name"]').value;
    const selectedDate = document.querySelector('input[name="date"]').value;
    const selectedTimeSlot = document.querySelector('select[name="timeSlot"]').value; // Get the selected time slot
    const doctor = document.querySelector('select[name="doctor"]').value;

    // Check if the selected date is in the future
    const currentDate = new Date();
    const appointmentDate = new Date(selectedDate);
    currentDate.setHours(0, 0, 0, 0); // Set time to 0 for date-only comparison

    if (appointmentDate < currentDate) {
        alert('The appointment date must be in the future. Please select a valid date.');
        return;
    }

    // Confirm the appointment with the user
    const confirmationMessage = `Are you sure you want to book an appointment with ${doctor} on ${appointmentDate.toDateString()} at ${selectedTimeSlot}?`;
    if (!confirm(confirmationMessage)) {
        return; // Cancel the form submission if not confirmed
    }

    // Store the appointment details in sessionStorage
    sessionStorage.setItem('appointmentDetails', JSON.stringify({
        name: name,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        doctor: doctor
    }));

    // Redirect to the confirmation page with URL parameters
    const confirmationURL = `confirmation.html?name=${encodeURIComponent(name)}&date=${encodeURIComponent(selectedDate)}&timeSlot=${encodeURIComponent(selectedTimeSlot)}&doctor=${encodeURIComponent(doctor)}`;
    window.location.href = confirmationURL;
});

// Check for stored appointment details and display confirmation message
const appointmentDetails = JSON.parse(sessionStorage.getItem('appointmentDetails'));
if (appointmentDetails) {
    const message = `Thank you, ${appointmentDetails.name}! Your appointment with ${appointmentDetails.doctor} is confirmed for ${appointmentDetails.date} at ${appointmentDetails.timeSlot}.`;
    document.getElementById('confirmationMessage').textContent = message;

    // Clear the appointment details from sessionStorage after showing
    sessionStorage.removeItem('appointmentDetails');
}


