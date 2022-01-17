// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function load() {

    console.log("DOM Loaded.");

    getApi();

    async function getApi(url = "https://localhost:44365/api/weather") {
        // Get Data
        const response = await fetch(url);
        let data = await response.json();
        
        // Load into table
        showTable(data);
    }
    
    function showTable(data){
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

        document.getElementById("contentTable").innerHTML=tableContent;
    }


}
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", load);
}
else {
    load();
}