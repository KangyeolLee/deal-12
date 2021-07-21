import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

export const token = () => {
  if (localStorage.getItem('token')) {
    return `Bearer ${localStorage.getItem('token')}`;
  }
  return '';
};

const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const checkToday = (createdAt: string): boolean => {
  const date = new Date(createdAt);
  return isToday(date);
};

export const getTimestamp = (date: string) => {
  return dayjs(date).fromNow();
};

export const translatePriceToTrimmed = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
