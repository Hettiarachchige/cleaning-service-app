import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Booking } from '../types/types';

interface BookingListProps {
  bookings: Booking[];
  onEdit: (booking: Booking) => void;
  onDelete: (id: number) => void;
}

export const BookingList = ({ bookings, onEdit, onDelete }: BookingListProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Date & Time</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map(booking => (
            <TableRow key={booking.id}>
              <TableCell>{booking.customer_name}</TableCell>
              <TableCell>{booking.address}</TableCell>
              <TableCell>{new Date(booking.date_time).toLocaleString()}</TableCell>
              <TableCell>{booking.service_id}</TableCell>
              <TableCell>
                <Button onClick={() => onEdit(booking)}>Edit</Button>
                <Button onClick={() => booking.id && onDelete(booking.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};