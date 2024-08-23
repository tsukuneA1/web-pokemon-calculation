import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const pokemons = await prisma.pokemon.findMany();
      res.status(200).json(pokemons);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch pokemons' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}