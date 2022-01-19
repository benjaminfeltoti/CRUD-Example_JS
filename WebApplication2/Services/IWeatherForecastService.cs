using System.Collections.Generic;
using WebApplication2.Models;

namespace WebApplication2.Services
{
    public interface IWeatherForecastService
    {
        WeatherForecastModel CreateNewForecast(WeatherForecastModel model);

        IEnumerable<WeatherForecastModel> GetWeatherForecasts();

        bool UpdateWeatherForecast(WeatherForecastModel weatherForecastModel, int weatherForecastId);

        void ChangeWeatherForecast(int weatherForecastId, string propertyName, string newValue);

        bool DeleteWeatherForecast(int weatherForecastId);
    }
}