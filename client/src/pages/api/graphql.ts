import { NextApiRequest, NextApiResponse } from "next";

const GRAPHQL_URL = process.env.GRAPHQL_URL!;

interface ApiResponse {
  body: string;
  status: number;
  headers: Headers;
}

const callAPI = async (body: any, headers: object): Promise<ApiResponse> => {
  const res = await fetch(GRAPHQL_URL, {
    method: "post",
    headers: {
      "content-type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
  return {
    body: await res.text(),
    status: res.status,
    headers: res.headers,
  };
};
const forwardHeader = (
  res: NextApiResponse,
  apiRes: ApiResponse,
  header: string
) => {
  if (apiRes.headers.get(header)) {
    res.setHeader(header, apiRes.headers?.get(header) || "");
  }
};
const forwardResponse = (res: NextApiResponse, apiRes: ApiResponse) => {
  forwardHeader(res, apiRes, "content-type");
  forwardHeader(res, apiRes, "www-authenticate");
  res.status(apiRes.status);
  res.send(apiRes.body);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const { idToken } = await auth0.getSession(req);
    const idToken = req.cookies["key"];
    console.log("GRAPHQL_URL", GRAPHQL_URL, idToken);
    const apiRes = await callAPI(req.body, {
      authorization: idToken ? `Bearer ${idToken}` : "",
    });
    forwardResponse(res, apiRes);
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
};
