import create from 'zustand';
import {devtools} from 'zustand/middleware';
import {WeatherResponse} from "@/interfaces/IWeather.ts";
import {useTemperatureStore} from "@/store/temperatureStore.ts";

interface WeathersState {
  weather: WeatherResponse | null;
  setWeather: (weather: WeatherResponse) => void;
  convertTemperatures: () => void;
}

const convertTemperature = (tempCelsius: number, toFahrenheit: boolean): number => {
  return toFahrenheit ? Number(((tempCelsius * 9 / 5) + 32).toFixed(2)) : tempCelsius;
};

export const useWeatherStore = create<WeathersState>()(
  devtools((set, get) => ({
    weather: null,
    setWeather: (weather: WeatherResponse) => {
      const {unit} = useTemperatureStore.getState();
      if (unit === 'F') {
        weather = convertAllTemperatures(weather, true);
      }
      set({weather});
    },
    convertTemperatures: () => {
      const {weather} = get();
      if (weather) {
        const {unit} = useTemperatureStore.getState();
        const toFahrenheit = unit === 'F';
        const convertedWeather = convertAllTemperatures(weather, toFahrenheit);
        set({weather: convertedWeather});
      }
    }
  }))
);

const convertAllTemperatures = (weather: WeatherResponse, toFahrenheit: boolean): WeatherResponse => {
  weather.departamento_list.forEach(departamento => {
    departamento.pronostico_extendido_list.forEach(pronostico => {
      pronostico.main.temp = convertTemperature(pronostico.main.temp, toFahrenheit);
      pronostico.main.temp_min = convertTemperature(pronostico.main.temp_min, toFahrenheit);
      pronostico.main.temp_max = convertTemperature(pronostico.main.temp_max, toFahrenheit);
    });
  });
  return weather;
};
