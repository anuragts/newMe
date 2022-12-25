import type { NextApiRequest, NextApiResponse } from "next";
const jwt = require("jsonwebtoken");

export default async function verify(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send("Unauthorized");
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.status(200).json({ session: decoded });
    } catch (error) {
      res.status(401).send("Unauthorized");
    }
  }
}
