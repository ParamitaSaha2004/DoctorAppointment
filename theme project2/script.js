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


const today = new Date();
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);  // Set the next week's date
const oneYearLater = new Date(today);
oneYearLater.setFullYear(today.getFullYear() + 1);  // Set the date one year later

// Format the dates in YYYY-MM-DD format for the input
const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

const minDate = formatDate(nextWeek);
const maxDate = formatDate(oneYearLater);

// Set the min and max attributes of the date input field
const dateInput = document.querySelector('input[name="date"]');
dateInput.setAttribute('min', minDate);
dateInput.setAttribute('max', maxDate);

//Doctor list (replicates the doctors' list from the original HTML)
const doctors = [
    { id: 1, name: "Dr. RK Roy", specialty: "Internist", experience: "12 years", img: "profile img.jpeg" },
    { id: 2, name: "Dr. Saha", specialty: "Dentist", experience: "7.5 years", img: "profile img.jpeg" },
    { id: 3, name: "Dr. Dhrisha Sharma", specialty: "Psychiatrist", experience: "4 years", img: "profile pic.jpeg" },
    { id: 4, name: "Dr. Aniksha Debnath", specialty: "Cardiologist", experience: "10 years", img: "profile pic.jpeg" },
    { id: 5, name: "Dr. Priyam Nath", specialty: "Pediatrician", experience: "8 years", img: "profile img.jpeg" },
    { id: 6, name: "Dr. Swata Saha", specialty: "Dermatologist", experience: "6 years", img: "profile pic.jpeg" },
    { id: 7, name: "Dr. Anurag Bose", specialty: "Neurologist", experience: "3.5 years", img: "profile pic.jpeg" },
    { id: 8, name: "Dr. RD Banik", specialty: "Ophthalmologist", experience: "11 years", img: "profile img.jpeg" },
    { id: 9, name: "Dr. Rani Paul", specialty: "Gynecologist", experience: "5 years", img: "profile pic.jpeg" },
];

// Populate the doctor dropdown
const doctorSelect = document.getElementById("doctorSelect");
doctors.forEach(doctor => {
    const option = document.createElement("option");
    option.value = doctor.id;
    option.textContent = doctor.name;
    option.dataset.img = doctor.img;
    option.dataset.specialty = doctor.specialty;
    option.dataset.experience = doctor.experience;
    doctorSelect.appendChild(option);
});

// Handle doctor selection to show the preview card
doctorSelect.addEventListener("change", function () {
    const selectedDoctor = this.options[this.selectedIndex];
    if (selectedDoctor.value) {
        // Update preview section
        document.getElementById("doctorImage").src = selectedDoctor.dataset.img;
        document.getElementById("doctorName").textContent = selectedDoctor.textContent;
        document.getElementById("doctorSpecialty").textContent = `Specialty: ${selectedDoctor.dataset.specialty}`;
        document.getElementById("doctorExperience").textContent = `Experience: ${selectedDoctor.dataset.experience}`;
        document.getElementById("doctorPreview").style.display = "block";
    } else {
        document.getElementById("doctorPreview").style.display = "none";
    }
});

// Handle form submission
document.getElementById("appointmentForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const date = document.querySelector('input[name="date"]').value;
    const timeSlot = document.querySelector('select[name="timeSlot"]').value;
    const doctorId = doctorSelect.value;
    const selectedDoctor = doctors.find(d => d.id == doctorId);

    if (!selectedDoctor) {
        alert("Please select a valid doctor.");
        return;
    }

    // Store details in sessionStorage
    sessionStorage.setItem("appointmentDetails", JSON.stringify({
        name: name,
        date: date,
        timeSlot: timeSlot,
        doctor: selectedDoctor.name,
    }));

    // Redirect to confirmation page
    window.location.href = "confirmation.html";
});

// Handle form submission
document.getElementById("appointmentForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const date = document.querySelector('input[name="date"]').value;
    const timeSlot = document.querySelector('select[name="timeSlot"]').value;
    const doctorId = document.getElementById("doctorSelect").value;
    const selectedDoctor = doctors.find(d => d.id == doctorId);

    if (!selectedDoctor) {
        alert("Please select a valid doctor.");
        return;
    }

    // Create a confirmation message
    const confirmationMessage = `Are you sure you want to book an appointment with Dr. ${selectedDoctor.name} at ${date} on ${timeSlot}?`;

    // Ask for confirmation before proceeding
    const userConfirmed = confirm(confirmationMessage);

    if (userConfirmed) {
        // Store the appointment details in sessionStorage
        sessionStorage.setItem("appointmentDetails", JSON.stringify({
            name: name,
            date: date,
            timeSlot: timeSlot,
            doctor: selectedDoctor.name,
        }));

        // Redirect to confirmation page
        window.location.href = "confirmation.html";
    } else {
        // If the user cancels the booking, no action is taken
        alert("Appointment booking was canceled.");
    }
});
////////////////////////////////////////
///for lab





