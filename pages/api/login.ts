import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const { TOKEN_SECRET, TOKEN_EXPIRATION } = process.env;

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    username: string;
    password: string;
  };
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  try {
    // Find the admin record with the provided username
    const admin = await prisma.admin.findUnique({ where: { username } });

    // If admin not found or password doesn't match, return an error response
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate the auth_token
    const auth_token = jwt.sign({ username }, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRATION });

    // Update the admin record with the generated auth_token
    await prisma.admin.update({
      where: {
        username,
      },
      data: {
        auth_token,
      },
    });

    // Return the auth_token in the response
    return res.status(200).json({ auth_token });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred during login' });
  } finally {
    await prisma.$disconnect();
  }
}
