import { useState, useEffect } from 'react';
import { Button, TextField, MenuItem, Box } from '@mui/material';
import { Booking, Service } from '../types/types';
import { getServices } from '../api/services';


interface BookingFormProps {
  initialData?: Booking;
  onSubmit: (booking: Booking) => void;
}

export const BookingForm = ({ initialData, onSubmit }: BookingFormProps) => {
  const [booking, setBooking] = useState<Booking>({
    customer_name: '',
    address: '',
    date_time: '',
    service_id: 0,
    ...initialData
  });
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices();
      setServices(data);
    };
    fetchServices();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBooking(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(booking);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        fullWidth
        margin="normal"
        label="Customer Name"
        name="customer_name"
        value={booking.customer_name}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Address"
        name="address"
        value={booking.address}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Date and Time"
        type="datetime-local"
        name="date_time"
        value={booking.date_time}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        select
        label="Service Type"
        name="service_id"
        value={booking.service_id}
        onChange={handleChange}
        required
      >
        {services.map(service => (
          <MenuItem key={service.id} value={service.id}>
            {service.name}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained" sx={{ mt: 2 }} >
        {initialData ? 'Update Booking' : 'Create Booking'}
       
      </Button>
      
    </Box>
  );
};