using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication2.Models;
using WebApplication2.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherController : ControllerBase
    {
        IWeatherForecastService weatherForecastService;

        public WeatherController()
        {
            this.weatherForecastService = new WeatherForecastService();
        }

        // GET: api/<WeatherController>
        [HttpGet]
        public IEnumerable<WeatherForecastModel> Get()
        {
            return weatherForecastService.GetWeatherForecasts();
        }

        // GET api/<WeatherController>/5
        [HttpGet("{id}")]
        public WeatherForecastModel Get(int id)
        {
            return weatherForecastService.GetWeatherForecasts().First(forecast => forecast.Id == id);
        }

        // POST api/<WeatherController>
        [HttpPost]
        public void Post([FromBody] WeatherForecastModel value)
        {
            weatherForecastService.CreateNewForecast(value);
        }

        // PUT api/<WeatherController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] WeatherForecastModel value)
        {
            weatherForecastService.UpdateWeatherForecast(value, id);
        }

        // DELETE api/<WeatherController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            weatherForecastService.DeleteWeatherForecast(id);
        }
    }
}
