import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductManager from './ProductManager';

test('renderiza el componente ProductManager', () => {
    render(<ProductManager />);

    expect(screen.getByText(/Gestor de Productos/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ingresa el nombre del producto/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Buscar productos/i)).toBeInTheDocument();
    expect(screen.getByText(/Agregar Producto/i)).toBeInTheDocument();
});

test('puede agregar un producto a la lista', () => {
    render(<ProductManager />);

    const input = screen.getByPlaceholderText(/Ingresa el nombre del producto/i);
    const addButton = screen.getByText(/Agregar Producto/i);

    fireEvent.change(input, { target: { value: 'Ordenador' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Ordenador')).toBeInTheDocument();
});

test('puede borrar un producto de la lista', () => {
    render(<ProductManager />);

    const input = screen.getByPlaceholderText(/Ingresa el nombre del producto/i);
    const addButton = screen.getByText(/Agregar Producto/i);

    fireEvent.change(input, { target: { value: 'Zapato' } });
    fireEvent.click(addButton);

    const removeButton = screen.getByText(/Eliminar/i);

    fireEvent.click(removeButton);

    expect(screen.queryByText('Zapato')).not.toBeInTheDocument();
});

test('puede buscar un producto en la lista', () => {
    render(<ProductManager />);
    
    const input = screen.getByPlaceholderText(/Ingresa el nombre del producto/i);
    const addButton = screen.getByText(/Agregar Producto/i);

    fireEvent.change(input, { target: { value: 'Zapato' } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: 'Calcetin' } });
    fireEvent.click(addButton);

    const searchInput = screen.getByPlaceholderText(/Buscar Productos/i);
    fireEvent.change(searchInput, { target: { value: 'Zapato' } });

    expect(screen.getByText('Zapato')).toBeInTheDocument();
    expect(screen.queryByText('Calcetin')).not.toBeInTheDocument();
});

test('limpia el input después de agregar un producto', () => {
    render(<ProductManager />);

    const input = screen.getByPlaceholderText(/Ingresa el nombre del producto/i);
    const addButton = screen.getByText(/Agregar Producto/i);

    fireEvent.change(input, { target: { value: 'Zapato' } });
    fireEvent.click(addButton);

    expect(input).toHaveValue('');
});