package com.py.hackathon.weatherAlerts.controller;

import com.py.hackathon.weatherAlerts.models.Departamento;
import com.py.hackathon.weatherAlerts.services.DepartamentsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/v1/departamentos")
@CrossOrigin({"http://localhost:5173"})
public class DepartamentController {

    // ::: inyection
    //
    private final DepartamentsService departamentsService;

    public DepartamentController(DepartamentsService departamentsService) {
        this.departamentsService = departamentsService;
    }


    // ::: api
    //
    @GetMapping()
    public ArrayList<Departamento> getWeather() {
        return departamentsService.getDepartamentos();
    }
}
