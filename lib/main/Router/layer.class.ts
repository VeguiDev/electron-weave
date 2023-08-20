import { pathToRegexp } from "path-to-regexp";
import { RouteHandler } from "../interfaces/router.interface";

export default class Layer {
  path: string;
  method: string;
  handler: RouteHandler;
  regexp: RegExp;

  private _isMiddleware = false;

  constructor(path: string, method: string, handler: any, options?: any) {
    this.path = path;
    this.method = method;
    this.handler = handler;

    this._isMiddleware = this.handler.length === 3;

    this.regexp = pathToRegexp(path == "*" ? "/" : path, [], options);
  }

  isMiddleware() {
    return this._isMiddleware;
  }

  match(path: string) {
    let match: RegExpExecArray | null = null;

    if (this.path === "*") {
      return true;
    }

    match = this.regexp.exec(path);

    if (!match) {
      return false;
    }

    return true;
  }
}
