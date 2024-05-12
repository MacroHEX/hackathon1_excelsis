package com.py.hackathon.weatherAlerts.services;

import com.py.hackathon.weatherAlerts.models.Departamento;
import com.py.hackathon.weatherAlerts.models.Response;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;

@Service
public class DepartamentsService {

    private final WebClient webClient;

    public DepartamentsService(WebClient webClient) {
        this.webClient = webClient;
    }

    public ArrayList<Departamento> getDepartamentos() {
        Response response = webClient.get()
                .retrieve()
                .bodyToMono(Response.class)
                .block();

        ArrayList<Departamento> departamentos = new ArrayList<>();

        if (response != null) {
            response.getDepartamento_list().forEach(departamentoList -> {
                Departamento departamento = new Departamento(
                        departamentoList.getId(),
                        departamentoList.getNombre(),
                        departamentoList.getpoblacion(),
                        departamentoList.getCoord()
                );
                departamentos.add(departamento);
            });
        }

        return departamentos;
    }
}
