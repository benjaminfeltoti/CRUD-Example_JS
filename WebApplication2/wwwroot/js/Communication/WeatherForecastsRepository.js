async function getWeatherForecasts() {
    const response = await fetch("api/weather");
    // TODO : Handle Errors
    return await response.json();
}

export default getWeatherForecasts;