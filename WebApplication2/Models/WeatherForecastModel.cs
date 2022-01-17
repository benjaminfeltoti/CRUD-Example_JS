using System;
using System.Text.Json.Serialization;

namespace WebApplication2.Models
{
    public class WeatherForecastModel
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("date")]
        public DateTime Date { get; set; }

        [JsonPropertyName("temperatureC")]
        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        [JsonPropertyName("summary")]
        public string Summary { get; set; }
    }
}
