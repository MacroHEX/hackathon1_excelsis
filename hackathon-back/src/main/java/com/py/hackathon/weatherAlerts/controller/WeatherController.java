package com.py.hackathon.weatherAlerts.controller;

import com.py.hackathon.weatherAlerts.models.Response;
import com.py.hackathon.weatherAlerts.models.WeatherResponse;
import com.py.hackathon.weatherAlerts.services.WeatherService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/weather")
@CrossOrigin({"http://localhost:5173"})
public class WeatherController {

    // ::: inyection
    //
    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    // ::: api
    //
    @GetMapping()
    public WeatherResponse getWeather() {
        return weatherService.getWeather();
    }

    @GetMapping("{id}")
    public WeatherResponse getWeatherById(@PathVariable("id") Integer id) {
        return weatherService.getWeatherById(id);
    }
}
