import { RouteHandler } from "../interfaces/router.interface";
import { getPathname } from "../util/url.util";
import Route from "./Route.class";

export default class Router {
  path: string;
  routes: Route[] = [];

  constructor(path: string = "") {
    this.path = path;
  }

  handleRequest(req: any, res: any) {
    const path = getPathname(req);

    if (!path) return;

    const route = this.routes.find((route) =>
      route.handlesPath(path, req.method)
    );

    if (!route) return;

    let index = 0;

    const next = () => {
      if (index < route.stack.length) {
        const layer = route.stack[index];

        index++;

        if (layer.method != req.method) {
          return next();
        }

        layer.handler(req, res, next);
      }
    };

    next();
  }

  private register(path: string, method: string, hadnler: RouteHandler) {
    let routeI = this.routes.findIndex((route) => route.path == path);
    let route: Route;

    if (routeI < 0) {
      route = new Route(path);
    } else {
      route = this.routes[routeI];
    }

    route.addLayer(method, hadnler);

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
}
