const API_KEY = "2ef8724f40ff2b717520d88ce873fdb6";
fetchWeatherDetails('goa');
getCustomWeather('london');
getGeoLocation();

function renderWeatherInfo(city,data) {
    let newPara = document.createElement('p');
    newPara.textContent = `The weather in ${city} is ${data?.weather[0]?.description} and the temperature is ${data?.main?.temp.toFixed(2)} degree celsius`;
    document.body.appendChild(newPara);
}

async function fetchWeatherDetails(city) {
    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data = await response.json();
        renderWeatherInfo(city,data);

    } catch (error) {
        console.log(error);
    }
}

async function getCustomWeather(city) {
    try {
        let latitude = 15.6333;
        let longitude = 18.3333;
        const response = (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`));
        const data = await response.json();
        renderWeatherInfo(city,data);
    } catch (error) {
        console.log("error");
    }
}
function switchTab(clickedTab){
    apiErrorContainer.classList.remove("active");
    if(clickedTab.id === "api-error-tab"){
        apiErrorContainer.classList.add("active");
    }
    else{
        apiErrorContainer.classList.remove("active");
    }
}
// function getCustomWeather(city){
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
//     .then(response => response.json())
//     .then(data => renderWeatherInfo(city,data))
// }
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
    console.log(lat);
    console.log(long);
}


