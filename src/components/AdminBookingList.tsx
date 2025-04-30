import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip } from '@mui/material';
import { Booking } from '../types/types';

interface AdminBookingListProps {
  bookings: Booking[];
  onEdit: (booking: Booking) => void;
  onDelete: (id: number) => void;
}

export const AdminBookingList = ({ bookings, onEdit, onDelete }: AdminBookingListProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Date & Time</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map(booking => (
            <TableRow key={booking.id}>
              <TableCell>{booking.id}</TableCell>
              <TableCell>{booking.customer_name}</TableCell>
              <TableCell>{booking.address}</TableCell>
              <TableCell>{new Date(booking.date_time).toLocaleString()}</TableCell>
              <TableCell>
                <Chip label={`#${booking.service_id}`} size="small" />
              </TableCell>
              <TableCell>{booking.user_id}</TableCell>
              <TableCell>
                <Button size="small" onClick={() => onEdit(booking)}>Edit</Button>
                <Button size="small" onClick={() => booking.id && onDelete(booking.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};