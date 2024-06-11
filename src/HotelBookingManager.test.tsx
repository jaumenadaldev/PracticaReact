import { render, screen, fireEvent } from '@testing-library/react';
import HotelBookingManager from './HotelBookingManager';
import '@testing-library/jest-dom';

test('renderiza el componente HotelBookingManager', () => {
    render(<HotelBookingManager />);

    expect(screen.getByText(/Gestor de Reservas de Hotel/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Nombre del huésped/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Número de habitación/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Fecha de la reserva/i)).toBeInTheDocument();
    expect(screen.getByText(/Agregar Reserva/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Buscar Reservas/i)).toBeInTheDocument();
});

test('puede agregar una reserva a la lista', () => {
    render(<HotelBookingManager />);

    const guestNameInput = screen.getByPlaceholderText(/Nombre del huésped/i) as HTMLInputElement;
    const roomNumberInput = screen.getByPlaceholderText(/Número de Habitación/i) as HTMLInputElement;
    const dateInput = screen.getByPlaceholderText(/Fecha de la reserva/i) as HTMLInputElement;
    const addButton = screen.getByText(/Agregar Reserva/i);

    fireEvent.change(guestNameInput, { target: { value: 'Raúl' } });
    fireEvent.change(roomNumberInput, { target: { value: 1 } });
    fireEvent.change(dateInput, { target: { value: '2022-01-01' } });
    fireEvent.click(addButton);

    expect(screen.getByText('- Nombre de la reserva: Raúl - Habitación: 1 - Fecha: 2022-01-01')).toBeInTheDocument();
});

test ('puede cancelar una reserva de la lista', () => {
    render(<HotelBookingManager />);

    const guestNameInput = screen.getByPlaceholderText(/Nombre del huésped/i) as HTMLInputElement;
    const roomNumberInput = screen.getByPlaceholderText(/Número de Habitación/i) as HTMLInputElement;
    const dateInput = screen.getByPlaceholderText(/Fecha de la reserva/i) as HTMLInputElement;
    const addButton = screen.getByText(/Agregar Reserva/i);

    fireEvent.change(guestNameInput, { target: { value: 'Raúl' } });
    fireEvent.change(roomNumberInput, { target: { value: 1 } });
    fireEvent.change(dateInput, { target: { value: '2022-01-01' } });
    fireEvent.click(addButton);

    const cancelButton = screen.getByText(/Cancelar/i);
    fireEvent.click(cancelButton);

    expect(screen.queryByText('- Nombre de la reserva: Raúl - Habitación: 1 - Fecha: 2022-01-01')).not.toBeInTheDocument();
});

test ('puede buscar una reserva en la lista', () => {
    render(<HotelBookingManager />);

    const guestNameInput = screen.getByPlaceholderText(/Nombre del huésped/i) as HTMLInputElement;
    const roomNumberInput = screen.getByPlaceholderText(/Número de Habitación/i) as HTMLInputElement;
    const dateInput = screen.getByPlaceholderText(/Fecha de la reserva/i) as HTMLInputElement;
    const addButton = screen.getByText(/Agregar Reserva/i);

    fireEvent.change(guestNameInput, { target: { value: 'Raúl' } });
    fireEvent.change(roomNumberInput, { target: { value: 1 } });
    fireEvent.change(dateInput, { target: { value: '2022-01-01' } });
    fireEvent.click(addButton);

    fireEvent.change(guestNameInput, { target: { value: 'Miguel' } });
    fireEvent.change(roomNumberInput, { target: { value: 2 } });
    fireEvent.change(dateInput, { target: { value: '2022-01-02' } });
    fireEvent.click(addButton);

    const searchInput = screen.getByPlaceholderText(/Buscar Reservas/i);
    fireEvent.change(searchInput, { target: { value: 'Miguel' } });

    expect(screen.getByText('- Nombre de la reserva: Miguel - Habitación: 2 - Fecha: 2022-01-02')).toBeInTheDocument();
    expect(screen.queryByText('- Nombre de la reserva: Raúl - Habitación: 1 - Fecha: 2022-01-01')).not.toBeInTheDocument();
});

test ('limpia el input después de agregar una reserva', () => {
    render(<HotelBookingManager />);

    const guestNameInput = screen.getByPlaceholderText(/Nombre del huésped/i) as HTMLInputElement;
    const roomNumberInput = screen.getByPlaceholderText(/Número de Habitación/i) as HTMLInputElement;
    const dateInput = screen.getByPlaceholderText(/Fecha de la reserva/i) as HTMLInputElement;
    const addButton = screen.getByText(/Agregar Reserva/i);

    fireEvent.change(guestNameInput, { target: { value: 'Raúl' } });
    fireEvent.change(roomNumberInput, { target: { value: 1 } });
    fireEvent.change(dateInput, { target: { value: '2022-01-01' } });
    fireEvent.click(addButton);

    expect(guestNameInput.value).toBe('');
    expect(roomNumberInput.value).toBe('');
    expect(dateInput.value).toBe('');
});