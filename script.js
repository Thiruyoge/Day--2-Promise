// script.js

document.addEventListener("DOMContentLoaded", function () {
    const countryInfoContainer = document.getElementById("countryInfoContainer");
  
    // Function to fetch data from the Rest Countries API
    function fetchCountryData() {
      fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(countries => {
          countries.forEach(country => {
            // Create a Bootstrap card for each country
            const card = document.createElement("div");
  
            // Display the country information in the card
            card.innerHTML = `

            <div class="card text-center bg-secondary">
            <div class="card-header bg-dark text-light ">
                <h2>${country.name.common}</h2>
            </div>

            <div class="card-body">
                <img src="${country.flags.png}" class="card-img-top h-50 w-50" alt="...">
                <p class="card-text">
                Capital: ${country.capital[0]}<br>
                Region: ${country.latlng[0]}<br>
                Country code: ${country.latlng[1]}<br>

              </p>
            <button onclick="fetchWeatherData('${country.latlng[0]}','${country.latlng[1]}')" class="btn btn-sm btn-outline-light">Click for Weather</button>
            </div>
        </div>



            
            `;
  
            // Add the card to the container
            countryInfoContainer.appendChild(card);
  
            // Fetch weather data using OpenWeatherMap API
            fetchWeatherData(country.capital[0], country.latlng[0], country.latlng[1]);
          });
        })
        .catch(error => console.error("Error fetching country data:", error));
    }
  
    // Function to fetch weather data from the OpenWeatherMap API
    function fetchWeatherData(city, lat, lon) {
      const apiKey = "1264527"; // Replace with your OpenWeatherMap API key
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(weatherData => {
          // Update the card with weather information
          const card = document.querySelector(`[data-city="${city}"]`);
          if (card) {
            card.querySelector(".card-text").innerHTML += `<br>Temperature: ${weatherData.main.temp}°C`;
          }
        })
        .catch(error => console.error("Error fetching weather data:", error));
    }
  
    // Initial call to fetch country data
    fetchCountryData();
  });
  