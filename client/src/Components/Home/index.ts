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
import { token } from '../../lib/util';

export default class Home extends Component {
  setup() {
    this.$state = {
      items: [],
      locations: [],
      locationId: 0,
      locationName: '',
      isLogin: false,
    };
    if (token()) {
      const headers = new Headers();
      headers.append('Authorization', token());

      fetch('/api/me/locations', {
        method: 'GET',
        headers,
      })
        .then((res) => res.json())
        .then(({ result }) => {
          this.setState({
            locationId: result[0].location1_id,
            locationName: result[0].name,
            locations: result,
          });
        })
        .then(() => {
          fetch(`/api/posts/location/${this.$state.locationId}/category/0`, {
            method: 'GET',
          })
            .then((res) => res.json())
            .then(({ result }) => {
              this.setState({ items: result, isLogin: true });
            });
        });
    } else {
      // 전체 글
      fetch(`/api/posts/location/0/category/0`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then(({ result }) => {
          this.setState({ items: result });
        });
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
    const isLogin = token();
    const $header = this.$target.querySelector('header');
    new Header($header as Element, {
      title: isLogin ? this.$state.locationName : '로그인해주세요',
      headerType: 'main',
      isLogin,
    });

    const $itemList = this.$target.querySelector('.item-list');
    this.$state.items.forEach((item: CategoryListItemProps) => {
      const $item = document.createElement('div');
      $itemList?.append($item);
      new CategoryListItem($item as Element, {
        ...item,
        isLogin: this.$state.isLogin,
      });
    });

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
        locationId: this.$state.locationId,
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

    if (this.$state.isLogin) {
      new Dropdown($locationBtn as HTMLElement, {
        lists:
          this.$state.locations.length > 0
            ? [
                {
                  text: this.$state.locations.find(
                    (loc: any) => loc.name !== this.$state.locationName
                  ).name,
                  isWarning: false,
                  onclick: () => {
                    // update하고 새로고침
                    fetch('/api/me/locations', {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token(),
                      },
                      body: JSON.stringify({
                        user: {
                          location1_id: this.$state.locations[1],
                          location2_id: this.$state.locations[0],
                        },
                      }),
                    }).then((r) => console.log(r));
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
