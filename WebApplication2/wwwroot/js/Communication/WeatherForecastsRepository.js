async function getWeatherForecastsFetch(callbackFunction) {
    const response = await fetch("api/weather");
    // TODO : Handle Errors
    await response.json().then(data => callbackFunction(data));
}

export default getWeatherForecastsFetch;