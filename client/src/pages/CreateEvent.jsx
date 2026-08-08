import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateEvent } from '../hooks/useEventsQuery';
import { useGeoLocation } from '../hooks/useGeoLocation';
import { useNavigate } from 'react-router-dom';
import Input from '../atoms/Input';
import MapPicker from '../components/MapPicker';
import toast from 'react-hot-toast';

const CreateEvent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const createEventMutation = useCreateEvent();
  const { coordinates, loaded } = useGeoLocation();
  const navigate = useNavigate();

  // State to hold the manually selected location
  const [selectedLocation, setSelectedLocation] = useState(null);

  const onSubmit = (data) => {
    // 1. Ensure we have a location (either GPS or Selected)
    const finalLat = selectedLocation ? selectedLocation.lat : coordinates.lat;
    const finalLng = selectedLocation ? selectedLocation.lng : coordinates.long;
    const finalAddress = selectedLocation ? selectedLocation.address : "Detected Location";

    if (!finalLat || !finalLng) {
      toast.error('Location data missing.');
      return;
    }

    const eventPayload = {
      ...data,
      location: {
        coordinates: [finalLng, finalLat], // [long, lat]
        address: finalAddress
      }
    };

    createEventMutation.mutate(eventPayload, {
      onSuccess: () => {
        navigate('/dashboard');
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="holo-card p-8">
        <h2 className="text-2xl font-bold mb-6 text-neon-cyan border-b border-glass-border pb-4">
          Project New Hologram
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input 
            label="Event Title" 
            {...register('title', { required: 'Title is required', minLength: 5 })}
            error={errors.title}
          />

          <div className="mb-4">
            <label className="block text-neon-cyan mb-2 text-sm uppercase">Description</label>
            <textarea 
              rows="4"
              className="w-full bg-black/40 border border-glass-border rounded-lg px-4 py-3 text-white focus:border-neon-purple focus:outline-none"
              {...register('description', { required: 'Description is required' })}
            ></textarea>
            {errors.description && <p className="text-neon-red text-xs mt-1">{errors.description.message}</p>}
          </div>

          <Input 
            label="Date & Time" 
            type="datetime-local"
            {...register('eventDate', { required: 'Date is required' })}
            error={errors.eventDate}
          />

          {/* MAP PICKER SECTION */}
          <div className="mb-6">
            <label className="block text-neon-cyan mb-2 text-sm uppercase">Select Event Location</label>
            {loaded && coordinates.lat ? (
              <MapPicker
                initialCoords={{ lat: coordinates.lat, lng: coordinates.long }}
                onLocationSelect={setSelectedLocation}
              />
            ) : (
              <div className="h-[300px] flex items-center justify-center border border-glass-border rounded bg-white/5 animate-pulse">
                Acquiring Location Data...
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">
              💡 Click on map to select location or search by address. You can only create events in accessible areas.
            </p>
          </div>

          <button
            type="submit"
            disabled={createEventMutation.isPending}
            className="w-full mt-2 bg-neon-purple text-white font-bold py-3 rounded-lg hover:scale-[1.02] transition"
          >
            {createEventMutation.isPending ? 'Projecting...' : 'Launch Event'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;