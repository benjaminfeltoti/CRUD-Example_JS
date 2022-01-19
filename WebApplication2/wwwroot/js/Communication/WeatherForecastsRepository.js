async function getWeatherForecasts() {
    const response = await fetch("api/weather");
    // TODO : Handle Errors
    return await response.json();
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

    if (response.status === 201) {
        console.log("201 returned!");

        try {
            const content = await response.json();
            return content;            
        } catch (error) {
        }
    }
    else {
        console.log("Request was bad");
        return "Error in formatting!";
    }
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

async function deleteWeatherForecast() {
    console.log("DELETE WAS CALLED!");

    const id = Number(document.getElementById("deleteIdCombobox").value);
    let response = await fetch(`api/weather/${id}`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: ""
    });
    // TODO : Handle bad request
    /* const content = await response.json();
    console.log(content); */

    //IFFIE
    //(function(){//code}())
}

export { getWeatherForecasts, createNewWeatherForecast, updateWeatherForecast, deleteWeatherForecast };