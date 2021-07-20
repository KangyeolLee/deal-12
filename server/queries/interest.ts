export const FIND_POST_INTERESTS_BY_USERID = ({
  user_id,
}: {
  user_id: number;
}) => `
  SELECT post.id AS id, interest.id AS interest_id, location.id AS location_id, interest_count,  
  thumbnail, name, title, location_id, category_id, post.createdAt, post.updatedAt, 
  view_count, price, seller_id, state FROM interest
    JOIN post ON post.id = interest.post_id
    JOIN location ON location.id = post.location_id
  WHERE user_id=${user_id}
`;
