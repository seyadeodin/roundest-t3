import { PokemonClient } from "pokenode-ts";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";
import { prisma } from "../../db/client";

export const pokemonRouter = router({
  getPokemonById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const api = new PokemonClient();

      const pokemon = await api.getPokemonById(input.id);
      return pokemon;
    }),
  castVote: publicProcedure
    .input(z.object({
      votedFor: z.number(),
      votedAgainst: z.number()
    }))
    .mutation(async ({ input }) => {
      const voteInDb = await prisma.vote.create({
        data: {
          ...input
        }
      })
      return { sucess: true, vote: voteInDb }
    })
})