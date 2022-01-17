using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using WebApplication2.Models;

namespace WebApplication2.Services
{
    public class WeatherService
    {
        public object _lock = new object();

        public WeatherService()
        {

        }

        // TODO: Refactor to Async
        public IEnumerable<WeatherForecastModel> GetWeatherForecasts()
        {
            List<WeatherForecastModel> weatherForecastModels;

            lock (_lock)
            {
                using (StreamReader streamReader = new StreamReader("./data.json"))
                {
                    weatherForecastModels = JsonSerializer.Deserialize<List<WeatherForecastModel>>(streamReader.ReadToEnd());
                }
            }

            return weatherForecastModels;
        }
    }
}
