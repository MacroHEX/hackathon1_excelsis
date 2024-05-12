package com.py.hackathon.weatherAlerts.services;

import com.py.hackathon.weatherAlerts.models.DepartamentoList;
import com.py.hackathon.weatherAlerts.models.PronosticoExtendidoList;
import com.py.hackathon.weatherAlerts.models.Response;
import com.py.hackathon.weatherAlerts.models.WeatherResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

import static com.py.hackathon.util.GetAlertType.getAlertType;

@Service
public class WeatherService {

    private final WebClient webClient;

    public WeatherService(WebClient webClient) {
        this.webClient = webClient;
    }

    public WeatherResponse getWeather() {
        Response response = webClient.get()
                .retrieve()
                .bodyToMono(Response.class)
                .block();

        if (response != null && response.getDepartamento_list() != null) {
            for (DepartamentoList departamento : response.getDepartamento_list()) {
                PronosticoExtendidoList[] dayArray = new PronosticoExtendidoList[departamento.getPronostico_extendido_list().size()];
                dayArray = departamento.getPronostico_extendido_list().toArray(dayArray);

                List<String> alertTypes = getAlertType(dayArray);

                // Iterate over each day and set its corresponding alert
                int index = 0;
                for (PronosticoExtendidoList day : departamento.getPronostico_extendido_list()) {
                    day.setAlert(alertTypes.get(index));
                    index++;
                }

                WeatherResponse weatherResponse = new WeatherResponse(new ArrayList<>());
                weatherResponse.getDepartamento_list().add(departamento);
                return weatherResponse;
            }
        }
        return null;
    }

    public WeatherResponse getWeatherById(Integer id) {
        Response response = webClient.get()
                .retrieve()
                .bodyToMono(Response.class)
                .block();

        if (response != null && response.getDepartamento_list() != null) {
            for (DepartamentoList departamento : response.getDepartamento_list()) {
                if (departamento.getId() == id) {
                    PronosticoExtendidoList[] dayArray = new PronosticoExtendidoList[departamento.getPronostico_extendido_list().size()];
                    dayArray = departamento.getPronostico_extendido_list().toArray(dayArray);

                    List<String> alertTypes = getAlertType(dayArray);

                    // Iterate over each day and set its corresponding alert
                    int index = 0;
                    for (PronosticoExtendidoList day : departamento.getPronostico_extendido_list()) {
                        day.setAlert(alertTypes.get(index));
                        index++;
                    }

                    WeatherResponse weatherResponse = new WeatherResponse(new ArrayList<>());
                    weatherResponse.getDepartamento_list().add(departamento);
                    return weatherResponse;
                }
            }
        }
        return null;
    }
}
