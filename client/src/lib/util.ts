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

export const getTimestamp = (date: string) => {
  return dayjs(date).fromNow();
};

export const translatePriceToTrimmed = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const setLoading = (state: boolean) => {
  const $loading = document.querySelector('#loading-modal') as HTMLElement;

  if (state) {
    $loading.classList.add('loading-open');
  } else {
    $loading.classList.remove('loading-open');
  }
};
