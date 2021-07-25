export const CREATE_IMAGES = (
  post_id: number,
  files: Express.Multer.File[]
) => {
  const queries = files
    .map((file) => {
      return `
      (${post_id}, '${process.env.DB_HOST + file.path}')
    `;
    })
    .join(',');

  return `
    INSERT INTO image (post_id, url)
    VALUES ${queries}
  `;
};
