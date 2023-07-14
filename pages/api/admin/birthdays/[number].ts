// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { utility } from '@lib';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const number = req.query.number;
  switch (req.method) {
    case 'GET':
      try {
        const bday = await prisma.bday.findUnique({
          where: { number },
        });
        return res.status(200).json(bday);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    case 'PUT':
      const { name, username, date, month, year, place } = req.body;

      try {
        const updatedBday = await prisma.bday.update({
          where: { number },
          data: {
            name,
            username,
            date: parseInt(date),
            month: parseInt(month),
            year: parseInt(year),
            place,
          },
        });

        return res.status(200).json(updatedBday);
      } catch (error) {
        console.log({ error });
        return res.status(500).json({ error: 'Failed to update bday' });
      }
    case 'DELETE':
      try {
        const deletedBday = await prisma.bday.delete({
          where: { number },
        });
        return res.status(200).json(deletedBday);
      } catch (error) {
        console.log({ error });
        return res.status(500).json({ error: 'Failed to delete bday' });
      }
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}
