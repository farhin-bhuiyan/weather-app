# Weather Checker

This is a simple web application that tells the user if it will rain tomorrow in their location of choice. It uses the OpenWeatherMap API to fetch weather data.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
    ```
    OPENWEATHERMAP_API_KEY=your_api_key_here
    ```
4. Run the application: `node app.js`

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Enter the name of the city you want to check the weather for.
3. The application will display whether it will rain tomorrow in the specified city.

## Dependencies

- Express.js
- Axios
- EJS
- dotenv

# What to put in terminal for project to run!!!!
  1. npm init -y
  2. npm install express axios ejs dotenv
  3. echo "OPENWEATHERMAP_API_KEY=ab7317016b67fb294f2c4396499c906c" > .env
  4. node app.js
