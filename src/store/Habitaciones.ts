import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface HabitacionSingle{
    num: number,
    state: "Libre" | "Ocupada"
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
    initialState:initialState,
    reducers: {
        setHabitaciones: (state, action: PayloadAction<HabitacionSingle>) => {
            const habitacionToUpdate = state.habitaciones.find(
                habitacion => habitacion.num === action.payload.num
            );
            if (habitacionToUpdate) {
                habitacionToUpdate.state = action.payload.state; 
            }
        },
        cancelarReserva: (state, action: PayloadAction<number>) => {
      const habitacionToUpdate = state.habitaciones.find(
        (habitacion) => habitacion.num === action.payload
      );
      if (habitacionToUpdate) {
        habitacionToUpdate.state = "Libre";
      }
    },
    },
});

export const { setHabitaciones, cancelarReserva } = HabitacionesSlice.actions;
export const selectHabitaciones = (state: { Habitaciones: HabitacionesState }) => state.Habitaciones;
export default HabitacionesSlice.reducer;