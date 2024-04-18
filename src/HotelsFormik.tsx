import { useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHabitaciones, selectHabitaciones, HabitacionSingle } from "../src/store/Habitaciones";
import styled from '@emotion/styled';
import logo from './img/logo-iberostar.jpg';
import { Formik, Form } from 'formik';
import CambioEstado from "./CambioEstado";

interface RoomContainerProps {
  isFirst: boolean;
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

  interface FormValues {
  [key: string]: boolean;
}

  const handleFormSubmit = (values : FormValues) => {

    const updatedRooms = habitaciones.filter(room => values[`room-${room.num}`]).map(room => ({
      num: room.num,
      state: room.state === 'Libre' ? 'Ocupada' : 'Libre' as 'Libre' | 'Ocupada'
    }));
    if (updatedRooms.length > 0) {
      dispatch(setHabitaciones(updatedRooms));
    }
    console.log(updatedRooms); 
  };

  const initialValues = useMemo(() => habitaciones.reduce((acc, curr) => ({
    ...acc, [`room-${curr.num}`]: false
  }), {}), [habitaciones]);

  const roomListMemo = useMemo(() => habitaciones.map((habitacion, index) => (
    <RoomContainer key={habitacion.num} isFirst={index === 0}>
      <RoomLabel>
        <CambioEstado number={habitacion.num} estado={habitacion.state} />
      </RoomLabel>
    </RoomContainer>
  )), [habitaciones]);

return (
    <>
      <HotelLogo src={logo} alt="Logo de Iberostar" />
      <FormWrapper>
        <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
          <Form>
            <RoomListWrapper>
              {roomListMemo}
              <SubmitButton type="submit">Cambiar Estado</SubmitButton>
            </RoomListWrapper>
          </Form>
        </Formik>
      </FormWrapper>
    </>
  );
}