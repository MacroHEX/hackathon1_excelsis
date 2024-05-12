import {Switch} from "@/components/ui/switch.tsx";
import {Link} from "react-router-dom";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

import {useEffect} from "react";
import axios from "axios";
import {Departamento} from "@/interfaces/IDepartamentos.ts";

import logo from "@/assets/imgs/logo.svg";
import {useDeparmentStore} from "@/store/departmentsStore.ts";
import {useTemperatureStore} from "@/store/temperatureStore.ts";

export const Header = () => {

  const {departments, setDepartments, setSelectedDepartment} = useDeparmentStore();
  const {toggleUnit} = useTemperatureStore();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios.get<Departamento[]>(`${baseUrl}/departamentos`).then(response => {
      setDepartments(response.data);
      setSelectedDepartment(response.data[0]);
    })
  }, [baseUrl, setDepartments, setSelectedDepartment]);

  const handleSelectDepartment = (departmentName: string) => {
    const department = departments.find(department => department.nombre === departmentName);
    if (department) {
      setSelectedDepartment(department);
    }
  }

  return (
    <header className='flex justify-around h-14 pt-8'>
      <div className='flex flex-1 justify-center items-center'>
        <Link to='/'>
          <img src={logo} alt="logo" className='w-20 hover:scale-105 inline-block cursor-pointer transition-all'/>
        </Link>
      </div>
      <div className='flex flex-grow justify-center items-center'>
        <Select onValueChange={handleSelectDepartment}>
          <SelectTrigger aria-label="Select department">
            <SelectValue placeholder="Seleccionar departamento"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {departments.map(department => (
                <SelectItem key={department.id} value={department.nombre}>
                  {department.nombre}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className='flex flex-1 justify-center items-center'>
        <Switch onCheckedChange={toggleUnit}/>
      </div>
    </header>
  );
};