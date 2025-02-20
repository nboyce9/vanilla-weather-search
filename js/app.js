document.addEventListener("DOMContentLoaded", function() {

    function displayDayTime(timeStamp){
        let date = new Date(timeStamp*1000);
        
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[date.getDay()];

        let hours = date.getHours();
        let minutes = date.getMinutes();

        let time = document.querySelector("#time");
        if (minutes < 10){
            minutes = `0${minutes}`;
        }
        if (hours < 10){
            hours = `0${hours}`;
        }
        time.innerHTML = `${day} ${hours}:${minutes}`;
    }

    function displayTemperature(response){
        let responseData = response.data;

        let city = document.querySelector("#city-name"); 
        city.innerHTML = responseData.city;
    
        let temperature = Math.round(responseData.temperature.current);
        let temperatureElement = document.querySelector("#temp");
        temperatureElement.innerHTML = temperature;

        let icon = document.querySelector("#icon");
        icon.innerHTML = `<img src="${responseData.condition.icon_url}" class="weather-icon"/>`;

        let description = document.querySelector("#weather-description");
        description.innerHTML = responseData.condition.description;

        let humidity = document.querySelector("#humidity");
        humidity.innerHTML = `${responseData.temperature.humidity}%`;

        let windSpeed = document.querySelector("#wind-speed");
        windSpeed.innerHTML = `${responseData.wind.speed}km/h`;

        let timeStamp = responseData.time;
        displayDayTime(timeStamp);

    }

    function searchCity(city){
        // Get the data from the API
        let apiKey = "b2a5adcct04b33178913oc335f405433";
        let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

        axios.get(apiUrl).then(displayTemperature);
    }

    function handleSubmission(event){
        // Get the form data
        event.preventDefault();
        let formInput = document.querySelector("#input-form").value;
        searchCity(formInput);
    }

    let formSearch = document.querySelector("#search-form");
    formSearch.addEventListener("submit", handleSubmission);
    searchCity("Cape Town");

});