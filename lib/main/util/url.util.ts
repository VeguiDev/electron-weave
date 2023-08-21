import { Request } from "../application/Request.class";

export function getPathname(req: Request) {
  try {
    const url = new URL(req.url);

    return url.pathname;
  } catch (e) {
    if (req.url.startsWith("/")) {
      return req.url;
    }
  }

  return null;
}
