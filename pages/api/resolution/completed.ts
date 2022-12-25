import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

export default async function completed(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id , userId }: { id: string , userId:string } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Missing some fields" });
  } else {
    const resolution = await prisma.resolution.delete({
      where: {
        id: parseInt(id),
      },
    });
    
    const userIdInt:number = parseInt(userId);
    const rescompleted = await prisma.user.findFirst({
      where: {
        id: {
          equals: userIdInt,
        },
      },
      select: {
        completed: true,
      },
    });
    if (rescompleted === null) {
      return res.status(400).json({ message: "User not found" });
    }
    let resolutionCount:number = rescompleted.completed as number;
    console.log(resolutionCount);
    resolutionCount = resolutionCount + 1;
    const addCompleted = await prisma.user.update({
      where: {
        id: userIdInt,
      },
      data: {
        completed: resolutionCount,
      },
    })
    res.status(200).json(addCompleted);
  }
}
