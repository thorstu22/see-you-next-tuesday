// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Folk from "../../../models/Folk";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { _id } = req.body;
  await dbConnect();
  const person = await Folk.findById({ _id });

  const savedPerson = await Folk.findByIdAndUpdate(person._id, {
    votes: person.votes + 1,
  });

  console.log(
    "🚀 ~ file: folks.js ~ line 59 ~ router.put ~ savedPerson",
    savedPerson
  );
  return res.status(200).json(savedPerson);
}
