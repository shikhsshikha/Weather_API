document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const tempDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
    const loading = document.getElementById("loading");

    const API_KEY = "ed915caafa10d192fdb23d538bb4bada";

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    getWeatherBtn.addEventListener('click', async () => {

        const city = cityInput.value.trim();
        if (!city) return;

        loading.classList.remove("hidden");
        weatherInfo.classList.add("hidden");
        errorMessage.classList.add("hidden");
        getWeatherBtn.disabled = true;

        try {
            const weatherData = await fetchWeatherData(city);

            await delay(1000);
            
            displayWeatherData(weatherData);

        } catch (error) {
            showError();

        } finally {
            loading.classList.add("hidden");
            getWeatherBtn.disabled = false;
        }
    });


    async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE", response);

        if(!response.ok){
            throw new Error("City not found");
        }
        const data = await response.json();
        return data;
    };

    function displayWeatherData(data){
        console.log(data);
        const{name, main, weather} = data;
        cityNameDisplay.textContent = name;
        
        tempDisplay.textContent = `Temperature: ${main.temp}`;
        descriptionDisplay.textContent = `Weather: ${weather[0].description}`
        
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");

    };

    function showError(){
        weatherInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    };
    
})