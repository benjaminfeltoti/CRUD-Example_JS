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

        public WeatherForecastModel CreateNewForecast(WeatherForecastModel model)
        {
            //TODO : input verification
            var forecasts = GetWeatherForecasts();

            model.Id = GenerateId(forecasts);

            if (TrySerialize(forecasts.Append(model)))
            {
                return model;
            }

            return null;
        }

        // TODO: Refactor to Async
        public IEnumerable<WeatherForecastModel> GetWeatherForecasts()
        {
            List<WeatherForecastModel> weatherForecastModels;

            using (StreamReader streamReader = new StreamReader(dataAccessPath))
            {
                weatherForecastModels = JsonSerializer.Deserialize<List<WeatherForecastModel>>(streamReader.ReadToEnd());
            }

            return weatherForecastModels;
        }

        public bool UpdateWeatherForecast(WeatherForecastModel weatherForecastModel, int weatherForecastId)
        {
            WeatherForecastModel[] forecastModels;

            try
            {
                forecastModels = GetWeatherForecasts().ToArray();
                var modelIndex = Array.IndexOf(forecastModels, forecastModels.First(forecast => forecast.Id == weatherForecastId));
                forecastModels[modelIndex] = weatherForecastModel;                
            }
            catch (Exception)
            {
                return false;
            }
            

            return TrySerialize(forecastModels);
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

        public bool DeleteWeatherForecast(int weatherForecastId)
        {
            var forecasts = GetWeatherForecasts();

            if (!forecasts.Any(forecast => forecast.Id == weatherForecastId))
            {
                return false;
            }

            return TrySerialize(forecasts.Where(forecast => forecast.Id != weatherForecastId));
        }

        private bool TrySerialize(object objectToSerialize)
        {
            bool success = false;

            lock (_lock)
            {
                try
                {
                    var jsonText = JsonSerializer.Serialize(objectToSerialize);

                    StreamWriter streamWriter = new StreamWriter(dataAccessPath);
                    streamWriter.Write(jsonText);
                    streamWriter.Flush();
                    streamWriter.Close();
                    streamWriter.Dispose();

                    success = true;
                }
                catch (Exception)
                {
                    // Suspend any error for now.
                }
            }

            return success;
        }

        private int GenerateId(IEnumerable<WeatherForecastModel> forecastModels)
        {
            int highestId = 1;

            foreach (var model in forecastModels)
            {
                if (highestId < model.Id)
                {
                    highestId = model.Id;
                }
            }

            return highestId + 1;
        }
    }
}
