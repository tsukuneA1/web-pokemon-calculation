import { Poke, Type } from '@/interfaces';
import { Skill } from './store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SavedDamage {
  atPoke: Poke;
  referAt: boolean;
  atActual: number;
  atRank: number;
  currentAbility: string;
  effect: string;
  selectedSkill: Skill;
  atTera: Type;
  reflect: boolean;
  lightScreen: boolean;
  weather: string;
  field: string;
  critical: boolean;
  attackTime: number;
  burn: boolean;
  dfAbility: string;
  dfEffect: string;
  dfRank: number;
  dfTera: Type;
  preeminence: boolean;
}

interface PlusDamageState {
  stats: SavedDamage[];
}

const initialState: PlusDamageState = {
  stats: [],
};

const statSlice = createSlice({
  name: 'savedDamage',
  initialState,
  reducers: {
    addStats(state, action: PayloadAction<SavedDamage>) {
      state.stats.push(action.payload);
    },
    subStats(state, action: PayloadAction<number>) {
      state.stats.splice(action.payload, 1);
    },
    deleteAll(state){
      state.stats = [];
    }
  },
});

export const { addStats, subStats, deleteAll } = statSlice.actions;

export default statSlice.reducer;
