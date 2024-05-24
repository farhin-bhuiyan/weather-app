//Farhin Bhuiyan
//05/24/2024
//Weather-checker app
//This program will ask the user for a city and then display the weather for that city

const express = require('express'); // Import Express.js
const axios = require('axios'); // Import Axios for making HTTP requests
const path = require('path'); // Import path for handling file paths
require('dotenv').config(); // Load environment variables from a .env file

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3000; // Set the port to the environment variable or default to 3000

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
// Middleware to parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Set the view engine to EJS for templating
app.set('view engine', 'ejs');

// Route for the home page
app.get('/', (req, res) => {
    res.render('index'); // Render the index.ejs view
});

// Route to handle the weather form submission
app.post('/weather', async (req, res) => {
    const city = req.body.city; // Get the city name from the form submission
    const apiKey = process.env.OPENWEATHERMAP_API_KEY; // Get the API key from environment variables
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`; // Construct the API URL

    try {
        const response = await axios.get(url); // Make the API request
        const weatherData = response.data; // Get the weather data from the response
        // Find the weather data for tomorrow
        const tomorrowWeather = weatherData.list.find(item => {
            const date = new Date(item.dt * 1000); // Convert the timestamp to a Date object
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1); // Get tomorrow's date
            return date.getDate() === tomorrow.getDate(); // Check if the date matches tomorrow's date
        });

        // Check if it will rain tomorrow
        const willRain = tomorrowWeather.weather.some(condition => condition.main.toLowerCase() === 'rain');

        res.render('result', { city, willRain }); // Render the result.ejs view with the city and rain information
    } catch (error) {
        console.error(error); // Log any errors to the console
        // Render the result.ejs view with an error message
        res.render('result', { city, willRain: null, error: 'Could not retrieve weather data. Please try again.' });
    }
});

// Start the server on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});