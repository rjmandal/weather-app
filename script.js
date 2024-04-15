// Select the elements from the DOM
const userTab = document.querySelector("#weather-tab"); // Select the "Your weather" tab
const searchTab = document.querySelector("#search-tab"); // Select the "Search weather" tab
// const userContainer =document.querySelector(".weather-container")
// Select the containers from the DOM
const weatherContainer = document.querySelector(".weather-container"); // Select the container for the weather information
const grantAccessContainer = document.querySelector(".grant-location-container"); // Select the container for the location access grant
const formContainer = document.querySelector("[data-search-form]"); // Select the container for the search form
const userInfoContainer = document.querySelector(".user-info-container"); // Select the container for the user's weather information
const loadingScreen = document.querySelector(".loading-container"); // Select the container for the loading screen

// Set the initial current tab to the "Your weather" tab
let currentTab = userTab;

// Store the API key in a constant
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";

// Add the "current-tab" class to the initial current tab
currentTab.classList.add("current-tab");

// Get data from session storage
getfromSessionStorage();

function switchTab(clickedTab) {
    // If the clicked tab is not the current tab
    if (clickedTab !== currentTab) {
        // Remove the "current-tab" class from the current tab
        currentTab.classList.remove("current-tab");

        // Set the current tab to the clicked tab
        currentTab = clickedTab;

        // Add the "current-tab" class to the current tab
        currentTab.classList.add("current-tab");

        // If the form container is not active
        if (!formContainer.classList.contains("active")) {
            // Remove the "active" class from the user info container
            userInfoContainer.classList.remove("active");

            // Remove the "active" class from the grant access container
            grantAccessContainer.classList.remove("active");

            // Add the "active" class to the form container
            formContainer.classList.add("active");
        }
        // Otherwise
        else {
            // Remove the "active" class from the form container
            formContainer.classList.remove("active");

            // Remove the "active" class from the user info container
            userInfoContainer.classList.remove("active");

            // Get data from session storage
            getfromSessionStorage();
        }
    }
}

// Add an event listener to the user tab

userTab.addEventListener("click", () => switchTab(userTab));
// Add an event listener to the search tab
searchTab.addEventListener("click", () => switchTab(searchTab));
/**
 * This function checks if the user's coordinates are stored in session storage.
 * If not, it displays the grant access container.
 * Otherwise, it fetches the user's weather information.
 */
function getfromSessionStorage() {
    // Get the user's coordinates from session storage
    const localCoordinates = sessionStorage.getItem("user-coordinates");

    // If the user's coordinates are not in session storage, display the grant access container
    if (!localCoordinates) {
        grantAccessContainer.classList.add("active");
    }
    // Otherwise, fetch the user's weather information
    else {
        // Parse the user's coordinates from JSON
        const coordinates = JSON.parse(localCoordinates);

        // Fetch the user's weather information
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;
    grantAccessContainer.classList.remove("active");
    // make loader visible
    loadingScreen.classList.add("active");

    // api call
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } catch (error) {
        loadingScreen.classList.remove("active");
        // 
    }
}

function renderWeatherInfo(weatherInfo) {
    const cityName = document.querySelector("[data-city-name]");
    const countryIcon = document.querySelector("[data-country-icon]");
    const weatherDesc = document.querySelector("[data-weather-desc]");
    const weatherIcon = document.querySelector("[data-weather-icon]");
    const temp = document.querySelector("[data-temp]");
    const windSpeed = document.querySelector("[data-wind-speed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    weatherDesc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp}°C`;
    windSpeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
}

const grantAccessButton = document.querySelector(".grant-location-button");
grantAccessButton.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        alert("Geolocation is not supported by your browser");
    }
});

function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    };
    sessionStorage.setItem("user-cordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
};

let searchInput = document.querySelector(".search-input");
formContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;
    if (cityName === "")
        return;
    else
        fetchSearchWeatherInfo(cityName);
});

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessButton.classList.remove("active");
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } catch (error) {

    }
}