import type { GetServerSideProps } from "next";
import { useState } from "react";
import { getOptionsForVote } from "../utils/getRandomPokemon";
import type { RouterOutputs } from "../utils/trpc";
import { trpc } from "../utils/trpc"
import Image from "next/image";

interface HomeProps {
  votingOptions: number[]
}

const btn =
  "inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

type PokemonByIdOutput = RouterOutputs['pokemon']['getPokemonById'];

export default function Home({ votingOptions }: HomeProps) {
  // const { data, isLoading } = trpc.example.hello.useQuery({text: 'Bu'});
  const [ids, updateIds] = useState<null | number[]>(null)

  const [first, second] = ids || votingOptions;

  const firstPokemon = trpc.pokemon.getPokemonById.useQuery({ id: Number(first) })
  const secondPokemon = trpc.pokemon.getPokemonById.useQuery({ id: Number(second) })

  const isLoading = firstPokemon.isLoading || secondPokemon.isLoading;

  const voteMutation = trpc.pokemon.castVote.useMutation({});

  const voteForRoundest = (selected: number) => {
    if (selected === first) {
      voteMutation.mutate({ votedFor: first, votedAgainst: second })
      // voteMutation.mutate({ })
    } else {
      voteMutation.mutate({ votedFor: second, votedAgainst: first })
    }
    // todo: fire mutation to persist changes
    updateIds(getOptionsForVote())
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-xl text-center capitalize">
        Which Pokémon is rounder?
      </div>
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center ">
        {firstPokemon.data
          && !isLoading
          && <PokemonListing pokemon={firstPokemon.data} vote={() => voteForRoundest(first)} />
        }
        <div className="p-2" />
        <div className="p-8">Vs</div>
        {secondPokemon.data
          && !isLoading
          && <PokemonListing pokemon={secondPokemon.data} vote={() => voteForRoundest(first)} />
        }
        <div className="p-2" />
      </div>
    </div>
  )
}

// export default dynamic(() => Promise.resolve(Home), {
//   ssr: false
// })

export const getServerSideProps: GetServerSideProps = async () => {
  const votingOptions = getOptionsForVote();

  return {
    props: {
      votingOptions
    }
  }
}

const PokemonListing: React.FC<{
  pokemon: PokemonByIdOutput,
  vote: () => void
}> = ({ pokemon, vote }) => {

  return (
    <div className="w-64 flex flex-col items-center">
      <Image
        className="w-full"
        src={pokemon.sprites.front_default}
        width={256}
        height={256}
        layout='fixed'
      />
      <div className="text-xl text-center mt-[-2rem] capitalize">
        {pokemon.name}
      </div>
      <div className="p-2" />
      <button
        className={btn}
        onClick={() => vote()}
      >
        Rounder
      </button>
    </div>
  )
}

// Things to persists
// 1. votes
// 2. data fetch from API
