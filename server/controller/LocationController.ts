import { LocationService } from '../service/LocationService';

const getLocations = () => {
  LocationService.findLocations;
};
const getLocationsByUserId = () => {
  LocationService.findLocationsByUserId;
};

export const LocationController = {
  getLocations,
  getLocationsByUserId,
};
