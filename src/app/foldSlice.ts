import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FoldState {
  atFold: boolean;
  dfFold: boolean;
  envFold: boolean;
  savedFold: boolean;
}

const initialState: FoldState = {
  atFold: false,
  dfFold: false,
  envFold: false,
  savedFold: false,
};

const foldSlice = createSlice({
  name: 'fold',
  initialState,
  reducers: {
    setAtFold(state, action: PayloadAction<boolean>) {
      state.atFold = action.payload;
    },
    setDfFold(state, action: PayloadAction<boolean>) {
      state.dfFold = action.payload;
    },
    setEnvFold(state, action: PayloadAction<boolean>) {
      state.envFold = action.payload;
    },
    setSavedFold(state, action: PayloadAction<boolean>) {
      state.savedFold = action.payload;
    },
  },
});

export const { setAtFold, setDfFold, setEnvFold, setSavedFold } = foldSlice.actions;

export default foldSlice.reducer;
