import Route from "../router/Route.class";
import { NextFunction } from "./next.interface";

export type RouteHandler = (req: any, res: any, next?: NextFunction) => void;
