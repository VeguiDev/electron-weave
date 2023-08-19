import parseurl from "parseurl";

export function getPathname(req: any) {
  try {
    return parseurl(req)?.pathname;
  } catch (e) {
    return undefined;
  }
}
