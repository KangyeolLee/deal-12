export const GET_LOCATIONS = `
  SELECT id, name FROM location;
`;

export const GET_LOCATIONS_BY_NICKNAME = (nickname: string) => `
  SELECT name FROM location
  JOIN user on user.location1_id = location.id OR user.location2_id = location.id
  WHERE user.nickname = '${nickname}';
`;
