import styled from '@emotion/styled'
import { useSelector, useDispatch } from "react-redux";
import { HabitacionSingle, setHabitaciones, selectHabitaciones, cancelarReserva } from "../src/store/Habitaciones";
import { useState } from "react";
import logo from './img/logo-iberostar.jpg';

const Form = styled.form({
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center',
  marginBottom: '40px',
})

const Div = styled.div({
  display: 'grid', 
  justifyContent: 'center', 
  alignItems: 'center', 
  border: '3px solid black', 
  borderRadius: '10px', 
  width: '300px',
})

const RoomDiv = styled.div<{ isFirst: boolean }>`
  margin-bottom: 10px;
  margin-top: ${props => props.isFirst ? '20px' : '0'};
`;

const Label = styled.label({
  color: 'black',
  marginBottom: '10px',
})

const RoomState = styled.span<{ state: 'Libre' | 'Ocupada' }>`
  color: ${props => props.state === 'Libre' ? 'green' : 'red'};
`;

const Button = styled.button<{ isSubmit?: boolean }>`
  margin-left: 10px;
  background-color: ${props => props.isSubmit ? 'green' : 'red'};
  color: white;
`;

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
  setCheckedRooms([]);
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
  <>
  <img src={logo} alt="Logo de Iberostar" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '30%' }} />
    <Form onSubmit={Submit2}>
      <Div>
        {habitaciones.map((habitacion: HabitacionSingle, index: number) => (
          <RoomDiv key={habitacion.num} isFirst={index === 0}>
            <Label>
              <input type="checkbox" onChange={e => handleCheckboxChange(e, habitacion.num)} />
              Habitación {habitacion.num} | <RoomState state={habitacion.state}>{habitacion.state}</RoomState>
            </Label>
          </RoomDiv>
        ))}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100px', margin: '20px auto' }}>
          <Button type="submit" isSubmit>Reservar</Button>
          <Button onClick={handleCancelClick}>Cancelar</Button>
        </div>
      </Div>
    </Form>
    </>
  );
}
