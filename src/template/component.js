import { routeChange } from "../routes/index.js";

export default class Component {
  state;
  props;
  $target;

  constructor({ $target, props }) {
    this.$target = $target;
    this.props = props;
    this.init();
    this.render();
  }

  init() {
    // 컴포넌트가 생성되었을때, 처음 한번만 실행
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  view() {
    // Component의 dom 구조
    return ``;
  }

  mount() {} // dom이 추가된 이후에 실행되어야 할 동작들

  render() {
    this.$target.innerHTML = this.view();
    this.mount();
  }

  navigate(url, params) {
    // SPA 를 사용하기 위한 페이지 이동 함수
    routeChange(url, params);
  }

  querySelectorChild(selector) {
    return this.$target.querySelector(selector);
  }
}
