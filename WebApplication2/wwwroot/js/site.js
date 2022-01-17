// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

var GetWeatherForecasts, CreateNewWeatherForecast, UpdateWeatherForecast;

var app = function () {

    console.log("DOM Loaded.");

    getWeatherForecasts();

    async function getWeatherForecasts(url = "https://localhost:44365/api/weather") {

        const response = await fetch(url);
        let data = await response.json();

        processDataForElements(data);
    }

    function processDataForElements(data) {
        let tableContent =
            `<tr>
            <th>Time</th>
            <th>Weather</th>
            <th>Celsius</th>
            <th>Fahrenheit</th>`;

        let comboboxContent;

        for (const item of data) {
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
        }

        document.getElementById("contentTable").innerHTML = tableContent;
        document.getElementById("changeIdCombobox").innerHTML = comboboxContent;
    }

    async function createNewWeatherForecast() {
        console.log("POSTING WAS CALLED!");

        const date = document.getElementById("dateInput").value;
        const temperatureC = Number(document.getElementById("celsiusInput").value);
        const summary = document.getElementById("summaryInput").value;

        let weatherForecastObject = { id: -1, date: date, temperatureC: temperatureC, summary: summary };
        let jsonstring = JSON.stringify(weatherForecastObject);
        console.log(jsonstring);
        let response = await fetch("api/weather", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: jsonstring
        });
        // TODO : Handle bad request
        /* const content = await response.json();
        console.log(content); */
    }

    async function updateWeatherForecast() {
        console.log("PUT WAS CALLED!");

        const id = Number(document.getElementById("changeIdCombobox").value);
        const date = document.getElementById("dateInputChange").value;
        const temperatureC = Number(document.getElementById("celsiusInputChange").value);
        const summary = document.getElementById("summaryInputChange").value;

        let weatherForecastObject = { id: id, date: date, temperatureC: temperatureC, summary: summary };
        let jsonstring = JSON.stringify(weatherForecastObject);
        console.log(jsonstring);
        let response = await fetch(`api/weather/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: jsonstring
        });
        // TODO : Handle bad request
        /* const content = await response.json();
        console.log(content); */
    }

    GetWeatherForecasts = getWeatherForecasts;
    CreateNewWeatherForecast = createNewWeatherForecast;
    UpdateWeatherForecast = updateWeatherForecast;
}
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", app);
}
else {
    app();
}