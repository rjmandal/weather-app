const API_KEY = "2ef8724f40ff2b717520d88ce873fdb6";

fetchWeatherDetails('goa');
getCustomWeather('London');
getGeoLocation();

function renderWeatherInfo(city, data) {
    let newPara = document.createElement('p');
    newPara.textContent = `The weather in ${city} is ${data?.weather[0]?.description} and the temperature is ${data?.main?.temp.toFixed(2)} degree celsius`;
    document.body.appendChild(newPara);
}

async function fetchWeatherDetails(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data = await response.json();
        renderWeatherInfo(city, data);
    } catch (error) {
        console.log(error);
    }
}

async function getCustomWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data = await response.json();
        renderWeatherInfo(city, data);
    } catch (error) {
        console.log(error);
    }
}

function getGeoLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log("Geolocation is not supported by this browser");
    }
}

function showPosition(position){
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    getCustomWeather(lat,long);
}

