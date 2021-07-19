export const GET_LOCATIONS = `
  SELECT id, name FROM location;
`;

export const FIND_LOCATIONS_BY_NICKNAME = ({
  nickname,
}: {
  nickname: string;
}) => `
  SELECT * FROM location
  JOIN user on user.location1_id = location.id OR user.location2_id = location.id
  WHERE user.nickname = '${nickname}';
`;
