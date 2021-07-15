import './styles';
import Component from '../../../core/Component';
import TextInput from './../TextInput/index';

export default class InputPopup extends Component {
  template() {
    const { message, btnText, isAlert } = this.$props;
    return `
      <div class="input-popup">
        <h6 class="sub-title">${message}</h6>
        <div class="input-wrapper ${isAlert ? 'hidden' : ''}"></div>
        <div class="buttons-area">
          <div class="close-btn">취소</div>
          <div class="confirm-btn ${isAlert ? 'alert' : ''}">${btnText}</div>
        </div>
      </div>
    `;
  }

  mounted() {
    const { isAlert } = this.$props;

    if (!isAlert) {
      const $wrapper = this.$target.querySelector('.input-wrapper');
      new TextInput($wrapper as HTMLElement, {
        placeholder: '시·구 제외, 동만 입력',
        type: 'text',
        size: 'medium',
      });
    }
  }

  setEvent() {
    const $modal = this.$target;
    this.addEvent('click', '.close-btn', turnOffModal);

    function turnOffModal() {
      $modal.classList.remove('modal-open');
    }
  }
}
