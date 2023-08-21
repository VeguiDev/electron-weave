import { RouteHandler } from "../interfaces/router.interface";
import { Layer } from "./Layer.class";

export class Route {
  path: string;
  stack: Layer[] = [];
  methods: any;

  constructor(path: string) {
    if (path.endsWith("/") && path.length > 1) {
      path = path.slice(0, -1);
    }

    this.path = path;
    this.methods = {};
  }

  handlesMethod(method: string) {
    if (!this.methods) return false;

    const methods = Object.keys(this.methods);

    if (methods.includes("all")) return true;

    return methods.includes(method);
  }

  handlesPath(path: string, method: string) {
    if (!this.handlesMethod(method)) return false;

    const layers = this.stack.filter(
      (lay) => lay.method === method.toLowerCase() || lay.method == "all"
    );

    for (const layer of layers) {
      if (layer.match(path)) return true;
    }

    return false;
  }

  static sortLayers(stack: Layer[]) {
    stack.sort((a, b) => {
      if (a.isMiddleware() && b.isMiddleware()) {
        return 0;
      } else if (a.isMiddleware() && !b.isMiddleware()) {
        return -1;
      } else if (!a.isMiddleware() && b.isMiddleware()) {
        return 1;
      }

      return 0;
    });
  }

  addLayer(method: string, handler: RouteHandler, options?: any) {
    const layer = new Layer(this.path, method, handler, options);

    this.stack.push(layer);

    this.methods[method] = true;

    return this;
  }
}
