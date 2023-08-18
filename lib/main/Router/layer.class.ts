import { pathToRegexp } from "path-to-regexp";
import { Methods } from "../interfaces/methods.interface";

export type LayerHandler = (
  req: any,
  res: any,
  next: (...args: any) => void
) => void;

export class Layer {
  path: string;
  handler: LayerHandler;
  regexp: RegExp;
  method: Methods;
  private fast_star: boolean;
  private fast_slash: boolean = false;

  constructor(path: string, method: Methods, handler: LayerHandler) {
    this.path = path;
    this.handler = handler;
    this.regexp = pathToRegexp(path);
    this.method = method;

    this.fast_star = path === "*";
    // this.fast_slash = path === "/"; // TODO: opts.end === false
  }

  match(path: string) {
    let match: RegExpExecArray | null = null;

    if (path != null) {
      if (this.fast_slash) {
        // this.params = {}
        this.path = "";
        return true;
      }

      if (this.fast_star) {
        // this.params = {'0': decode_param(path)}
        this.path = path;
        return true;
      }

      match = this.regexp.exec(path);
    }

    if (!match) {
      return false;
    }

    this.path = match[0];

    return true;
  }
}
