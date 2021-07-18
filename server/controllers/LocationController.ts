import { LocationService } from '../services/LocationService';

const getLocations = () => {
  try {
    LocationService.findLocations;
  } catch (error) {}
};
const getLocationsByUserId = () => {
  try {
    LocationService.findLocationsByUserId;
  } catch (error) {}
};

export const LocationController = {
  getLocations,
  getLocationsByUserId,
};
