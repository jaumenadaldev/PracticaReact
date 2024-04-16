import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface HabitacionSingle {
  num: number;
  state: "Libre" | "Ocupada";
}

interface HabitacionesState {
  habitaciones: HabitacionSingle[];
}

const initialState: HabitacionesState = {
  habitaciones: Array.from({ length: 10 }, (_, i) => ({
    num: i + 1,
    state: "Libre" as const,
  })),
};


const HabitacionesSlice = createSlice({
  name: 'Habitaciones',
  initialState,
  reducers: {
    setHabitaciones: (state, action: PayloadAction<{ num: number; state: "Libre" | "Ocupada" }[]>) => {
      action.payload.forEach(update => {
        const habitacion = state.habitaciones.find(h => h.num === update.num);
        if (habitacion) {
          habitacion.state = update.state;
        }
      });
    },
  },
});

export const { setHabitaciones } = HabitacionesSlice.actions;
export const selectHabitaciones = (state: { Habitaciones: HabitacionesState }) => state.Habitaciones;
export default HabitacionesSlice.reducer;