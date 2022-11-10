// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Folk from "../../../models/Folk";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  const { _id } = req.body;
  await dbConnect();
  const people = await Folk.aggregate([
    { $match: { votes: { $gte: 0 } } },
    { $sample: { size: 2 } },
  ]);
  return res.status(200).json(people);
}
