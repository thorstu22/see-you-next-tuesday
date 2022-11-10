// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Folk from "../../../models/Folk";
const { savePersonToFile, transformString } = require("../../../helpers/utils");

type Data = {
  name: string;
  image: string;
  votes: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: Boolean; data: Data[]; error?: Error }>
) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const data = await Folk.find({}).sort({ votes: -1 });
        return res.status(200).json({
          success: true,
          data,
        });
      } catch (error) {
        return res.status(400).json({ success: false, data: [] });
      }

    case "POST":
      try {
        const { name: nameFromReq } = req.body;

        const name = transformString(nameFromReq);

        const person = await Folk.find({ $text: { $search: name } });

        if (person.length === 0) {
          const filePath = await savePersonToFile(name);
          // save a new person
          if (filePath) {
            const person = new Folk({
              name,
              image: `${name}.jpg`,
              votes: 0,
            });
            const savedPerson = await person.save();
            return res.status(201).json({ success: true, data: [savedPerson] });
          }
        }
        return res.status(200).json({
          success: false,
          data: person,
        });
      } catch (error) {
        return res.status(400).json({ success: false, data: [] });
      }
      break;
    default:
      return res.status(400).json({ success: false, data: [] });
      break;
  }
}
