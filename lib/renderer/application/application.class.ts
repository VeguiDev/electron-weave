import { IpcRenderer, ipcRenderer } from "electron";
import { MAIN_REQUEST_PIPE } from "../../main/constants";
import { FrontResponse } from "../../main";

export class WeaveClient {
  ipcRenderer: IpcRenderer = ipcRenderer;
  channel: string = MAIN_REQUEST_PIPE;

  async fetch(
    url: string,
    options: any = {
      method: "get",
      data: {},
      headers: {},
    }
  ) {
    let res = this.ipcRenderer.sendSync(this.channel, {
      url,
      ...options,
    });

    try {
      res = JSON.parse(res);
    } catch (e) {
      return null;
    }

    return res;
  }
}
