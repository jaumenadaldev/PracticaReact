import React from 'react';
import styled from '@emotion/styled';

interface ButtonGroupProps {
  backgroundColor?: string;
}

const ButtonGroup = styled.div<ButtonGroupProps>(
  {
    display: 'flex',
    justifyContent: 'center',
    margin: '16px',
    padding: '8px',
  },
  props => ({
    backgroundColor: props.backgroundColor || '#f8f9fa',
  })
);

interface ButtonProps {
  backgroundColor?: string;
  color?: string;
  hoverColor?: string;
  disabledBackgroundColor?: string;
  onClick: () => void; // Función para manejar el clic del botón
  disabled?: boolean; // Propiedad opcional para deshabilitar el botón
}

const Button = styled.button<ButtonProps>(
  {
    borderRadius: '5px',
    padding: '8px',
    margin: '0 5px',
    cursor: 'pointer',
  },
  props => ({
    backgroundColor: props.backgroundColor || '#f8f9fa',
    color: props.color || 'black',
    '&:hover:not(:disabled)': {
      backgroundColor: props.hoverColor || 'green',      
    },
    '&:disabled': {
      backgroundColor: props.disabledBackgroundColor || 'gray',
      cursor: 'not-allowed',
    }
  })
);

interface ButtonsAxiosProps {
  onPageChange: (newPage: number) => void; // Función para cambiar la página
  currentPage: number; // Página actual
}

const ButtonsAxios: React.FC<ButtonsAxiosProps> = ({ onPageChange, currentPage }) => {
  return (
    <ButtonGroup>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </Button>
      <Button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        First Page
      </Button>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next Page
      </Button>
    </ButtonGroup>
  );
}

export default ButtonsAxios;