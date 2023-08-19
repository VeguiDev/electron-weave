import Layer from "./Layer.class";

export default class Route {
  path: string;
  stack: Layer[] = [];
  methods: any;

  constructor(path: string) {
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

    for (const layer of this.stack.filter(
      (layer) => layer.method.toLowerCase() == method.toLowerCase()
    )) {
      if (layer.match(path)) return true;
    }

    return false;
  }

  addLayer(method: string, handler: (...args: any) => any) {
    const layer = new Layer(this.path, method, handler);

    this.stack.push(layer);

    this.methods[method] = true;

    return this;
  }
}
