import { RouteHandler } from "../interfaces/router.interface";
import { getPathname } from "../util/url.util";
import Route from "./Route.class";

export default class Router {
  path: string;
  routes: (Route | Router)[] = [];

  constructor(path: string = "") {
    if (path.endsWith("/")) {
      path = path.slice(0, -1);
    }

    this.path = path;
  }

  handlesPath(path: string, method: string) {
    for (const route of this.routes) {
      if (route.handlesPath(path, method)) return true;
    }

    return false;
  }

  handleRequest(req: any, res: any) {
    const path = getPathname(req);

    if (!path) return;

    const routes = this.routes.filter((r) => r instanceof Route) as Route[];
    const routers = this.routes.filter((r) => r instanceof Router) as Router[];

    if (routers.length > 0) {
      routers.forEach((router) => {
        router.handleRequest(req, res);
      });
    }

    const route = routes.find((route) => route.handlesPath(path, req.method));

    if (!route) return;

    let index = 0;

    const next = () => {
      if (index < route.stack.length) {
        const layer = route.stack[index];

        index++;

        if (layer.method != req.method && layer.method != "all") {
          return next();
        }

        layer.handler(req, res, next);
      }
    };

    next();
  }

  private register(
    path: string,
    method: string,
    hadnler: RouteHandler,
    options?: any
  ) {
    if (path.length == 0) {
      path = "/";
    }

    let routeI = this.routes.findIndex(
      (route) => !(route instanceof Router) && route.path == path
    );
    let route: Route;

    if (routeI < 0) {
      route = new Route(this.path + path);
    } else {
      route = this.routes[routeI] as Route;
    }

    route.addLayer(method, hadnler, options);

    if (routeI < 0) return this.routes.push(route);

    this.routes[routeI] = route;
  }

  get(path: string, handler: RouteHandler) {
    this.register(path, "get", handler);
  }

  post(path: string, handler: RouteHandler) {
    this.register(path, "post", handler);
  }

  put(path: string, handler: RouteHandler) {
    this.register(path, "put", handler);
  }

  patch(path: string, handler: RouteHandler) {
    this.register(path, "patch", handler);
  }

  delete(path: string, handler: RouteHandler) {
    this.register(path, "delete", handler);
  }

  use(path: RouteHandler | Router): void;
  use(path: string, handler: RouteHandler | Router): void;
  use(
    path: string | (RouteHandler | Router),
    handler?: RouteHandler | Router
  ): void {
    var basePath: string = this.path;

    var handler: RouteHandler | Router | undefined;

    var pathDefined = true;

    if (typeof path !== "string") {
      handler = path;
      pathDefined = false;
    } else {
      basePath = this.path + path;
      handler = handler;
    }

    if (!handler) return;

    if (handler instanceof Router) {
      if (pathDefined) {
        handler.path = basePath + handler.path;
      } else {
        handler.path = this.path + handler.path;
      }

      this.routes.push(handler);
    } else {
      this.register(basePath, "all", handler, { end: false });
    }
  }
}
