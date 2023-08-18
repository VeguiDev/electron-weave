import { Methods } from "../interfaces/methods.interface";
import { NextFunction } from "../interfaces/next.interface";
import { Layer } from "./layer.class";

export interface RouteMethods {
  get?: boolean;
  post?: boolean;
  put?: boolean;
  patch?: boolean;
  delete?: boolean;
  all?: boolean;
  [key: string]: any;
}

export class Route {
  path: string;
  stack: Layer[] = [];
  methods: RouteMethods = {};

  constructor(path: string) {
    this.path = path;
  }

  handlesMethod(method: string) {
    if (this.methods.all) {
      return true;
    }

    // Normalize method name
    var name = typeof method === "string" ? method.toLowerCase() : method;

    return Boolean(this.methods[name]);
  }

  options() {
    return Object.keys(this.methods);
  }

  handlesLayer(path: string, method: Methods) {
    const validLayers = this.stack.filter((layer) => layer.method == method);

    for (const layer of validLayers) {
      if (layer.match(path)) {
        return true;
      }
    }

    return false;
  }

  addLayer(method: Methods) {
    this.stack.push(
      new Layer(this.path, method, () => {
        console.log("Handler");
      })
    );

    this.methods[method] = true;
  }

  handleRequest(method: Methods, req: any, res: any, done: NextFunction) {
    const layers = this.stack.filter((layer) => layer.method == method);

    function next(err?: string) {
      if (err !== "" || typeof err != "undefined" || err != null) {
        return done(err);
      }
    }
  }
}
