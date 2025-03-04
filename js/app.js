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
        getForecast(responseData.city);

    }

    function searchCity(city){
        // Get the data from the API
        let apiKey = "8827643caa23f3fa4e0oc6dt3bdbc467";
        let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

        axios.get(apiUrl).then(displayTemperature);
    }

    function getForecast(city){
        //Get forecast data from the API
        let apiKey = "8827643caa23f3fa4e0oc6dt3bdbc467";
        let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayForecast);
    }

    function handleSubmission(event){
        // Get the form data
        event.preventDefault();
        let formInput = document.querySelector("#input-form").value;
        searchCity(formInput);
    }

    function displayForecast(response){
        dataResponse = response.data;
        console.log(dataResponse);

        let forecastString = "";

        //let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        //let forecastIconElement = `<img src="${dataResponse.daily.condition.icon_url}" class="weather-icon"/>`;

        response.data.daily.forEach(function(day, index){
            if (index <= 5){
                let forecastIconElement = `<img src="${day.condition.icon_url}" class="weather-icon"/>`;
                
                forecastString += `<div class="forecast-days">
                <div class="forecast-day">Tue</div>
                    <div class="forecast-icon">${forecastIconElement}</div>
                    <div class="forecast-temperature">
                        <div class="forecast-max"><strong>${Math.round(day.temperature.maximum)}°C </strong></div> 
                        <div class="forecast-min"> ${Math.round(day.temperature.minimum)}°C</div>
                    </div>
                    </div>`;
            }
        });
        
        let forecastElement = document.querySelector(".weather-forecast");
        forecastElement.innerHTML = forecastString;
    }

    let formSearch = document.querySelector("#search-form");
    formSearch.addEventListener("submit", handleSubmission);
    searchCity("Cape Town");
    displayForecast();

});