This is a Weather App that shows the current weather conditions based on the user's location (latitude and longitude). It allows users to toggle between Fahrenheit and Celsius to view the temperature in their preferred unit. The app also changes its background image according to the weather condition (e.g., clear skies, rain, snow).
How the App Works:
User Location:
The app uses Geolocation API to detect the user's location (latitude and longitude).
Once the location is fetched, the app makes an API request to get the weather data for that specific location.
Weather Data:
The app fetches the current weather data from a weather API (freecodecamp.rocks in this case).
It then displays the location (city, country), weather description (sunny, cloudy, etc.), and temperature.
Unit Toggle (°C/°F):
The app allows users to toggle between Celsius and Fahrenheit for temperature display.
When the user clicks the toggle button, the unit switches, and the temperature is recalculated.
Based on the weather condition (e.g., sunny, rain, snow), the app changes the background image to match the weather (e.g., sunny background for clear weather).
