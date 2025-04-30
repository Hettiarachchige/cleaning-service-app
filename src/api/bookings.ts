import axios from 'axios';
import { Booking } from '../types/types';

const API_URL = 'http://localhost:3001/bookings';

export const getBookings = async (userId?: number): Promise<Booking[]> => {
  const url = userId ? `${API_URL}?user_id=${userId}` : API_URL;
  const response = await axios.get(url);
  return response.data;
};

export const createBooking = async (booking: Booking) => {
  const response = await axios.post(API_URL, booking);
  return response.data;
};

export const updateBooking = async (id: number, booking: Booking) => {
  const response = await axios.put(`${API_URL}/${id}`, booking);
  return response.data;
};

export const deleteBooking = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};