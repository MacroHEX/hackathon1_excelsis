import create from 'zustand';

interface TemperatureState {
  unit: 'C' | 'F';
  toggleUnit: () => void;
}

export const useTemperatureStore = create<TemperatureState>((set) => ({
  unit: 'C',
  toggleUnit: () => set((state) => ({unit: state.unit === 'C' ? 'F' : 'C'}))
}));
