const apiKey = '1218844f9ecc4634b8515448240109';
const weatherInfoDiv = document.getElementById('weatherInfo');

function getWeatherByLocation() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetchWeather(location);
    }
}

function getWeatherByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoords(lat, lon);
        }, showError);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function fetchWeather(location) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching the weather data:', error));
}

function fetchWeatherByCoords(lat, lon) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching the weather data:', error));
}

function displayWeather(data) {
    if (data && data.location && data.current) {
        weatherInfoDiv.innerHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <p><strong>Temperature:</strong> ${data.current.temp_c} °C</p>
            <p><strong>Weather:</strong> ${data.current.condition.text}</p>
            <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
            <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</p>
        `;
    } else {
        weatherInfoDiv.innerHTML = `<p>Weather data not available for the location.</p>`;
    }
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert('User denied the request for Geolocation.');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
        case error.TIMEOUT:
            alert('The request to get user location timed out.');
            break;
        case error.UNKNOWN_ERROR:
            alert('An unknown error occurred.');
            break;
    }
}