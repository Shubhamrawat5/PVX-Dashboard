// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const bdays = await prisma.bday.findMany();
        return res.status(200).json(bdays);
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}
