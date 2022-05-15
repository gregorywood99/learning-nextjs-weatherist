import type { NextApiRequest, NextApiResponse } from "next";
import { SearchResponse } from "../../client";

const client = new SearchResponse(process.env.API_KEY || "");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Forecast>,
) {
  try {
    const location = req.query.fullLocation.toString();
    const result = await client.singleLocationInfo(location);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error)
  }
}
