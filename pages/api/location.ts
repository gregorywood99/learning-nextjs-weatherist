import type { NextApiRequest, NextApiResponse } from "next";
import { SearchResponse } from "../../client";

const client = new SearchResponse(process.env.API_KEY || "");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CurrentFull>,
) {
  try {
    const location = req.query.location.toString();
    const result = await client.searchQuery(location);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
  }
}
