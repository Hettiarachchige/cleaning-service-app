import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Box } from '@mui/material';
import { Service } from '../types/types';
import { getServices, createService, updateService, deleteService } from '../api/services';

export const ServiceManagement = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newServiceName, setNewServiceName] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices();
      setServices(data);
    };
    fetchServices();
  }, []);

  const handleCreate = async () => {
    if (!newServiceName.trim()) return;
    const service = await createService({ name: newServiceName });
    setServices([...services, service]);
    setNewServiceName('');
  };

  const handleUpdate = async () => {
    if (!editingService?.id) return;
    const updatedService = await updateService(editingService.id, editingService);
    setServices(services.map(s => s.id === editingService.id ? updatedService : s));
    setEditingService(null);
  };

  const handleDelete = async (id: number) => {
    await deleteService(id);
    setServices(services.filter(s => s.id !== id));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="New Service Name"
          value={editingService ? editingService.name : newServiceName}
          onChange={(e) => 
            editingService 
              ? setEditingService({...editingService, name: e.target.value})
              : setNewServiceName(e.target.value)
          }
        />
        <Button 
          variant="contained" 
          onClick={editingService ? handleUpdate : handleCreate}
        >
          {editingService ? 'Update Service' : 'Add Service'}
        </Button>
        {editingService && (
          <Button variant="outlined" onClick={() => setEditingService(null)}>
            Cancel
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Service Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map(service => (
              <TableRow key={service.id}>
                <TableCell>{service.id}</TableCell>
                <TableCell>{service.name}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => setEditingService(service)}>Edit</Button>
                  <Button size="small" onClick={() => handleDelete(service.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};