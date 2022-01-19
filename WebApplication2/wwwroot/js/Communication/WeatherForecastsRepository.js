const header = {
    "Accept": "application/json",
    "Content-Type": "application/json"
};

async function getWeatherForecasts() {
    const response = await fetch("api/weather");
    // TODO : Handle Errors
    return await response.json();
}

async function createNewWeatherForecast() {

    const date = document.getElementById("dateInput").value;
    const temperatureC = Number(document.getElementById("celsiusInput").value);
    const summary = document.getElementById("summaryInput").value;

    let weatherForecastObject = { id: -1, date: date, temperatureC: temperatureC, summary: summary };
    let jsonstring = JSON.stringify(weatherForecastObject);
    let response = await fetch("api/weather", {
        method: "POST",
        headers: header,
        body: jsonstring
    });

    if (response.status === 201) {        
        try {
            const content = await response.json();
            return content;            
        } catch (error) {
        }
    }
    else {
        return "Error in formatting!";
    }
}

async function updateWeatherForecast() {

    const id = Number(document.getElementById("changeIdCombobox").value);
    const date = document.getElementById("dateInputChange").value;
    const temperatureC = Number(document.getElementById("celsiusInputChange").value);
    const summary = document.getElementById("summaryInputChange").value;

    let weatherForecastObject = { id: id, date: date, temperatureC: temperatureC, summary: summary };
    let jsonstring = JSON.stringify(weatherForecastObject);
    let response = await fetch(`api/weather/${id}`, {
        method: "PUT",
        headers: header,
        body: jsonstring
    });
    // TODO : Handle bad request    
}

async function deleteWeatherForecast() {
    const id = Number(document.getElementById("deleteIdCombobox").value);
    let response = await fetch(`api/weather/${id}`, {
        method: "DELETE",
        headers: header,
        body: ""
    });
    // TODO : Handle bad request

    //IFFIE
    //(function(){//code}())
}

export { getWeatherForecasts, createNewWeatherForecast, updateWeatherForecast, deleteWeatherForecast };