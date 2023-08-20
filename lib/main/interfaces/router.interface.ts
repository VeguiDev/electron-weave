import Route from "../router/Route.class";
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
export type RouterDone = (req: Request, res: Response) => void;
