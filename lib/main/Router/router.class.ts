import { Methods } from "../interfaces/methods.interface";
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
        layer.handler(req, res, next);
      }
    };

    next();
  }

  register(path: string, method: string, hadnler: (...args: any) => any) {
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
}
