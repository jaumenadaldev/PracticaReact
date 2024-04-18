import React, { useMemo } from 'react';
import { Field } from 'formik';
import styled from '@emotion/styled';

interface CambioEstadoProps {
    number: number;
    estado: 'Libre' | 'Ocupada';
}

interface RoomStatusProps {
  estado: 'Libre' | 'Ocupada';
}

const RoomStatus = styled.span<RoomStatusProps>(
  {
    fontWeight: 'bold',
  },
  props => ({
    color: props.estado === 'Libre' ? 'green' : 'red'
  })
);

const CambioEstado: React.FC<CambioEstadoProps> = ({ number, estado }) => {

    const label = useMemo(() => {
        return `Habitación ${number}: ${estado}`;
    }, [number, estado]);

    return (
        <div>
            <label>{label}: <RoomStatus estado={estado}>{estado}</RoomStatus></label>
            <Field name={`room-${number}`} type="checkbox" />
        </div>
    );
};

export default CambioEstado;
