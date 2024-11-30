import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUser = async () => {
  const response = await axios.get('http://localhost:4000/auth/user', { withCredentials: true });
  return response.data;
};

export const useUser = () => {
  return useQuery(['user'], fetchUser, {
    retry: false, // Do not retry on failure
    staleTime: 1000 * 60 * 10, // Cache user data for 10 minutes
  });
};