import { router } from "../trpc";
import { authRouter } from "./auth";
import { pokemonRouter } from "./";

export const appRouter = router({
  pokemon: pokemonRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
