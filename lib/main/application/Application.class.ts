import { App, ipcMain } from "electron";
import { Router } from "../router/Router.class";
import { MAIN_REQUEST_PIPE } from "../constants";
import { Request } from "./Request.class";
import { Response } from "./Response.class";

export class WeaveApplication {
  app: App | null = null;
  private router: Router = new Router();

  constructor() {}

  useRouter(router: Router) {
    this.router.use(router);
  }

  private attach() {
    ipcMain.on(MAIN_REQUEST_PIPE, (e, req) => {
      const { success } = Request.getValidationSchema(true).safeParse(req);

      if (!success) {
        console.debug("Electron Weave: Recieved invalid data!");
        return;
      }

      const request = new Request(req.url, req.method, req.data, req.headers);

      const response = new Response(req.url, req.method);

      this.router.handleRequest(request, response, (req, res) => {
        console.log(req, res);

        e.returnValue = JSON.stringify(res);
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
