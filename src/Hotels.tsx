import { useEffect, useRef, useState, useMemo, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHabitaciones, selectHabitaciones, HabitacionSingle } from "../src/store/Habitaciones";
import styled from '@emotion/styled';
import logo from './img/logo-iberostar.jpg';

interface RoomDivProps {
  isFirst: boolean;
}

interface RoomStateProps {
  state: 'Libre' | 'Ocupada';
}

const Logo = styled.img({
  display: 'block', 
  marginLeft: 'auto', 
  marginRight: 'auto', 
  width: '30%',
});

const FormContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  marginBottom: '30px',
});

const RoomListContainer = styled.div({
  display: 'grid', 
  justifyContent: 'center', 
  alignItems: 'center', 
  border: '3px solid black', 
  borderRadius: '10px', 
  width: '300px',
});

const RoomDiv = styled.div<RoomDivProps>(
  {
    marginBottom: '10px',
  },
  props => ({
    marginTop: props.isFirst ? '20px' : '0'
  })
);

const Label = styled.label({
  color: 'black',
  marginBottom: '10px',
});

const RoomState = styled.span<RoomStateProps>(
  {
    fontWeight: 'bold',
  },
  props => ({
    color: props.state === 'Libre' ? 'green' : 'red'
  })
);

const Button = styled.button(
  {
    backgroundColor: 'black',
    color: 'white',
    padding: '10px 20px',
    marginTop: '20px',
    marginBottom: '20px',
  }
);

export default function Hoteles() {
  const dispatch = useDispatch();
  const { habitaciones } = useSelector(selectHabitaciones);
  const [selectedRooms, setSelectedRooms] = useState<{ [key: number]: boolean }>({});
  const initialHabitacionesRef = useRef<HabitacionSingle[]>([]);

  useEffect(() => {
    initialHabitacionesRef.current = habitaciones.map(room => ({ ...room }));
  }, [habitaciones]);

  const handleCheckboxChange = (num: number) => {
    setSelectedRooms(prev => ({
      ...prev,
      [num]: !prev[num]
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedRooms = habitaciones.filter(room => selectedRooms[room.num]).map(room => {
      const newState = room.state === 'Libre' ? 'Ocupada' : 'Libre' as 'Libre' | 'Ocupada';
      return { num: room.num, state: newState };
    });

    if (updatedRooms.length > 0) {
      dispatch(setHabitaciones(updatedRooms));
    }
  };

  const habitacionesMemo = useMemo(() => habitaciones.map((habitacion, index) => (
    <RoomDiv key={habitacion.num} isFirst={index === 0}>
      <Label>
        Habitación {habitacion.num} | <RoomState state={habitacion.state}>{habitacion.state}</RoomState>
        <input
          name={`room-${habitacion.num}`}
          type="checkbox"
          checked={selectedRooms[habitacion.num]}
          onChange={() => handleCheckboxChange(habitacion.num)}
        />
      </Label>
    </RoomDiv>
  )), [habitaciones, selectedRooms]);

  return (
    <>
      <Logo src={logo} alt="Logo de Iberostar" />
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <RoomListContainer>
            {habitacionesMemo}
            <Button type="submit">Cambiar Estado</Button>
          </RoomListContainer>
        </form>
      </FormContainer>
    </>
  );
}