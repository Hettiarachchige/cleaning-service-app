import axios from 'axios';

const API_URL = 'http://localhost:3001/services';

export interface Service {
  id: number;
  name: string;
}

export const getServices = async (): Promise<Service[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createService = async (service: Omit<Service, 'id'>): Promise<Service> => {
  const response = await axios.post(API_URL, service);
  return response.data;
};

export const updateService = async (id: number, service: Service): Promise<Service> => {
  const response = await axios.put(`${API_URL}/${id}`, service);
  return response.data;
};

export const deleteService = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};