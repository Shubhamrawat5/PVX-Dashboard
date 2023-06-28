// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const bdays = await prisma.bday.findMany();
        return res.status(200).json(bdays);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    case 'POST':
      try {
        const { name, date, month, place, username } = req.body;
        const bday = await prisma.bday.create({
          data: {
            date: new Date(date),
            name,
            place,
            username,
            month,
          },
        });
        return res.status(200).json(bday);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}
