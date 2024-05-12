import {Departamento} from "@/interfaces/IDepartamentos.ts";
import {create} from "zustand";
import {devtools} from "zustand/middleware";

interface DepartmentState {
  departments: Departamento[];
  selectedDepartment: Departamento | null;
  setDepartments: (departments: Departamento[]) => void;
  setSelectedDepartment: (department: Departamento | null) => void;
}

export const useDeparmentStore = create<DepartmentState>()(
  devtools((set) => ({
    departments: [],
    selectedDepartment: null,
    setDepartments: (departments: Departamento[]) => {
      set({departments});
    },
    setSelectedDepartment: (department: Departamento | null) => {
      set({selectedDepartment: department});
    },
  }))
);