import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material'; // Added CircularProgress
import { getBookings } from '../api/bookings';
import { Booking } from '../types/types';

export const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchBooking = async () => {
      setIsLoading(true); // Start loading
      try {
        if (id) {
          const bookings = await getBookings(1);
          const foundBooking = bookings.find(b => b.id?.toString() === id);
          setBooking(foundBooking || null);
        }
      } catch (error) {
        console.error('Error fetching booking:', error);
        setBooking(null);
      } finally {
        setIsLoading(false); 
      }
    };
    fetchBooking();
  }, [id]);

  if (isLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!booking) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">
          Booking not found. Please check the booking ID.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Booking Details
      </Typography>
      <Typography variant="body1">
        <strong>Customer Name:</strong> {booking.customer_name}
      </Typography>
      <Typography variant="body1">
        <strong>Address:</strong> {booking.address}
      </Typography>
      <Typography variant="body1">
        <strong>Date & Time:</strong> {new Date(booking.date_time).toLocaleString()}
      </Typography>
      <Typography variant="body1">
        <strong>Service ID:</strong> {booking.service_id}
      </Typography>
    </Box>
  );
};
