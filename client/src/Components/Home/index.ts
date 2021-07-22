import { $router } from '../../lib/router';
import Category from '../Category';
import Component from '../../core/Component';
import CategoryListItem, {
  CategoryListItemProps,
} from '../Shared/CategoryListItem';
import Header from '../Shared/Header';
import './styles.scss';
import Menu from '../Menu';
import Button from '../Shared/Button';
import Auth from './../Auth/index';
import Dropdown from './../Shared/Dropdown/index';
import { setLoading, token, setIntersectionObserver } from '../../lib/util';
import Loader from '../Shared/Loader';

export default class Home extends Component {
  setup() {
    this.$state = {
      items: [],
      location1: {},
      location2: {},
      isLogin: token(),
    };
    if (token()) {
      const headers = new Headers();
      headers.append('Authorization', token());

      setLoading(true);

      fetch('/api/me/locations', {
        method: 'GET',
        headers,
      })
        .then((res) => res.json())
        .then(({ result }) => {
          this.setState({
            location1: result.loc1[0],
            location2: result.loc2[0],
          });
        })
        .then(() => {
          fetch(
            `/api/posts/location/${this.$state.location1.id}/category/0/0`,
            {
              method: 'GET',
            }
          )
            .then((res) => res.json())
            .then(({ result }) => {
              this.setState({ items: result });
            });
        })
        .finally(() => {
          setTimeout(() => setLoading(false), 1500);
        });
    } else {
      // 전체 글
      setLoading(true);

      fetch(`/api/posts/location/0/category/0/0`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then(({ result }) => {
          this.setState({ items: result });
        })
        .finally(() => setTimeout(() => setLoading(false), 1500));
    }
  }
  template() {
    return `
    <header></header>
    <div class="item-list"></div>
    <div id="menu-modal" class="modal-close"></div>
    <div id="category-modal" class="modal-close"></div>
    <div class="post-new-btn"></div> 
    <div id="user-modal" class="modal-close"></div>
    `;
  }
  mounted() {
    const { isLogin, location1 } = this.$state;
    const $header = this.$target.querySelector('header');
    new Header($header as Element, {
      title: isLogin ? this.$state.location1.name : '로그인해주세요',
      headerType: 'main',
      isLogin,
    });

    const $itemList = this.$target.querySelector('.item-list') as HTMLLIElement;
    if (this.$state.items.length) {
      this.$state.items.forEach((item: CategoryListItemProps) => {
        const $item = document.createElement('div');
        $itemList?.append($item);
        new CategoryListItem($item as Element, {
          ...item,
          isLogin,
        });
      });
    } else {
      $itemList!.innerHTML = '등록된 상품이 없습니다...';
      $itemList.className = 'no-data';
    }

    // infinite scrolling
    new Loader(this.$target.querySelector('.item-list') as HTMLLIElement);
    const $loader = this.$target.querySelector('.component-loader') as Element;
    const io = setIntersectionObserver({
      root: $itemList,
      isLogin,
      location_id: location1.id,
      category_id: 0,
    });
    io?.observe($loader);

    // post new btn
    const $postNewBtn = this.$target.querySelector('.post-new-btn');
    new Button($postNewBtn as Element, {
      buttonType: 'fab',
      disabled: !isLogin,
      handleClick: () => {
        $router.push('/post/new');
      },
    });

    // modals
    const $categoryModal =
      this.$target.querySelector('#category-modal') ||
      document.createElement('div');

    const $menuModal =
      this.$target.querySelector('#menu-modal') ||
      document.createElement('div');

    const $userModal =
      this.$target.querySelector('#user-modal') ||
      document.createElement('div');

    // buttons
    const $categoryBtn = this.$target.querySelector('#category');
    $categoryBtn?.addEventListener('click', () => {
      new Category($categoryModal as Element, {
        locationId: this.$state.location1.id,
      });
      $categoryModal.className = 'modal-open';
    });

    const $menuBtn = this.$target.querySelector('#menu');
    $menuBtn?.addEventListener('click', () => {
      new Menu($menuModal as Element);
      $menuModal.className = 'modal-open';
    });

    const $userBtn = this.$target.querySelector('#user');
    $userBtn?.addEventListener('click', () => {
      new Auth($userModal as Element);
      $userModal.className = 'modal-open';
    });

    const $locationBtn = this.$target.querySelector('.location');

    if (isLogin) {
      new Dropdown($locationBtn as HTMLElement, {
        lists: this.$state.location2?.id
          ? [
              {
                text: this.$state.location2.name,
                isWarning: false,
                // 동네 변경
                onclick: () => {
                  fetch('/api/me/locations', {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': token(),
                    },
                    body: JSON.stringify({
                      user: {
                        location1_id: this.$state.location2.id,
                        location2_id: this.$state.location1.id,
                      },
                    }),
                  }).then(() => $router.push('/'));
                },
              },
              {
                text: '내 동네 설정하기',
                isWarning: false,
                onclick: () => $router.push('/location'),
              },
            ]
          : [
              {
                text: '내 동네 설정하기',
                isWarning: false,
                onclick: () => $router.push('/location'),
              },
            ],
        offset: 'center',
      });
    }
  }
}
