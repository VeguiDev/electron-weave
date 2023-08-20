import Request from "../application/Request.class";

export function getPathname(req: Request) {
  const url = new URL(req.url);

  return url.pathname;
}
