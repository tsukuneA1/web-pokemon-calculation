import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EnvState {
  weather: string;
  field: string;
  reflect: boolean;
  lightScreen: boolean;
  sixteenthDamage: number;
  tenthDamage: number;
  eighthDamage: number;
  sixthDamage: number;
  fourthDamage: number;
  halfDamage: number;
}

const initialState: EnvState = {
  weather: 'なし',
  field: 'なし',
  reflect: false,
  lightScreen: false,
  sixteenthDamage: 0,
  tenthDamage: 0,
  eighthDamage: 0,
  sixthDamage: 0,
  fourthDamage: 0,
  halfDamage: 0,
};

const envSlice = createSlice({
  name: 'env',
  initialState,
  reducers: {
    setWeather(state, action: PayloadAction<string>) {
      state.weather = action.payload;
    },
    setField(state, action: PayloadAction<string>) {
      state.field = action.payload;
    },
    setReflect(state, action: PayloadAction<boolean>) {
      state.reflect = action.payload;
    },
    setLightScreen(state, action: PayloadAction<boolean>) {
      state.lightScreen = action.payload;
    },
    setSixteenth(state, action: PayloadAction<number>) {
      state.sixteenthDamage = action.payload;
    },
    setTenth(state, action: PayloadAction<number>) {
      state.tenthDamage = action.payload;
    },
    setEighth(state, action: PayloadAction<number>) {
      state.eighthDamage = action.payload;
    },
    setSixth(state, action: PayloadAction<number>) {
      state.sixthDamage = action.payload;
    },
    setFourth(state, action: PayloadAction<number>) {
      state.fourthDamage = action.payload;
    },
    setHalf(state, action: PayloadAction<number>) {
      state.halfDamage = action.payload;
    },
  },
});

export const {
  setWeather,
  setField,
  setReflect,
  setLightScreen,
  setSixteenth,
  setTenth,
  setEighth,
  setSixth,
  setFourth,
  setHalf,
} = envSlice.actions;
export default envSlice.reducer;
