export class FrontResponse {
  url: string;
  method: string;
  headers: any;
  body: any;

  constructor(
    url: string,
    method: string,
    body: any | null = null,
    headers: any = {}
  ) {
    this.url = url;
    this.method = method;
    this.headers = headers;
    this.body = body;
  }
}

export default class Response extends FrontResponse {
  constructor(
    url: string,
    method: string,
    body: any | null = null,
    headers: any = {}
  ) {
    super(url, method, body, headers);
  }

  send(body: any) {}
}
