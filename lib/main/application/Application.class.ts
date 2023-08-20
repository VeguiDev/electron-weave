import { App, ipcMain } from "electron";
import Router from "../router/Router.class";
import { MAIN_REQUEST_PIPE } from "../constants";
import Request from "./Request.class";
import Response from "./Response.class";

export default class WeaveApplication {
  app: App | null = null;
  private router: Router = new Router();

  constructor() {}

  useRouter(router: Router) {
    router.use(router);
  }

  private attach() {
    ipcMain.on(MAIN_REQUEST_PIPE, (e, req) => {
      const { success } = Request.getValidationSchema().safeParse(req);

      if (!success) {
        console.debug("Electron Weave: Recieved invalid data!");
        return;
      }

      const request = new Request(req.url, req.method, req.data, req.headers);

      const response = new Request(req.url, req.method);

      this.router.handleRequest(request, response, (req, res) => {
        e.returnValue = res;
      });
    });
  }

  listen(app: App, cb?: () => void) {
    this.app = app;

    if (this.app.isReady()) {
      this.attach();
      if (cb) cb();
    }

    this.app.on("ready", () => {
      this.attach();

      if (cb) cb();
    });
  }
}
