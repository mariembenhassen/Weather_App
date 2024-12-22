document.addEventListener("DOMContentLoaded", function() {
  let currentUnit = 'F'; // Default unit (Fahrenheit)
  let lat, lon; // Latitude and longitude of the user

  // Function to get the user's location
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchWeatherData);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  // Function to fetch weather data
  function fetchWeatherData(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    const apiUrl = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${lon}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Extracting weather and temp
        const weather = data.weather[0];
        const temp = data.main.temp;

        // Update location and description
        document.getElementById("location").innerText = `${data.name}, ${data.sys.country}`;
        document.getElementById("description").innerText = weather.description;

        // Update temperature and background image
        updateTemperature(temp, currentUnit);
        setBackground(weather.main);
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
        alert("Failed to retrieve weather data.");
      });
  }

  // Function to update temperature based on the unit (C or F)
  function updateTemperature(temp, unit) {
    let temperature;
    if (unit === 'F') {
      temperature = (temp * 9 / 5) + 32; // Convert Celsius to Fahrenheit
      document.querySelector(".toggle-button").innerText = "Switch to °C";
    } else {
      temperature = temp; // Use temperature as is if in Celsius
      document.querySelector(".toggle-button").innerText = "Switch to °F";
    }
    document.getElementById("temperature").innerText = `${Math.round(temperature)}°${unit}`;
  }

  // Function to toggle between Fahrenheit and Celsius
  function toggleUnit() {
    currentUnit = currentUnit === 'F' ? 'C' : 'F'; // Switch unit
    fetchWeatherData({ coords: { latitude: lat, longitude: lon } }); // Fetch weather data again with the new unit
  }

  // Hover effect with JavaScript (using mouseover and mouseout)
  const toggleButton = document.getElementById("toggleButton");

  toggleButton.addEventListener("mouseover", () => {
    toggleButton.classList.add("active");
  });

  toggleButton.addEventListener("mouseout", () => {
    toggleButton.classList.remove("active");
  });

  // Add event listener for the button click
  toggleButton.addEventListener("click", toggleUnit);

  // Function to set background image based on weather condition
  function setBackground(weatherMain) {
    let backgroundImage = '';
    if (weatherMain === 'Clear') {
      backgroundImage = 'url(https://th.bing.com/th/id/OIP.e1Dij42QESa1S5O1guiEzgHaEo?rs=1&pid=ImgDetMain)';
    } else if (weatherMain === 'Clouds') {
      backgroundImage = 'url(https://th.bing.com/th/id/OIP.8taK2Bc8HSNNOnIsscxGnwHaEK?rs=1&pid=ImgDetMain)';
    } else if (weatherMain === 'Rain') {
      backgroundImage = 'url(https://th.bing.com/th/id/R.0c7b75ca0246fe474b2ff9bf3c89e6f8?rik=Zb8RhIQe6cpBJA&riu=http%3a%2f%2fhewgill.com%2fphoto%2ftrips%2fglacier%2frain.jpg)';
    } else if (weatherMain === 'Snow') {
      backgroundImage = 'url(https://th.bing.com/th/id/OIP.z-krM2FF4SnBxzzeUF2LBwHaEo?rs=1&pid=ImgDetMain)';
    } else if (weatherMain === 'Thunderstorm') {
      backgroundImage = 'url(https://th.bing.com/th/id/OIP.E-mVwzAoola2TTecd1QdKwExDM?rs=1&pid=ImgDetMain)';
    } else {
      backgroundImage = 'url(https://source.unsplash.com/1600x900/?weather)';
    }
    document.body.style.backgroundImage = backgroundImage;
  }

  // Call getLocation on page load
  getLocation();
});
