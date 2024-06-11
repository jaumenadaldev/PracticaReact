import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import UserListManager from './UserListManager';

beforeAll(() => {
    fetchMock.enableMocks();
})

beforeEach(() => {
  fetchMock.resetMocks();
});
 
test('renderiza el componente UserListManager y carga usuarios', async () => {
  const users = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
  fetchMock.mockResponseOnce(JSON.stringify(users));
 
  render(<UserListManager />);
 
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
 
  await waitFor(() => expect(screen.getByText(/John Doe/i)).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument());
});
 
test('muestra un mensaje de error si la carga falla', async () => {
  fetchMock.mockRejectOnce(new Error('Error fetching users'));
 
  render(<UserListManager />);
 
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
 
  await waitFor(() => expect(screen.getByText(/Error: Error fetching users/i)).toBeInTheDocument());
});