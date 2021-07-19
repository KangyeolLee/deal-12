import { execQuery } from '../database/database';
import { GET_LOCATIONS, FIND_LOCATIONS_BY_NICKNAME } from '../queries/location';

export const LocationService = {
  findLocations: async () => {
    const data = await execQuery(GET_LOCATIONS);
    return data;
  },
  findLocationsByUserNickname: async ({ nickname }: { nickname: string }) => {
    const data = await execQuery(FIND_LOCATIONS_BY_NICKNAME(nickname));
    return data;
  },
};
