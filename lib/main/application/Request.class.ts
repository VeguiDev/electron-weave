import { z } from "zod";

export class Request {
  url: string;
  method: string;
  headers: any;
  data: any;
  params: any;

  constructor(url: string, method: string, data: any = {}, headers: any = {}) {
    this.url = url;
    this.method = method;
    this.data = data;
    this.params = {};
    this.headers = headers;
  }

  static getValidationSchema(from_front: boolean = false) {
    if (from_front) {
      return z.object({
        url: z.string(),
        method: z.string(),
        data: z.any().optional(),
        headers: z.object({}).optional(),
      });
    }

    return z.object({
      url: z.string().url(),
      method: z.string(),
      data: z.any(),
      params: z.object({}),
      headers: z.object({}),
    });
  }
}

export default Request;
