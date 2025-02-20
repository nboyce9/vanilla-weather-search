document.addEventListener("DOMContentLoaded", function() {
    function handleSubmission(event){
        // Get the form data
        event.preventDefault();
        let formInput = document.querySelector("#input-form").value;
        let city = document.querySelector("#city-name"); 
        city.innerHTML = formInput;
    }

    let formSearch = document.querySelector("#search-form");
    formSearch.addEventListener("submit", handleSubmission);
});