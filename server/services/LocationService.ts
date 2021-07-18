export const LocationService = {
  findLocations: () => {
    return `SELECT * FROM location;`;
  },
  findLocationsByUserId: ({ user_id }: { user_id: number }) => {
    return `SELECT * FROM user WHERE user_id=${user_id};`;
  },
};
