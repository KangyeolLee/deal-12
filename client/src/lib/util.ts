export const token = () => {
  return `Bearer ${localStorage.getItem('token')}`;
};
