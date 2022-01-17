using System.Collections.Generic;
using WebApplication2.Models;

namespace WebApplication2.Services
{
    public interface IWeatherForecastService
    {
        void CreateNewForecast(WeatherForecastModel model);

        IEnumerable<WeatherForecastModel> GetWeatherForecasts();

        void UpdateWeatherForecast(WeatherForecastModel weatherForecastModel, int weatherForecastId);

        void ChangeWeatherForecast(int weatherForecastId, string propertyName, string newValue);

        void DeleteWeatherForecast(int weatherForecastId);
    }
}