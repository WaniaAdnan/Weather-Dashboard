const apiKey = "5c416c21b5fd5bf36460259c16e0d26f";  

document.getElementById("start-btn").addEventListener("click", function() {
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("dashboard-container").classList.remove("hidden");
});
function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) {
     alert("Please enter a city name");
    return;}
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById("city-name").innerText = data.name;
            document.getElementById("date-time").innerText = new Date().toLocaleString();
            document.getElementById("temp").innerText = `Temperature: ${data.main.temp}°C`;
            document.getElementById("weather-desc").innerText = data.weather[0].description;
            document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

            document.getElementById("feels-like").innerText = data.main.feels_like;
            document.getElementById("clouds").innerText = data.clouds.all;
            document.getElementById("humidity").innerText = data.main.humidity;
            document.getElementById("pressure").innerText = data.main.pressure;
            document.getElementById("visibility").innerText = (data.visibility / 1000).toFixed(1); // Convert to KM
            document.getElementById("wind-speed").innerText = data.wind.speed;

            document.getElementById("sunrise").innerText = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            document.getElementById("sunset").innerText = new Date(data.sys.sunset * 1000).toLocaleTimeString();

            document.getElementById("precipitation").innerText = data.rain ? `${data.rain["1h"]} mm` : "0 mm";
        });
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const forecastContainer = document.getElementById("forecast-container");
            forecastContainer.innerHTML = data.list.slice(0, 5).map(item => `
                <div class="forecast-item">
                    <p>${new Date(item.dt * 1000).toLocaleDateString()}</p>
                    <p>${new Date(item.dt * 1000).toLocaleTimeString()}</p>
                    <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">
                    <p>${item.main.temp}°C</p>
                </div>
            `).join('');
        });
}

