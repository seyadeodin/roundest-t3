import { PokemonClient } from 'pokenode-ts';
import { prisma } from '../src/server/db/client'

const doBackfill = async () => {
  const pokeApi = new PokemonClient();

  const allPokemon = await pokeApi.listPokemons(0, 493);

  const formattedPokemon = allPokemon.results.map((pokemon, index) => ({ 
    id: index + 1,
    name: pokemon.name, 
    //namae: (pokemon as { name: string }).name,
    spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
  }))

  const creation = await prisma.pokemon.createMany({
    data: formattedPokemon
  })

  console.log("creaton?", creation);
};

doBackfill();
