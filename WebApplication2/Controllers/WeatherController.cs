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
        public IActionResult Get(int id)
        {
            WeatherForecastModel model = new WeatherForecastModel() { Id = id };

            try
            {
                weatherForecastService.GetWeatherForecasts().First(forecast => forecast.Id == id);                
            }
            catch (InvalidOperationException)
            {
                return NotFound(model);
            }

            return Ok(model);
        }

        // POST api/<WeatherController>
        [HttpPost]
        public IActionResult Post([FromBody] WeatherForecastModel value)
        {
            var model = weatherForecastService.CreateNewForecast(value);

            if (model == null)
            {
                return BadRequest(value);
            }

            return Created("api/[controller]/" + model.Id, model);
        }

        // PUT api/<WeatherController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] WeatherForecastModel value)
        {
            if (weatherForecastService.UpdateWeatherForecast(value, id))
            {
                return Ok(value);
            }

            return NotFound(value);            
        }

        // DELETE api/<WeatherController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (weatherForecastService.DeleteWeatherForecast(id))
            {
                return Ok(id);
            }

            return NotFound(id);
        }
    }
}
