document.addEventListener('DOMContentLoaded',() =>{
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "0264759110fe1c19f8dffcfaa1493463"; // env variable

    getWeatherBtn.addEventListener('click',async() =>{
        const city = cityInput.value.trim()
        if(!city) return;

     /*whenever you are making a web request remember these two things
     1) it may throw an error
     2) server/database is always in another continent*/

     try {
       const weatherData = await fetchWeatherData(city);
       displayWeatherData(weatherData);
     } catch (error) {
        showError();
     }
    });

    async function fetchWeatherData(city){
        // gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

       const response = await fetch(url);
       console.log(typeof response);
       console.log("Response", response);

       if(!response.ok){
        throw new Error("city not found")
       }
       const data =   await response.json()
        return data;
    }
    function displayWeatherData(data){
        console.log(data);
        const { name , main , weather } = data;

        console.log("Name:",name);
        console.log("Temperature:",main.temp);
        console.log("Weather description:",weather[0].description);

         cityNameDisplay.textContent = name;
         temperatureDisplay.textContent = `Temperature : ${main.temp}`;
         descriptionDisplay.textContent = `Weather : ${weather[0].description}`;
         console.log("weather info div:",weatherInfo);

         //unlock the display
         weatherInfo.classList.remove("hidden");
         errorMessage.classList.add("hidden");
    }

    function showError(){
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    }
});