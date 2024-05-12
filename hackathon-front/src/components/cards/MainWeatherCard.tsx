import {Badge, Card} from '@tremor/react';
import {RiDropLine, RiHome4Fill, RiRainyLine, RiWindyFill} from "@remixicon/react";
import {useDeparmentStore} from "@/store/departmentsStore.ts";
import {useWeatherStore} from "@/store/weatherStore.ts";
import {useEffect, useState} from "react";
import {useTemperatureStore} from "@/store/temperatureStore.ts";

type AlertType = "ÓPTIMO" | "PRECAUCIÓN" | "PELIGROSO";

const alertColors: Record<AlertType, string> = {
  "ÓPTIMO": "emerald",
  "PRECAUCIÓN": "amber",
  "PELIGROSO": "rose"
};

const MainWeatherCard = () => {

  const {selectedDepartment} = useDeparmentStore();
  const {weather} = useWeatherStore();
  const {unit} = useTemperatureStore();


  const [dayOfWeek, setDayOfWeek] = useState('');
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {

    if (weather?.departamento_list) {

      const dateTime = weather!.departamento_list[0].pronostico_extendido_list[0].fecha_hora_txt;
      const date = new Date(dateTime);

      const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

      const day = days[date.getDay()];
      setDayOfWeek(day);

      // Formateo date en "dd de mm, yyyy"
      const dayOfMonth = date.getDate();
      const monthName = months[date.getMonth()];
      const year = date.getFullYear();
      const dateWithFormat = `${dayOfMonth} de ${monthName}, ${year}`;
      setFormattedDate(dateWithFormat);
    }

  }, [weather, selectedDepartment]);

  return (
    <>
      {weather &&
          <Card
              className="mx-auto max-w-xs md:max-w-2xl mt-8 text-[#47517d] bg-[#f5f8fe] flex flex-col justify-center items-center md:justify-start md:items-start"
              decoration="bottom"
              decorationColor={alertColors[weather!.departamento_list[0].pronostico_extendido_list[0].alert.toUpperCase() as AlertType] || 'gray'}
          >
              <div className='flex flex-col flex-wrap gap-1'>
                  <h1 className='flex gap-2 items-center text-bold text-lg sm:text-xl'>
                      <RiHome4Fill size={24}/> - {selectedDepartment?.nombre}
                  </h1>
                  <h2>
                    {weather?.departamento_list[0].pronostico_extendido_list[0].dia_text.toUpperCase()}, {dayOfWeek}
                  </h2>
                  <h3>{formattedDate}</h3>
              </div>

              <div className='flex flex-col gap-2'>
                  <h1 className='text-center md:text-start text-4xl sm:text-6xl font-bold'>
                    {(weather?.departamento_list[0].pronostico_extendido_list[0].main.temp)}<span
                      className='text-xl sm:text-2xl align-top font-medium'>°{unit}</span>
                  </h1>
                  <h2 className='text-2xl sm:text-4xl font-bold'>Estado del tiempo</h2>
              </div>

              <Badge
                  className='my-4'
                  color={alertColors[weather!.departamento_list[0].pronostico_extendido_list[0].alert.toUpperCase() as AlertType] || 'gray'}>
                {weather?.departamento_list[0].pronostico_extendido_list[0].alert.toUpperCase()}
              </Badge>

              <div className='flex flex-col md:flex-row gap-2'>
                  <div className='flex gap-2'>
                      <RiWindyFill/>
                      <p>Viento</p> {weather.departamento_list[0].pronostico_extendido_list[0].viento.velocidad} km/h
                  </div>
                  <p className='hidden md:flex'>|</p>
                  <div className='flex gap-2'>
                      <RiDropLine/>
                      <p>Humedad</p> {weather.departamento_list[0].pronostico_extendido_list[0].main.humedad}%
                  </div>
                  <p className='hidden md:flex'>|</p>
                  <div className='flex gap-2'>
                      <RiRainyLine/>
                      <p>Precipitaciones</p> {weather.departamento_list[0].pronostico_extendido_list[0].probabilidad_precipitacion}%
                  </div>
              </div>

          </Card>
      }
    </>
  );
};

export default MainWeatherCard;