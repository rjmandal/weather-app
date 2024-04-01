const API_KEY = "2ef8724f40ff2b717520d88ce873fdb6";
fetchWeatherDetails('goa');
getCustomWeather('london');
function renderWeatherInfo(data) {
    let newPara = document.createElement('p');
    newPara.textContent = `The weather in ${city} is ${data?.weather[0]?.description} and the temperature is ${data?.main?.temp.toFixed(2)} degree celsius`;
    document.body.appendChild(newPara);
}
async function fetchWeatherDetails(city) {
    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data = await response.json();
        console.log(data);

        renderWeatherInfo(data);

    } catch (error) {
        console.log(error);
    }
}

async function getCustomWeather(city) {
    try {
        let latitude = 15.6333;
        let longitude = 18.3333;
        const response = (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`));
        const data2 = await response.json();
        console.log(data2);
        let newPara2 = document.createElement('p');
        newPara.textContent = `The weather in ${city} is ${data?.weather[0]?.description} and the temperature is ${data?.main?.temp.toFixed(2)} degree celsius`;
        document.body.appendChild(newPara2);
    } catch (error) {
        console.log("error");
    }
}

function getGeoLocation(){
    if(navigator.geolocation){
        navigator
    }
}
