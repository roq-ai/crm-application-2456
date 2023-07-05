import axios from 'axios';
import queryString from 'query-string';
import { ComplaintInterface, ComplaintGetQueryInterface } from 'interfaces/complaint';
import { GetQueryInterface } from '../../interfaces';

export const getComplaints = async (query?: ComplaintGetQueryInterface) => {
  const response = await axios.get(`/api/complaints${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createComplaint = async (complaint: ComplaintInterface) => {
  const response = await axios.post('/api/complaints', complaint);
  return response.data;
};

export const updateComplaintById = async (id: string, complaint: ComplaintInterface) => {
  const response = await axios.put(`/api/complaints/${id}`, complaint);
  return response.data;
};

export const getComplaintById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/complaints/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteComplaintById = async (id: string) => {
  const response = await axios.delete(`/api/complaints/${id}`);
  return response.data;
};
