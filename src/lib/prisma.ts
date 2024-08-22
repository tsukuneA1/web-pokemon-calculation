import { PrismaClient } from '@prisma/client';
import { Poke } from '@/interfaces';
import { Type } from '@/interfaces';
import { typeInterface } from '@/interfaces';

const prisma = new PrismaClient();

export default prisma;

// async function getPokemons(): Promise<Poke[]> {
//     const pokemons = await prisma.pokemon.findMany();

//     const transformedPokemons: Poke[] = pokemons.map((pokemon) => {
//       const types: Type[] = [pokemon.type1, pokemon.type2]
//         .filter((typeName) => typeName !== null)
//         .map((typeName) => {
//           // Typeインターフェースに基づいてtypeInterfaceから詳細を取得
//           return typeInterface.find((type) => type.name === typeName) || {
//             name: '非選択',
//             typeTagSrc: '/images/types/not_selected.png',
//             typeIconSrc: '/images/types/bef_teras.png',
//             num: 0,
//           };
//         });

//       return {
//         id: pokemon.id,
//         name: pokemon.name,
//         src: pokemon.src,
//         types: types,
//         hp: pokemon.hp,
//         attack: pokemon.attack,
//         defence: pokemon.defence,
//         specialAttack: pokemon.spAttack,
//         specialDefence: pokemon.spDefence,
//         speed: pokemon.speed,
//         abilities: [pokemon.ability1, pokemon.ability2, pokemon.ability3].filter(
//           (ability) => ability !== null
//         ),
//         weight: pokemon.weight,
//         anotherName: pokemon.anotherName,
//       };
//     });

//     return transformedPokemons;
// }
//     getPokemons()
//     .then((pokemons) => {
//       console.log(pokemons);
//     })
//     .catch((error) => {
//       console.error(error);
//     })
//     .finally(async () => {
//       await prisma.$disconnect();
//     });
