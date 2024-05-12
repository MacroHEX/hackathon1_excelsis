import {MainLayout} from "@/layout/MainLayout.tsx";
import {useEffect} from "react";
import axios from "axios";
import MainWeatherCard from "@/components/cards/MainWeatherCard.tsx";
import {useDeparmentStore} from "@/store/departmentsStore.ts";
import {useWeatherStore} from "@/store/weatherStore.ts";
import ForecastCard from "@/components/cards/ForecastCard.tsx";
import {useTemperatureStore} from "@/store/temperatureStore.ts";

export const Home = () => {

  const {selectedDepartment} = useDeparmentStore();
  const {setWeather} = useWeatherStore();
  const {unit} = useTemperatureStore();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios.get(!selectedDepartment?.id ? `${baseUrl}/weather` : `${baseUrl}/weather/${selectedDepartment.id}`).then(response => {
      setWeather(response.data);
    })
  }, [baseUrl, selectedDepartment, setWeather, unit]);

  return (
    <MainLayout>
      {selectedDepartment &&
          <>
              <MainWeatherCard/>
              <ForecastCard/>
          </>
      }
    </MainLayout>
  );
};