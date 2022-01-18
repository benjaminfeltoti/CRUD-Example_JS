// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

import {getWeatherForecasts, createNewWeatherForecast, updateWeatherForecast, deleteWeatherForecast} from "./Communication/WeatherForecastsRepository.js";

var app = async function () {

    console.log("DOM Loaded.");
    console.log(window.location.origin);

    setupSubmitButtonListeners();

    async function setupSubmitButtonListeners() {
        document.getElementById("getSubmitButton").addEventListener("click", (async () => {            
            processDataForElements(await getWeatherForecasts());
        })());
        document.getElementById("postSubmitButton").addEventListener("click", createNewWeatherForecast);
        document.getElementById("updateSubmitButton").addEventListener("click", updateWeatherForecast);
        document.getElementById("deleteSubmitButton").addEventListener("click", deleteWeatherForecast);
        
        // Refresh content of comboboxes on opening
    }

    async function processDataForElements(data) {

        let tableContent =
            `<tr>
            <th>Time</th>
            <th>Weather</th>
            <th>Celsius</th>
            <th>Fahrenheit</th>`;

        let comboboxContent;

        data.forEach(item => {
            tableContent += `
            <tr>
                <td>${item.date}</td>
                <td>${item.summary}</td>
                <td>${item.temperatureC} C°</td>
                <td>${item.temperatureF} F°</td>
            </tr>`;

            comboboxContent += `
            <option>${item.id}</option>
            `;
        });

        document.getElementById("contentTable").innerHTML = tableContent;
        document.getElementById("changeIdCombobox").innerHTML = comboboxContent;
        document.getElementById("deleteIdCombobox").innerHTML = comboboxContent;
    }
}
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", app);
}
else {
    app();
}