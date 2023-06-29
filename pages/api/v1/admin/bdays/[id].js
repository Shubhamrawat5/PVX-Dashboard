// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const id = req.query.id;
      try {
        const bday = await prisma.bday.findUnique({
          where: { id: parseInt(id) },
        });
        return res.status(200).json(bday);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}
