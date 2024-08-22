import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      id,
      name,
      src,
      type1,
      type2,
      ability1,
      ability2,
      ability3,
      hp,
      attack,
      defence,
      spAttack,
      spDefence,
      speed,
      weight,
      anotherName,
      rank,
      skill1,
      skill2,
      skill3,
      skill4,
      skill5,
    } = req.body;

    try {
      const newPokemon = await prisma.pokemon.create({
        data: {
          id,
          name,
          src,
          type1,
          type2,
          ability1,
          ability2,
          ability3,
          hp,
          attack,
          defence,
          spAttack,
          spDefence,
          speed,
          weight,
          anotherName,
          rank,
          skill1,
          skill2,
          skill3,
          skill4,
          skill5,
        },
      });
      res.status(201).json(newPokemon);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create Pokemon ' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
