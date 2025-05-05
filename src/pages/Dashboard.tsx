import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingForm } from '../components/BookingForm';
import { BookingList } from '../components/BookingList';
import { getBookings, createBooking, updateBooking, deleteBooking } from '../api/bookings';
import { Booking } from '../types/types';
import { Box, Typography, Button } from '@mui/material';

export const Dashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const navigate = useNavigate();

 
  const userId = 1;

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getBookings(userId);
      setBookings(data);
    };
    fetchBookings();
  }, [userId]);

  const handleCreate = async (booking: Booking) => {
    const newBooking = await createBooking({ ...booking, user_id: userId });
    setBookings([...bookings, newBooking]);
  };

  const handleUpdate = async (booking: Booking) => {
    if (!booking.id) return;
    const updatedBooking = await updateBooking(booking.id, booking);
    setBookings(bookings.map(b => b.id === booking.id ? updatedBooking : b));
    setEditingBooking(null);
  };

  const handleDelete = async (id: number) => {
    await deleteBooking(id);
    setBookings(bookings.filter(b => b.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Bookings
      </Typography>
      
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        {editingBooking ? 'Edit Booking' : 'Create New Booking'}
      </Typography>
      <BookingForm
        initialData={editingBooking || undefined}
        onSubmit={editingBooking ? handleUpdate : handleCreate}
      />
      
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        My Bookings
      </Typography>
      <BookingList
        bookings={bookings}
        onEdit={setEditingBooking}
        onDelete={handleDelete}
      />
    </Box>
  );
};
