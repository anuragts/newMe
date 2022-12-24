import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    title,
    description,
    userId,
  }: { title: string; description: string; userId: string } = req.body;
  if (!title || !description || !userId) {
    return res.status(400).json({ message: "Missing some fields" });
  } else {
    const userIdInt = parseInt(userId);
    const resolution = await prisma.resolution.create({
      data: {
        title,
        description,
        user: {
          connect: {
            id: userIdInt,  
          },
        },
      },
    });
    res.status(201).json(resolution);
  }
}
