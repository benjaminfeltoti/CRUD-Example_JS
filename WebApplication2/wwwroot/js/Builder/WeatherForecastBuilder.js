const tableHeader =
`<tr>
<th>Time</th>
<th>Weather</th>
<th>Celsius</th>
<th>Fahrenheit</th>`;

async function processDataForWeatherForecastElements(data) {
    let tableContent = tableHeader;
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

export default processDataForWeatherForecastElements;