import './styles';
import Component from '../../../core/Component';

export default class Loader extends Component {
  mounted() {
    const loader = document.createElement('div');
    loader.classList.add('component-loader');
    this.$target?.append(loader);
  }
}
