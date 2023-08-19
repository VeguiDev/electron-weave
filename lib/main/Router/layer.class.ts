import { pathToRegexp } from "path-to-regexp";

export default class Layer {
  path: string;
  method: string;
  handler: (...args: any) => any;
  regexp: RegExp;

  constructor(path: string, method: string, handler: any) {
    this.path = path;
    this.method = method;
    this.handler = handler;
    this.regexp = pathToRegexp(path);
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
