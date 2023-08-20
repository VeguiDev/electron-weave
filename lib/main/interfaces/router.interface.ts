import Route from "../router/Route.class";
import { NextFunction } from "./next.interface";

export type RouteController = (req: any, res: any) => void;
export type RouteMiddleware = (req: any, res: any, next: NextFunction) => void;
export type RouteHandler = RouteController | RouteMiddleware;
