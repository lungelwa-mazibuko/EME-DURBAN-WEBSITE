document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav')) {
            navMenu.classList.remove('show');
        }
    });
});



/*the alert message*/
function showUnavailable(event) {
    event.preventDefault(); // Prevent navigation to LOGIN.html
    
    const message = document.getElementById('unavailableMessage');
    message.style.display = 'block';
    
    // Hide message after 3 seconds
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}
/*the drop down */
function toggleContactDropdown(event) {
    event.preventDefault();
    const dropdown = document.getElementById('contactDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('contactDropdown');
    const contactLink = document.querySelector('.dropdown > a');
    
    if (dropdown.style.display === 'block' && 
        !dropdown.contains(event.target) && 
        !contactLink.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});



const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

// MongoDB Connection
mongoose.connect('mongodb://localhost/dashboard', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Static Files
app.use(express.static(__dirname + '/public'));

// User Model
const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }
}));



