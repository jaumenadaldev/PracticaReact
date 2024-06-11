import React, { useState, ChangeEvent } from "react";

interface Booking {
    id: number,
    guestName: string,
    roomNumber: number,
    date: string
}

const HotelBookingManager : React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [guestName, setGuestName] = useState<string>('');
    const [roomNumber, setRoomNumber] = useState<number | ''>('');
    const [date, setDate] = useState<string>('');
    const [search, setSearch] = useState<string>('');

    const addBooking = () => {
        if (guestName.trim() && roomNumber && date.trim()) {
            setBookings([...bookings, { id: Date.now(), guestName, roomNumber: Number(roomNumber), date }]);
            setGuestName('');
            setRoomNumber('');
            setDate('');
        }
    };

    const removeBooking = (id: number) => {
        setBookings(bookings.filter(booking => booking.id !== id));
    };

    const filteredBookings = bookings.filter(booking =>
         booking.guestName.toLowerCase().includes(search.toLowerCase())
    );

    const handleGuestNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGuestName(event.target.value);
    };

    const handleRoomNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRoomNumber(Number(event.target.value));
    };

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        <div>
            <h1>Gestor de Reservas de Hotel</h1>
            <input
                type="text"
                value={guestName}
                onChange={handleGuestNameChange}
                placeholder="Nombre del huésped"
            />
            <input
                type="number"
                value={roomNumber}
                onChange={handleRoomNumberChange}
                placeholder="Número de habitación"
            />
            <input
                type="date"
                value={date}
                onChange={handleDateChange}
                placeholder="Fecha de la reserva"
            />
            <button onClick={addBooking}>Agregar Reserva</button>
            <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Buscar Reservas"
            />
            <ul>
                {filteredBookings.map(booking => (
                    <li key={booking.id}>
                        - Nombre de la reserva: {booking.guestName} - Habitación: {booking.roomNumber} - Fecha: {booking.date}
                        <button onClick={() => removeBooking(booking.id)}>Cancelar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HotelBookingManager;