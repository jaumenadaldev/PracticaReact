import { createSlice } from "@reduxjs/toolkit";

interface ChangeRoom{
    payload: {
        num: number,
        state: "Libre" | "Ocupada"
    }
}

export interface HabitacionSingle{
    num: number,
    state: "Libre" | "Ocupada"
}

interface HabitacionesType {
    habitaciones: HabitacionSingle[]
}

const initialHabitaciones: HabitacionSingle[] = [
    {num: 1, state: "Libre"},
    {num: 2, state: "Libre"},
    {num: 3, state: "Libre"},
    {num: 4, state: "Libre"},
    {num: 5, state: "Libre"},
    {num: 6, state: "Libre"},
    {num: 7, state: "Libre"},
    {num: 8, state: "Libre"},
    {num: 9, state: "Libre"},
    {num: 10, state: "Libre"}
]

const initialState: HabitacionesType= {
    habitaciones: initialHabitaciones
}
const HabitacionesSlice = createSlice({
    name: 'Habitaciones',
    initialState:initialState,
    reducers: {
        setHabitaciones: (state, action: ChangeRoom) => {
            const habitacionToUpdate = state.habitaciones.find(habitacion => habitacion.num === action.payload.num);
            if (habitacionToUpdate != undefined) {
                let copyArray = [...state.habitaciones];
                
            }
        }
    }
})

export const { setHabitaciones } = HabitacionesSlice.actions
export default HabitacionesSlice.reducer;