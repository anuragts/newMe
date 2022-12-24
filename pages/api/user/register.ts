import type { NextApiRequest,NextApiResponse } from "next";
import { prisma} from "../../../db/client";

export default async function (req:NextApiRequest , res:NextApiResponse){
    const { name, email, password } = req.body;
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password,
        },
    });
    res.status(200).json(user);
}