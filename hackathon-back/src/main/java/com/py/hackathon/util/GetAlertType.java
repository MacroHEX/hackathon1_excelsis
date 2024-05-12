package com.py.hackathon.util;

import com.py.hackathon.weatherAlerts.models.PronosticoExtendidoList;

import java.util.ArrayList;
import java.util.List;

public class GetAlertType {
    public static List<String> getAlertType(PronosticoExtendidoList[] weatherDataPerDay) {
        List<String> dailyAlerts = new ArrayList<>();

        for (PronosticoExtendidoList day : weatherDataPerDay) {
            double windSpeed = day.getViento().getVelocidad();
            double tempMax = day.getMain().getTemp_max();
            double precipProbability = day.getProbabilidad_precipitacion();

            String alert;
            if (tempMax > 35 || windSpeed > 75 || precipProbability > 0.8) {
                alert = "peligroso";
            } else if (windSpeed > 50 || tempMax > 30 || precipProbability > 0.6) {
                alert = "precaución";
            } else {
                alert = "óptimo";
            }
            dailyAlerts.add(alert);
        }

        return dailyAlerts;
    }
}
