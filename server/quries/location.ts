export const GET_LOCATIONS = `
  SELECT id, name FROM location;
`;

// 일부로 오류 발생 => 정상화를 위해서는 추후 !!!... 제거
export const GET_LOCATIONS_BY_NICKNAME = (nickname: string) => `
  SELECT name FROM location
  JOIN user on user.location1_id = location.id OR user.location2_id = location.id
  WHER!!!!!!!!!!!!!!!E user.nickname = '${nickname}';
`;
