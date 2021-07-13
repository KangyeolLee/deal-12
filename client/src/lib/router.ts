import { isClass, isFunction, isPromise } from '../utils';

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

  async getComponent(route: Route) {
    const component =
      isFunction(route.component) && !isClass(route.component)
        ? route.component()
        : route.component;

    if (isPromise(component)) {
      const res = await component;
      return res.default ? res.default : res;
    } else {
      return component;
    }
  }

  async onHashChangeHandler() {
    this.$app.innerHTML = '';

    const hash = window.location.hash;
    const path = hash.substr(1);

    const route = this.hasRoute(path)
      ? this.getRoute(path)
      : this.getRoute(this.fallback);

    if (route.redirect) {
      this.push(route.redirect);
      return;
    }

    if (route.middlewares) {
      for (const middleware of route.middlewares) {
        if (!(await middleware())) {
          return;
        }
      }
    }

    const component = await this.getComponent(route);
    if (typeof component === 'string') {
      this.$app.innerHTML = component;
    } else if (component instanceof HTMLElement) {
      this.$app?.appendChild(component);
    } else if (isClass(component)) {
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
  const router = new Router(options);

  $router = {
    push: (path) => router.push(path),
  };

  router.onHashChangeHandler();
}
