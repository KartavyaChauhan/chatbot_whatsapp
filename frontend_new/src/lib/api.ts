import axios from 'axios';
import { Request } from '../types/request';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api', 
});

export const fetchPendingRequests = async (): Promise<Request[]> => {
  const response = await api.get<Request[]>('/requests');
  return response.data;
};