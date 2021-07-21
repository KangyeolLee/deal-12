import { execQuery } from '../database/database';
import {
  GET_LOCATIONS,
  FIND_LOCATION_BY_LOCATION_ID,
} from '../queries/location';
import { FIND_BY_USER_NICKNAME } from '../queries/user';

export const LocationService = {
  findLocations: async () => {
    const data = await execQuery(GET_LOCATIONS);
    return data;
  },

  findLocationsByUserNickname: async ({ nickname }: { nickname: string }) => {
    const user = await execQuery(FIND_BY_USER_NICKNAME({ nickname }));
    const loc1 = await execQuery(
      FIND_LOCATION_BY_LOCATION_ID({ location_id: user[0].location1_id })
    );
    const loc2 = await execQuery(
      FIND_LOCATION_BY_LOCATION_ID({ location_id: user[0].location2_id })
    );
    return { loc1, loc2 };
  },
};
