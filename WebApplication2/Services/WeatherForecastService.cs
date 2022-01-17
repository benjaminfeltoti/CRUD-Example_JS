using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using WebApplication2.Models;

namespace WebApplication2.Services
{
    // TODO: Refactor file writings to one method
    public class WeatherForecastService : IWeatherForecastService
    {
        private const string dataAccessPath = "./data.json";

        private object _lock = new object();

        public void CreateNewForecast(WeatherForecastModel model)
        {
            var jsonText = JsonSerializer.Serialize(GetWeatherForecasts().Append(model));

            using (StreamWriter streamWriter = new StreamWriter(dataAccessPath))
            {
                streamWriter.Write(jsonText);
            }
        }

        // TODO: Refactor to Async
        public IEnumerable<WeatherForecastModel> GetWeatherForecasts()
        {
            List<WeatherForecastModel> weatherForecastModels;

            lock (_lock)
            {
                using (StreamReader streamReader = new StreamReader(dataAccessPath))
                {
                    weatherForecastModels = JsonSerializer.Deserialize<List<WeatherForecastModel>>(streamReader.ReadToEnd());
                }
            }

            return weatherForecastModels;
        }

        public void UpdateWeatherForecast(WeatherForecastModel weatherForecastModel, int weatherForecastId)
        {
            WeatherForecastModel[] forecastModels = GetWeatherForecasts().ToArray();
            var modelIndex = Array.IndexOf(forecastModels, forecastModels.First(forecast => forecast.Id == weatherForecastId));
            forecastModels[modelIndex] = weatherForecastModel;

            var jsonText = JsonSerializer.Serialize(forecastModels);

            using (StreamWriter streamWriter = new StreamWriter(dataAccessPath))
            {
                streamWriter.Write(jsonText);
            }
        }

        public void ChangeWeatherForecast(int weatherForecastId, string propertyName, string newValue)
        {
            IEnumerable<WeatherForecastModel> forecastModels = GetWeatherForecasts();
            WeatherForecastModel forecastModel = forecastModels.First(forecast => forecast.Id == weatherForecastId);
            forecastModel.GetType().GetProperty(propertyName).SetValue(forecastModel, newValue);

            var jsonText = JsonSerializer.Serialize(forecastModels);

            using (StreamWriter streamWriter = new StreamWriter(dataAccessPath))
            {
                streamWriter.Write(jsonText);
            }
        }

        public void DeleteWeatherForecast(int weatherForecastId)
        {
            var jsonText = JsonSerializer.Serialize(GetWeatherForecasts().Where(forecast => forecast.Id != weatherForecastId));

            using (StreamWriter streamWriter = new StreamWriter(dataAccessPath))
            {
                streamWriter.Write(jsonText);
            }
        }
    }
}
