import { Methods } from "../interfaces/methods.interface";
import { Route } from "./route.class";

export type MiddlewareFn = (req: any, res: any, next: () => void) => void;

export class Router {
  path: string;
  routes: (Route | Router)[] = [];

  constructor(path: string = "") {
    if (path === "/") {
      path = "";
    }

    this.path = path;
  }

  handlesRoute(path: string, method: Methods): boolean {
    if (!path.startsWith("/")) {
      path = "/" + path;
    }

    const posibleRoutes = this.routes.filter(
      (route) => route instanceof Router || route.handlesMethod(method)
    );

    for (const route of posibleRoutes) {
      if (route instanceof Router) {
        if (route.handlesRoute(path, method)) return true;
      } else {
        if (route.handlesLayer(path, method)) return true;
      }
    }

    return false;
  }

  handleRoute(path: string, method: Methods) {
    if (!this.handlesRoute(path, method)) return;

    let matchRoute: Route;
    const validRoutes = this.routes.filter(
      (route) => route instanceof Router || route.handlesMethod(method)
    );

    for (const route of validRoutes) {
      if (route instanceof Router) {
        route.handleRoute(path, method);
      } else {
      }
    }
  }

  register(path: string, method: Methods) {
    if (this.handlesRoute(path, method)) return;

    const route = new Route(path);

    route.addLayer(method);

    this.routes.push(route);
  }
}
