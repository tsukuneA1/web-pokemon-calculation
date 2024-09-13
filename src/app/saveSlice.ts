import { Poke, pokes } from '@/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SaveState {
  poke: Poke;
  attacker: boolean;
  defender: boolean;
  hEffort: number;
  aEffort: number;
  bEffort: number;
  cEffort: number;
  dEffort: number;
  sEffort: number;
  hIndividual: number;
  bIndividual: number;
  cIndividual: number;
  dIndividual: number;
  sIndividual: number;
  aIndividual: number;
  natureMulti: string;
}

const initialState: SaveState = {
  poke: pokes[0],
  attacker: false,
  defender: false,
  hEffort: 0,
  aEffort: 0,
  bEffort: 0,
  cEffort: 0,
  dEffort: 0,
  sEffort: 0,
  hIndividual: 31,
  aIndividual: 31,
  bIndividual: 31,
  cIndividual: 31,
  dIndividual: 31,
  sIndividual: 31,
  natureMulti: 'いじっぱり',
};

const saveSlice = createSlice({
  name: 'savePoke',
  initialState,
  reducers: {
    setPoke(state, action: PayloadAction<Poke>) {
      state.poke = action.payload;
    },
    setAttacker(state, action: PayloadAction<boolean>) {
      state.attacker = action.payload;
      action.payload ? (state.defender = false) : () => {};
    },
    setDefender(state, action: PayloadAction<boolean>) {
      state.defender = action.payload;
      action.payload ? (state.attacker = false) : () => {};
    },
    setHEffort(state, action: PayloadAction<number>) {
      state.hEffort = action.payload;
    },
    setAEffort(state, action: PayloadAction<number>) {
      state.aEffort = action.payload;
    },
    setBEffort(state, action: PayloadAction<number>) {
      state.bEffort = action.payload;
    },
    setCEffort(state, action: PayloadAction<number>) {
      state.cEffort = action.payload;
    },
    setDEffort(state, action: PayloadAction<number>) {
      state.dEffort = action.payload;
    },
    setSEffort(state, action: PayloadAction<number>) {
      state.sEffort = action.payload;
    },
    setHIndividual(state, action: PayloadAction<number>) {
      state.hIndividual = action.payload;
    },
    setAIndividual(state, action: PayloadAction<number>) {
      state.aIndividual = action.payload;
    },
    setBIndividual(state, action: PayloadAction<number>) {
      state.bIndividual = action.payload;
    },
    setCIndividual(state, action: PayloadAction<number>) {
      state.cIndividual = action.payload;
    },
    setDIndividual(state, action: PayloadAction<number>) {
      state.dIndividual = action.payload;
    },
    setSIndividual(state, action: PayloadAction<number>) {
      state.sIndividual = action.payload;
    },
    setNature(state, action: PayloadAction<string>) {
      state.natureMulti = action.payload;
    },
  },
});

export const {
  setPoke,
  setAttacker,
  setDefender,
  setHEffort,
  setAEffort,
  setBEffort,
  setCEffort,
  setDEffort,
  setSEffort,
  setHIndividual,
  setAIndividual,
  setBIndividual,
  setCIndividual,
  setDIndividual,
  setSIndividual,
  setNature,
} = saveSlice.actions;
export default saveSlice.reducer;
