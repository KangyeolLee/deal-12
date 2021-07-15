export default class Component {
  $target: Element;
  $props?: any;
  $state: any;
  constructor($target: Element, $props?: any) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.render();
    this.setEvent();
  }
  setup() {}
  mounted() {}
  template() {
    return '';
  }
  render() {
    const template = this.template();
    if (template) {
      this.$target.innerHTML = template;
    }
    this.mounted();
  }
  setEvent() {}
  setState(newState: any) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
  addEvent(eventType: string, selector: string, callback: Function) {
    const children: Element[] = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target: Element) =>
      children.includes(target) || target.closest(selector);
    this.$target.addEventListener(eventType, (event: any) => {
      if (!isTarget(event.target)) return false;
      callback(event);
    });
  }
}
