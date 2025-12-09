import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/axiosInstance';
import toast from 'react-hot-toast';

export const useGetNearbyEvents = (long, lat) => {
  return useQuery({
    queryKey: ['events', long, lat],
    queryFn: async () => {
      if (!long || !lat) return [];
      const { data } = await api.get(`/events/nearby?long=${long}&lat=${lat}`);
      return data.data;
    },
    enabled: !!long && !!lat, 
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newEvent) => api.post('/events', newEvent),
    onSuccess: () => {
      toast.success('Event Hologram Projected! ');
      queryClient.invalidateQueries(['events']);
    },
    onError: (err) => toast.error(err)
  });
};