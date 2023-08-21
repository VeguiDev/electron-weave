import { Route } from "../router/Route.class";
import Response from "../application/Response.class";
import Request from "../application/Request.class";
import { NextFunction } from "./next.interface";

export type RouteController = (req: Request, res: Response) => void;
export type RouteMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
export type RouteHandler = RouteController | RouteMiddleware;
export type RouteMethodHandler<T = RouteController | RouteMiddleware> =
  T extends RouteController
    ? (path: string, hadnler: RouteController) => void
    : (path: string, hadnler: RouteMiddleware) => void;
export type RouterDone = (req: Request, res: Response) => void;
