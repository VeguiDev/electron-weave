import { Router } from "./Router/router.class";
import { Methods } from "./interfaces/methods.interface";

const router = new Router();

router.register("/", Methods.GET);

router.register("/users", Methods.GET);

router.register("/users/:uid", Methods.GET);
