export const CREATE_IMAGES = (
  post_id: number,
  files: Express.Multer.File[]
) => {
  const HOST = process.env.HOST;
  const queries = files
    .map((file) => {
      return `
      (${post_id}, '${HOST + file.path}')
    `;
    })
    .join(',');

  return `
    INSERT INTO image (post_id, url)
    VALUES ${queries}
  `;
};
