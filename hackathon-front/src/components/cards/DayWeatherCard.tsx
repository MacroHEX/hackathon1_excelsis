import {Badge, Card} from "@tremor/react";
import {RiSnowflakeLine, RiThermometerLine} from "@remixicon/react";
import {useWeatherStore} from "@/store/weatherStore.ts";
import {useEffect, useState} from "react";
import {CloudLightning, CloudRain, CloudSnow, CloudSun, Cloudy, Sun} from "lucide-react";
import {useTemperatureStore} from "@/store/temperatureStore.ts";

interface Props {
  index: number;
}

type AlertType = "ÓPTIMO" | "PRECAUCIÓN" | "PELIGROSO";

const alertColors: Record<AlertType, string> = {
  "ÓPTIMO": "emerald",
  "PRECAUCIÓN": "amber",
  "PELIGROSO": "rose"
};

const weatherIcons = [
  {
    id: 1,
    component: <CloudRain className='my-4 w-14 h-14'/>
  },
  {
    id: 2,
    component: <Cloudy className='my-4 w-14 h-14'/>
  },
  {
    id: 3,
    component: <CloudSun className='my-4 w-14 h-14'/>
  },
  {
    id: 4,
    component: <Sun className='my-4 w-14 h-14'/>
  },
  {
    id: 5,
    component: <CloudLightning className='my-4 w-14 h-14'/>
  },
  {
    id: 6,
    component: <CloudSnow className='my-4 w-14 h-14'/>
  },
]

const DayWeatherCard = ({index}: Props) => {

  const {weather} = useWeatherStore();
  const {unit} = useTemperatureStore();

  const [dayOfWeek, setDayOfWeek] = useState('');
  const [formattedDate, setFormattedDate] = useState('');

  const weatherIconComponent = weatherIcons.find(icon => icon.id === weather!.departamento_list[0].pronostico_extendido_list[index].clima[0].id)?.component;

  useEffect(() => {
    const date = new Date(weather!.departamento_list[0].pronostico_extendido_list[index].fecha_hora_txt);
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    const day = days[date.getDay()];
    setDayOfWeek(day);

    // Formateo date en "dd/mm/yyyy"
    const dayOfMonth = date.getDate();
    const monthName = date.getMonth();
    const year = date.getFullYear();
    const dateWithFormat = `${dayOfMonth}/${monthName}/${year}`;
    setFormattedDate(dateWithFormat);
  }, [index, weather]);


  return (
    <Card className="mx-auto max-w-fit md:max-w-fit text-[#47517d]">
      <div className='flex justify-center items-center'>
        {weatherIconComponent}
      </div>

      <div className='flex justify-center items-center text-center gap-4'>
        <div>
          <p>
            {weather!.departamento_list[0].pronostico_extendido_list[index].main.temp_max}
            <span className='text-xs font-medium'>°{unit}</span>
          </p>
          <span className='flex gap-2'> <RiThermometerLine className='text-[#FF6B6C]'/>  Max.</span>
        </div>
        <div>
          <p>
            {weather!.departamento_list[0].pronostico_extendido_list[index].main.temp_min}
            <span className='text-xs font-medium'>°{unit}</span>
          </p>
          <span className='flex gap-2'> <RiSnowflakeLine className='text-[#898fe3]'/>  Min.</span>
        </div>
      </div>
      <div className='text-center mt-4'>
        <h2 className='font-bold'>{dayOfWeek}</h2>
        <h5 className='font-bold'>{formattedDate}</h5>
      </div>
      <div className='flex justify-center'>
        <Badge
          color={alertColors[weather!.departamento_list[0].pronostico_extendido_list[index].alert.toUpperCase() as AlertType] || 'gray'}
          className='text-center mt-4 px-4 py-2'>
          {weather!.departamento_list[0].pronostico_extendido_list[index].alert.toUpperCase()}
        </Badge>
      </div>
    </Card>
  );
};

export default DayWeatherCard;