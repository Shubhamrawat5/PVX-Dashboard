// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const { name, username, date, month, year, place, number } = req.body;

      const bday = await prisma.bday.findUnique({ where: { number } });

      if (bday) {
        return res.status(400).json({ error: 'Number already exists' });
      }

      try {
        const newBday = await prisma.bday.create({
          data: {
            name,
            username,
            date: parseInt(date),
            month: parseInt(month),
            year: parseInt(year),
            place,
            number,
          },
        });

        res.status(200).json(newBday);
      } catch (error) {
        console.log({ error });
        res.status(500).json({ error: 'Failed to create bday' });
      }
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}
