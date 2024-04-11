import { useSelector, useDispatch } from "react-redux";
import { HabitacionSingle, setHabitaciones, selectHabitaciones, cancelarReserva } from "../src/store/Habitaciones";
import { useState } from "react";


export default function Hoteles() {
  const dispatch = useDispatch();
  const { habitaciones } = useSelector(selectHabitaciones);
  const [checkedRooms, setCheckedRooms] = useState<number[]>([]);

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>, num: number) {
    if (e.target.checked) {
      setCheckedRooms(prev => [...prev, num]);
    } else {
      setCheckedRooms(prev => prev.filter(n => n !== num));
    }
  }
  function handleCancelClick() {
  checkedRooms.forEach(num => {
    dispatch(cancelarReserva(num));
  });
  setCheckedRooms([]); // Limpiar las habitaciones seleccionadas
}

  function Submit2(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    checkedRooms.forEach(num => {
      const habitacion = habitaciones.find(h => h.num === num);
      if (habitacion && habitacion.state === "Libre") {
        dispatch(setHabitaciones({ ...habitacion, state: "Ocupada" }));
      }
    });
  }

 return (
    <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onSubmit={Submit2}>
      <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', border: '3px solid black', borderRadius: '10px', width: '300px' }}>
        {habitaciones.map((habitacion: HabitacionSingle) => (
          <div key={habitacion.num} style={{ marginBottom: '10px' }}>
            <label style={{ color: 'green' }}>
              <input type="checkbox" onChange={e => handleCheckboxChange(e, habitacion.num)} />
              Habitación {habitacion.num} | {habitacion.state}
            </label>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100px', margin: '20px auto' }}>
          <input style={{ marginRight: '10px', marginLeft: '-30px' }} type="submit" value="Reservar" />
          <button style={{ marginLeft: '10px' }} onClick={handleCancelClick}>Cancelar reserva</button>
        </div>
      </div>
    </form>
  );
}