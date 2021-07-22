import dayjs from 'dayjs';
import { ClassElement } from 'typescript';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import CategoryListItem, {
  CategoryListItemProps,
} from '../Components/Shared/CategoryListItem/index';

dayjs.locale('ko');
dayjs.extend(relativeTime);

export function isClass(value: ClassElement) {
  return Boolean(value && value.toString().startsWith('class '));
}

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

export const setIntersectionObserver = ({
  root,
  isLogin,
  location_id,
  category_id,
}: {
  root: HTMLElement;
  isLogin?: boolean;
  location_id: number;
  category_id: number;
}) => {
  if (root.className.includes('no-data')) return;

  let pageOffset = 10;
  const options = {
    root,
    rootMargin: '10px 0px 10px 0px',
    threshold: 0,
  };

  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const api = `/api/posts/location/${location_id}/category/${category_id}/${pageOffset}`;

        fetch(api, {
          method: 'GET',
        })
          .then((res) => res.json())
          .then(({ result }) => {
            pageOffset += 10;

            if (!result.length) {
              observer.unobserve(entry.target);
              return;
            }

            result.forEach((res: CategoryListItemProps) => {
              const $item = document.createElement('div');
              root?.append($item);
              new CategoryListItem($item as Element, {
                ...res,
                isLogin,
              });
            });

            root.insertAdjacentElement('beforeend', entry.target);
          });
      }
    });
  }, options);

  return io;
};
