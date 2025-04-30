import { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { AdminBookingList } from '../components/AdminBookingList';
import { ServiceManagement } from '../components/ServiceManagement';
import { getBookings } from '../api/bookings';
import { Booking } from '../types/types';

export const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchAllBookings = async () => {
      // In a real app, you'd have a proper admin endpoint
      const data = await getBookings(0); // Passing 0 to get all bookings
      setBookings(data);
    };
    fetchAllBookings();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleBookingUpdate = (updatedBooking: Booking) => {
    setBookings(bookings.map(b => 
      b.id === updatedBooking.id ? updatedBooking : b
    ));
  };

  const handleBookingDelete = (id: number) => {
    setBookings(bookings.filter(b => b.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="All Bookings" />
        <Tab label="Service Management" />
      </Tabs>
      
      {tabValue === 0 && (
        <Box sx={{ mt: 3 }}>
          <AdminBookingList 
            bookings={bookings} 
            onEdit={handleBookingUpdate}
            onDelete={handleBookingDelete}
          />
        </Box>
      )}
      
      {tabValue === 1 && (
        <Box sx={{ mt: 3 }}>
          <ServiceManagement />
        </Box>
      )}
    </Box>
  );
};