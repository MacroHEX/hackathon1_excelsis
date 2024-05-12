import {useWeatherStore} from "@/store/weatherStore.ts";
import {Card} from "@tremor/react";
import DayWeatherCard from "@/components/cards/DayWeatherCard.tsx";

const ForecastCard = () => {

  const {weather} = useWeatherStore();

  return (
    <>
      {weather &&
          <Card
              className="flex flex-col justify-center items-center mx-auto max-w-xs md:max-w-2xl mt-8 text-[#47517d] bg-[#f5f8fe]"
          >
              <h2 className='m-0 p-0 text-2xl font-bold'>
                  Previsión Prox. 3 días
              </h2>

            {weather &&
                <div className='flex flex-col md:flex-row gap-2 pt-6'>
                  {weather.departamento_list[0].pronostico_extendido_list.slice(1).map((_, index) =>
                    <DayWeatherCard key={index} index={index}/>
                  )}
                </div>
            }

          </Card>
      }
    </>
  );
};

export default ForecastCard;