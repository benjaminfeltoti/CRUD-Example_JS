import { getWeatherForecasts, createNewWeatherForecast, updateWeatherForecast, deleteWeatherForecast } from "./Communication/WeatherForecastsRepository.js";
import processDataForWeatherForecastElements from "./Builder/WeatherForecastBuilder.js";

var app = function () {

    initialize();
    
    function initialize() {

        initializeListeners();
        reloadDataAndRedraw();

        function initializeListeners() {
            document.getElementById("getSubmitButton").addEventListener("click", reloadDataAndRedraw);
            document.getElementById("postSubmitButton").addEventListener("click", createNewWeatherForecast);
            document.getElementById("updateSubmitButton").addEventListener("click", updateWeatherForecast);
            document.getElementById("deleteSubmitButton").addEventListener("click", deleteWeatherForecast);

            // Refresh content of comboboxes on opening
            document.getElementById("changeIdCombobox").addEventListener("focus", reloadDataAndRedraw);
            document.getElementById("deleteIdCombobox").addEventListener("focus", reloadDataAndRedraw);
        }

        async function reloadDataAndRedraw() {
            processDataForWeatherForecastElements(await getWeatherForecasts());
        }
    }
}
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", app);
}
else {
    app();
}