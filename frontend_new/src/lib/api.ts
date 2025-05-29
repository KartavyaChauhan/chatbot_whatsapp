import axios from 'axios';
import { Request } from '../types/request';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Your NestJS backend API
});

export const fetchPendingRequests = async (): Promise<Request[]> => {
  const response = await api.get<Request[]>('/requests');
  return response.data;
};