import { useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHabitaciones, selectHabitaciones, HabitacionSingle } from "../src/store/Habitaciones";
import styled from '@emotion/styled';
import logo from './img/logo-iberostar.jpg';
import { useForm, Controller } from 'react-hook-form';

interface RoomContainerProps {
  isFirst: boolean;
}

interface RoomStatusProps {
  state: 'Libre' | 'Ocupada';
}

const HotelLogo = styled.img({
  display: 'block', 
  marginLeft: 'auto', 
  marginRight: 'auto', 
  width: '30%',
});

const FormWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  marginBottom: '30px',
});

const RoomListWrapper = styled.div({
  display: 'grid', 
  justifyContent: 'center', 
  alignItems: 'center', 
  border: '3px solid black', 
  borderRadius: '10px', 
  width: '300px',
});

const RoomContainer = styled.div<RoomContainerProps>(
  {
    marginBottom: '10px',
  },
  props => ({
    marginTop: props.isFirst ? '20px' : '0'
  })
);

const RoomLabel = styled.label({
  color: 'black',
  marginBottom: '10px',
});

const RoomStatus = styled.span<RoomStatusProps>(
  {
    fontWeight: 'bold',
  },
  props => ({
    color: props.state === 'Libre' ? 'green' : 'red'
  })
);

const SubmitButton = styled.button(
  {
    backgroundColor: 'black',
    color: 'white',
    padding: '10px 20px',
    marginTop: '20px',
    marginBottom: '20px',
  }
);

export default function HotelManagement() {
  const dispatch = useDispatch();
  const { habitaciones } = useSelector(selectHabitaciones);
  const initialRoomStateRef = useRef<HabitacionSingle[]>([]);

  useEffect(() => {
    initialRoomStateRef.current = habitaciones.map(room => ({ ...room }));
  }, [habitaciones]);

  const { handleSubmit, control } = useForm();

  const handleFormSubmit = (data: { [key: string]: boolean }) => {
    const updatedRooms = habitaciones.filter(room => data[`room-${room.num}`]).map(room => {
      const newState = room.state === 'Libre' ? 'Ocupada' : 'Libre' as 'Libre' | 'Ocupada';
      return { num: room.num, state: newState };
    });

    if (updatedRooms.length > 0) {
      dispatch(setHabitaciones(updatedRooms));
    }
    console.log("Habitaciones cambiadas:");
    console.log(updatedRooms);
  };

  const roomListMemo = useMemo(() => habitaciones.map((habitacion, index) => (
    <RoomContainer key={habitacion.num} isFirst={index === 0}>
      <RoomLabel>
        Habitación {habitacion.num} | <RoomStatus state={habitacion.state}>{habitacion.state}</RoomStatus>
        <Controller
          name={`room-${habitacion.num}`}
          control={control}
          defaultValue={false}
          render={({ field }) => <input type="checkbox" {...field} />}
        />
      </RoomLabel>
    </RoomContainer>
  )), [habitaciones, control]);

  return (
    <>
      <HotelLogo src={logo} alt="Logo de Iberostar" />
      <FormWrapper>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <RoomListWrapper>
            {roomListMemo}
            <SubmitButton type="submit">Cambiar Estado</SubmitButton>
          </RoomListWrapper>
        </form>
      </FormWrapper>
    </>
  );
}