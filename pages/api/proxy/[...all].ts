import { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

export default (req: NextApiRequest, res: NextApiResponse) =>
  httpProxyMiddleware(req, res, {
    target: `https://api.syosetu.com/novelapi/api`,
    pathRewrite: [
      {
        patternStr: "^/api/proxy",
        replaceStr: "",
      },
    ],
  });
