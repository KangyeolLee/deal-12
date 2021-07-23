import { isClass } from './util';

type RouterType = {
  $app: any;
  routes: Route[];
  fallback?: string;
};
type Route = {
  path: string;
  redirect?: string;
  component?: any;
  middlewares?: any;
};

class Router {
  $app: HTMLDivElement;
  routes: {
    [key: string]: Route;
  } = {};
  fallback: string = '/';

  constructor({ $app, routes, fallback = '/' }: RouterType) {
    this.$app = $app;
    this.fallback = fallback;

    this.generateRoutes(routes);

    this.initEvent();
  }

  generateRoutes(routes: Route[]) {
    routes.forEach((route: Route) => {
      this.routes[route.path] = route;
    });
  }

  initEvent() {
    window.addEventListener('hashchange', () => this.onHashChangeHandler());
  }

  getRoute(path: string) {
    const route: Route = this.routes[path];
    if (!route) throw new Error(`Not found route: ${path}`);
    return route;
  }

  hasRoute(path: string) {
    return typeof this.routes[path] !== 'undefined';
  }

  getComponent(route: Route) {
    const component = route.component;
    return component;
  }

  async onHashChangeHandler() {
    this.$app.innerHTML = '';

    const hash = window.location.hash;
    let path = hash.substr(1);

    /* 동적 라우팅 처리 */

    let route;
    const regex = /\w{1,}$/; // 동적 라우팅으로 전달되는 :id 는 모두 [문자열 + 숫자] 조합으로 간주

    if (this.hasRoute(path)) {
      route = this.getRoute(path);
    } else if (regex.test(path)) {
      // 주소가 없는 경우를 동적 라우팅으로 간주하고 이를 :id 로 치환
      route = this.getRoute(path.replace(regex, ':id'));
    } else {
      // 그 외 입력되지 않은 모든 주소에 대해서는 fallback 실행
      route = this.getRoute(this.fallback);
    }

    if (route.redirect) {
      this.push(route.redirect);
      return;
    }

    const component = this.getComponent(route);
    if (isClass(component)) {
      new component(this.$app);
    } else {
      throw new Error('invalid component');
    }
  }

  push(path: string) {
    window.location.hash = path;
  }
}

/**
 * - push(path: string): void - navigate
 */
export let $router: {
  push: (path: string) => void;
};

/**
 * @param {{$app: HTMLElement, routes: Route[], fallback?: string}} options
 */
export function initRouter(options: RouterType) {
  const { $app } = options;

  // dropdown 영역 밖 클릭 시 드랍다운 제거 이벤트는 최상단 $app에서 관리
  handleDropdown($app);

  // mutation observer 로 슬라이더 크기 관리....
  handleMutationObserver($app);

  const router = new Router(options);

  $router = {
    push: (path) => router.push(path),
  };

  router.onHashChangeHandler();
}

function handleDropdown($app: HTMLElement) {
  $app.addEventListener('click', (e: MouseEvent) => {
    const $dropdowns = $app.querySelectorAll<HTMLElement>('.dropdown');
    $dropdowns.forEach((dropdown) => {
      const isOpen = dropdown.className.includes('open-dropdown');

      if (isOpen) {
        dropdown.classList.remove('open-dropdown');
      }
    });
  });
}

function handleMutationObserver($app: HTMLElement) {
  const $buttons = $app.parentElement?.querySelector('.buttons');
  const observer = new MutationObserver((mutationRecord) => {
    const $slider = $app.querySelector('.image-navigation') as HTMLElement;

    if ($slider && $slider.childElementCount > 1) {
      const record = mutationRecord.filter((record) => {
        const isActive = (<HTMLElement>record.target).className.includes(
          'active'
        );
        if (isActive) {
          return record;
        }
      })[0];

      const target = record.target as HTMLElement;
      const slidesIdx = findCurrentViewOnSlides($app);
      let offset = slidesIdx + 1;

      if (target.id === 'iphone') {
        $slider.style.left = -390 * offset + 'px';
      } else if (target.id === 'galaxy') {
        $slider.style.left = -360 * offset + 'px';
      }
    }
  });

  observer.observe($buttons as HTMLElement, {
    childList: true,
    subtree: true,
    attributes: true,
  });
}

function findCurrentViewOnSlides($app: HTMLElement) {
  const $imgaeNav = $app.querySelector('.image-nav') as HTMLElement;
  const regex = /[\d]{1,}/;

  const activatedTarget = $imgaeNav.querySelector('.on') as HTMLElement;
  const targetIdx = activatedTarget.className.match(regex)?.[0];

  return +targetIdx!;
}
