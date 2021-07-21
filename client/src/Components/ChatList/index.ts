import './styles';
import Component from '../../core/Component';
import ChatListItem from '../Shared/ChatListItem';
import Header from '../Shared/Header';
import { $router } from '../../lib/router';
import { token } from '../../lib/util';

interface ChatType {
  username: string;
  timestamp: string;
  content: string;
  img: string;
  checked?: boolean;
}

export default class Chatlist extends Component {
  setup() {
    this.$state = {
      chats: [],
    };
    const postId = location.href.split('post/')[1];

    fetch(`/api/chat/post/${postId}`, {
      method: 'GET',
      headers: {
        Authorization: token(),
      },
    })
      .then((res) => res.json())
      .then(({ result }) => {
        this.setState({ chats: result });
      });
  }

  template() {
    return `
      <header></header>
      <div class="chat-lists"></div>
    `;
  }

  mounted() {
    const $header = this.$target.querySelector('header');
    const $chatList = this.$target.querySelector('.chat-lists');

    new Header($header as HTMLElement, {
      headerType: 'menu-off-white',
      title: '채팅하기',
    });

    if (this.$state.chats.length > 0) {
      this.$state.chats.forEach((chat: ChatType) => {
        const $list = document.createElement('div');
        $chatList?.append($list);
        new ChatListItem($list as Element, chat);
      });
    } else {
      ($chatList as HTMLDivElement).innerHTML =
        '해당 글에 대한 채팅목록 이 없습니다.';
      ($chatList as HTMLDivElement).className = 'no-data';
    }

    const $backBtn = $header?.querySelector('#left');
    const postId = location.href.split('post/')[1];
    $backBtn?.addEventListener('click', () => history.back());
  }
}
