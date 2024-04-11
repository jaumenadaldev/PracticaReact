import { useSelector } from "react-redux";
import { HabitacionSingle } from "../src/store/Habitaciones";
import { RootState } from "../src/store/store";


export default function Hoteles() {
  const { habitaciones } = useSelector((state: RootState) => state.Habitaciones);

  function Submit2(e: any) {
    e.preventDefault();
    console.log(habitaciones.map((habitacion: HabitacionSingle) => habitacion.state));
  }

  return (
    <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onSubmit={Submit2}>
      <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', border: '3px solid black', borderRadius: '10px', width: '300px' }}>
        {habitaciones.map((habitacion: HabitacionSingle) => (
          <div key={habitacion.num} style={{ marginBottom: '10px' }}>
            <label style={{ color: 'green' }}>
              <input type="checkbox" />
              Habitación {habitacion.num} | {habitacion.state}
            </label>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100px', margin: '20px auto' }}>
          <input style={{ marginRight: '10px', marginLeft: '-30px' }} type="submit" value="Submit" />
          <button style={{ marginLeft: '10px' }}>Cancelar reserva</button>
        </div>
      </div>
    </form>
  );
}