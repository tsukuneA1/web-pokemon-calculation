import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const skill = await prisma.skill.findMany();
      res.status(200).json({ skill });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else if (req.method === 'POST') {
    const { name, power, classification, type } = req.body;
    try {
      const newSkill = await prisma.skill.create({
        data: {
          name,
          power,
          classification,
          type,
        },
      });
      res.status(201).json({ newSkill });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
