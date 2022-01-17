// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

var GetWeatherForecasts, CreateNewWeatherForecast;

var app = function () {

    console.log("DOM Loaded.");

    getWeatherForecasts();

    async function getWeatherForecasts(url = "https://localhost:44365/api/weather") {

        const response = await fetch(url);
        let data = await response.json();

        showTable(data);
    }

    function showTable(data) {
        let tableContent =
            `<tr>
            <th>Time</th>
            <th>Weather</th>
            <th>Celsius</th>
            <th>Fahrenheit</th>`;

        for (const item of data) {
            tableContent += `
            <tr>
                <td>${item.date}</td>
                <td>${item.summary}</td>
                <td>${item.temperatureC} C°</td>
                <td>${item.temperatureF} F°</td>
            </tr>`;
        }

        document.getElementById("contentTable").innerHTML = tableContent;
    }

    async function CreateNewWeatherForecastEntity() {
        console.log("POSTING WAS CALLED!");

        const date = document.getElementById("dateInput").value;
        const temperatureC = Number(document.getElementById("celsiusInput").value);
        const summary = document.getElementById("summaryInput").value;

        let weatherForecastObject = { id: 99, date: date, temperatureC: temperatureC, summary: summary };
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

    GetWeatherForecasts = getWeatherForecasts;
    CreateNewWeatherForecast = CreateNewWeatherForecastEntity;
}
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", app);
}
else {
    app();
}