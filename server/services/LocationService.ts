import { execQuery } from '../database/database';
import { GET_LOCATIONS, GET_LOCATIONS_BY_NICKNAME } from './../quries/location';

export const LocationService = {
  findLocations: async () => {
    const data = await execQuery(GET_LOCATIONS);
    return data;
  },
  findLocationsByUserId: async ({ nickname }: { nickname: string }) => {
    const data = await execQuery(GET_LOCATIONS_BY_NICKNAME(nickname));
    return data;
  },
};
