import { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

export default (req: NextApiRequest, res: NextApiResponse): Promise<any> =>
  httpProxyMiddleware(req, res, {
    target: `https://api.syosetu.com`,
    pathRewrite: [
      {
        patternStr: process.env.NODE_ENV == "development" ? "^/api/proxy" : "",
        replaceStr: "",
      },
    ],
  });
