import { defenceAbilities, Poke, pokes, Type, typeInterface } from '@/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DefenderState {
  poke: Poke;
  hActual: number;
  bActual: number;
  dActual: number;
  hIndividual: number;
  bIndividual: number;
  dIndividual: number;
  hEffort: number;
  bEffort: number;
  dEffort: number;
  bRank: number;
  dRank: number;
  bNatureMultiplier: number;
  dNatureMultiplier: number;
  currentAbility: string;
  onAbility: boolean;
  effect: string;
  dfTera: Type;
}

const initialState: DefenderState = {
  poke: pokes[0],
  hActual: Math.floor(((pokes[0].hp * 2 + 31) * 50) / 100 + 60),
  bActual: Math.floor(((pokes[0].defence * 2 + 31) * 1) / 2 + 5),
  dActual: Math.floor(((pokes[0].specialDefence * 2 + 31) * 1) / 2 + 5),
  hIndividual: 31,
  bIndividual: 31,
  dIndividual: 31,
  hEffort: 0,
  bEffort: 0,
  dEffort: 0,
  bRank: 6,
  dRank: 6,
  bNatureMultiplier: 1,
  dNatureMultiplier: 1,
  currentAbility: pokes[0].abilities[0],
  onAbility: false,
  effect: '持ち物なし',
  dfTera: typeInterface[0],
};

const defenderSlice = createSlice({
  name: 'defender',
  initialState,
  reducers: {
    setDfPoke(state, action: PayloadAction<Poke>) {
      state.poke = action.payload;
      state.hEffort = 0;
      state.bEffort = 0;
      state.dEffort = 0;
      state.hIndividual = 31;
      state.bIndividual = 31;
      state.dIndividual = 31;
      state.bNatureMultiplier = 1;
      state.dNatureMultiplier = 1;
      state.bRank = 6;
      state.dRank = 6;
      state.dfTera = typeInterface[0];
      state.hActual = Math.floor(((state.poke.hp * 2 + state.hIndividual + state.hEffort / 4) * 50) / 100 + 50 + 10);
      state.bActual = Math.floor(
        (Math.floor(((state.poke.defence * 2 + state.bIndividual + Math.floor(state.bEffort / 4)) * 1) / 2) + 5) *
          state.bNatureMultiplier,
      );
      state.dActual = Math.floor(
        (Math.floor(((state.poke.specialDefence * 2 + state.dIndividual + state.dEffort / 4) * 1) / 2) + 5) *
          state.dNatureMultiplier,
      );

      if (state.poke.abilities) {
        for (let i = 0; i < state.poke.abilities.length; i++) {
          if (defenceAbilities.includes(state.poke.abilities[i])) {
            state.currentAbility = state.poke.abilities[i];
            break;
          } else {
            state.currentAbility = 'なし';
          }
        }
      } else {
        state.currentAbility = 'なし';
      }
    },
    setHActual(state, action: PayloadAction<number>) {
      state.hActual = action.payload;
    },
    setBActual(state, action: PayloadAction<number>) {
      state.bActual = action.payload;
    },
    setDActual(state, action: PayloadAction<number>) {
      state.dActual = action.payload;
    },
    setHIndividual(state, action: PayloadAction<number>) {
      state.hIndividual = action.payload;
      state.hActual = Math.floor(((state.poke.hp * 2 + state.hIndividual + state.hEffort / 4) * 50) / 100 + 50 + 10);
    },
    setBIndividual(state, action: PayloadAction<number>) {
      state.bIndividual = action.payload;
      state.bActual = Math.floor(
        (Math.floor(((state.poke.defence * 2 + state.bIndividual + Math.floor(state.bEffort / 4)) * 1) / 2) + 5) *
          state.bNatureMultiplier,
      );
    },
    setDIndividual(state, action: PayloadAction<number>) {
      state.dIndividual = action.payload;
      state.dActual = Math.floor(
        (Math.floor(((state.poke.specialDefence * 2 + state.dIndividual + Math.floor(state.dEffort / 4)) * 1) / 2) +
          5) *
          state.dNatureMultiplier,
      );
    },
    setHEffort(state, action: PayloadAction<number>) {
      state.hEffort = action.payload;
      state.hActual = Math.floor(
        Math.floor(((state.poke.hp * 2 + state.hIndividual + state.hEffort / 4) * 50) / 100) + 50 + 10,
      );
    },
    setBEffort(state, action: PayloadAction<number>) {
      state.bEffort = action.payload;
      state.bActual = Math.floor(
        (Math.floor(
          Math.floor(((state.poke.defence * 2 + state.bIndividual + Math.floor(state.bEffort / 4)) * 1) / 2),
        ) +
          5) *
          state.bNatureMultiplier,
      );
    },
    setDEffort(state, action: PayloadAction<number>) {
      state.dEffort = action.payload;
      state.dActual = Math.floor(
        (Math.floor(((state.poke.specialDefence * 2 + state.dIndividual + Math.floor(state.dEffort / 4)) * 1) / 2) +
          5) *
          state.dNatureMultiplier,
      );
    },
    setBNatureMultiplier(state, action: PayloadAction<number>) {
      state.bNatureMultiplier = action.payload;
      state.bActual = Math.floor(
        (Math.floor(((state.poke.defence * 2 + state.bIndividual + Math.floor(state.bEffort / 4)) * 1) / 2) + 5) *
          state.bNatureMultiplier,
      );
    },
    setDNatureMultiplier(state, action: PayloadAction<number>) {
      state.dNatureMultiplier = action.payload;
      state.dActual = Math.floor(
        (Math.floor(((state.poke.specialDefence * 2 + state.dIndividual + Math.floor(state.dEffort / 4)) * 1) / 2) +
          5) *
          state.dNatureMultiplier,
      );
    },
    setCurrentAbility(state, action: PayloadAction<string>) {
      state.currentAbility = action.payload;
    },
    setOnAbility(state, action: PayloadAction<boolean>) {
      state.onAbility = action.payload;
    },
    setDfEffect(state, action: PayloadAction<string>) {
      state.effect = action.payload;
    },
    setDfTera(state, action: PayloadAction<Type>) {
      state.dfTera = action.payload;
    },
    setBRank(state, action: PayloadAction<number>) {
      state.bRank = action.payload;
    },
    setDRank(state, action: PayloadAction<number>) {
      state.dRank = action.payload;
    },
  },
});

export const {
  setDfPoke,
  setHActual,
  setBActual,
  setDActual,
  setHIndividual,
  setBIndividual,
  setDIndividual,
  setHEffort,
  setBEffort,
  setDEffort,
  setBNatureMultiplier,
  setDNatureMultiplier,
  setCurrentAbility,
  setOnAbility,
  setDfEffect,
  setDfTera,
  setBRank,
  setDRank,
} = defenderSlice.actions;
export default defenderSlice.reducer;
