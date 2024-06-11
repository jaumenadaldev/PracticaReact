import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ComponenteLista from './listaModificada';

describe('ComponenteLista', () => {
  test('se renderiza con la lista inicial y alterna entre vistas modificadas', () => {
    render(<ComponenteLista />);

    expect(screen.getByText('Raul (Masculino)')).toBeInTheDocument();


    fireEvent.click(screen.getByText('Modificar Nombres'));

    expect(screen.getByText('Modificado1 (Masculino)')).toBeInTheDocument();
  });
});

describe('ComponenteLista', () => {
  test('se renderiza con la lista inicial y alterna entre vistas modificadas', () => {
    render(<ComponenteLista />);

    expect(screen.getByText('Raul (Masculino)')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Modificar Nombres'));

    expect(screen.queryByText('Raul (Masculino)')).not.toBeInTheDocument();
  });
});