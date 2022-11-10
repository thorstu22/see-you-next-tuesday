import type { NextApiRequest, NextApiResponse } from "next";
import Folk from "../../../models/Folk";
import dbConnect from "../../../lib/dbConnect";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: Boolean; data?: Data[]; error?: Error }>
) {
  const { method } = req;
  const { pid } = req.query;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const person = await Folk.find({ _id: pid });
        return res.status(200).json({ success: true, data: person });
      } catch (error) {
        return res.status(400).json({ success: false });
      }

    case "DELETE":
      try {
        await Folk.findOneAndRemove({ _id: pid });
        return res.status(200).json({ success: true });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
  }
}
