import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Poke, pokes, Type, typeInterface } from '@/interfaces';
import defenderReducer from './defenderSlice';
import envReducer from './envSlice';
import savedReducer from './damageSlice';
import foldReducer from './foldSlice';

interface SetSkillPayload {
  skill: Skill;
  dfPoke: Poke;
}

export interface Skill {
  name: string;
  power: number;
  type: Type;
  classification: string;
}

interface State {
  atPoke: Poke;
  referAt: boolean;
  atActual: number;
  baseStat: number;
  individualValue: number;
  effortValue: number;
  natureMultiplier: number;
  atRank: number;
  currentAbility: string;
  abilityChecked: boolean;
  effect: string;
  selectedSkill: Skill;
  atTera: Type;
  atStella: boolean;
  teraIconSrc: string;
  stellaIconSrc: string;
  selectClassFlag: boolean;
  attackTime: number;
  critical: boolean;
  doublePower: boolean;
  burn: boolean;
  threeQuaters: boolean;
  stellaPreeminence: boolean;
}

const initialState: State = {
  atPoke: pokes[1],
  referAt: false,
  atActual: Math.floor(((pokes[1].specialAttack * 2 + 31) * 1) / 2 + 5),
  baseStat: 135,
  individualValue: 31,
  effortValue: 0,
  natureMultiplier: 1.0,
  atRank: 6,
  currentAbility: 'ハドロンエンジン',
  abilityChecked: false,
  effect: '持ち物なし',
  selectedSkill: { name: 'イナズマドライブ', power: 100, type: typeInterface[13], classification: '特殊' },
  atTera: typeInterface[0],
  atStella: false,
  teraIconSrc: typeInterface[0].typeIconSrc,
  stellaIconSrc: '/images/types/stella.png',
  selectClassFlag: false,
  attackTime: 1,
  critical: false,
  doublePower: false,
  burn: false,
  threeQuaters: false,
  stellaPreeminence: false,
};

const statSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setAtPoke: (state, action: PayloadAction<Poke>) => {
      state.atPoke = action.payload;
      state.atActual = Math.floor(
        (Math.floor(((state.baseStat * 2 + state.individualValue + Math.floor(state.effortValue / 4)) * 1) / 2) + 5) *
          state.natureMultiplier,
      );
      state.effortValue = 0;
      state.atRank = 6;
      state.abilityChecked = false;
      state.currentAbility = state.atPoke.abilities[0];
      state.effect = '持ち物なし';
      state.natureMultiplier = 1;
      state.atTera = typeInterface[0];
      state.teraIconSrc = typeInterface[0].typeIconSrc;
      if (state.atPoke.name.includes('オーガポン(')) {
        state.effect = 'タイプ強化系';
      }
    },
    setReferAt: (state, action: PayloadAction<boolean>) => {
      state.referAt = action.payload;
      let classification = '物理';
      if (state.referAt) {
        state.baseStat = state.atPoke.attack;
        state.atActual = Math.floor(((state.baseStat * 2 + state.individualValue) * 1) / 2 + 5);
        classification = '物理';
      } else {
        state.baseStat = state.atPoke.specialAttack;
        classification = '特殊';
      }

      if (state.selectedSkill.name === 'テラバースト') {
        state.selectedSkill = {
          name: state.selectedSkill.name,
          type: state.selectedSkill.type,
          power: state.selectedSkill.power,
          classification: classification,
        };
      }
    },
    setBaseStat: (state, action: PayloadAction<number>) => {
      state.baseStat = action.payload;
      state.atActual = Math.floor(
        (Math.floor(((state.baseStat * 2 + state.individualValue + Math.floor(state.effortValue / 4)) * 1) / 2) + 5) *
          state.natureMultiplier,
      );
    },
    setIndividualValue: (state, action: PayloadAction<number>) => {
      state.individualValue = action.payload;
      state.atActual = Math.floor(
        (Math.floor(((state.baseStat * 2 + state.individualValue + Math.floor(state.effortValue / 4)) * 1) / 2) + 5) *
          state.natureMultiplier,
      );
    },
    setEffortValue: (state, action: PayloadAction<number>) => {
      state.effortValue = action.payload;
      state.atActual = Math.floor(
        (Math.floor(((state.baseStat * 2 + state.individualValue + Math.floor(state.effortValue / 4)) * 1) / 2) + 5) *
          state.natureMultiplier,
      );
    },
    setNatureMultiplier: (state, action: PayloadAction<number>) => {
      state.natureMultiplier = action.payload;
      state.atActual = Math.floor(
        Math.floor(
          Math.floor(
            Math.floor((state.baseStat * 2 + state.individualValue + Math.floor(state.effortValue / 4)) * 1) / 2,
          ) + 5,
        ) * state.natureMultiplier,
      );
    },
    setAtRank: (state, action: PayloadAction<number>) => {
      state.atRank = action.payload;
    },
    setAbility: (state, action: PayloadAction<string>) => {
      state.currentAbility = action.payload;
    },
    setAbilityChecked: (state, action: PayloadAction<boolean>) => {
      state.abilityChecked = action.payload;
    },
    setEffect: (state, action: PayloadAction<string>) => {
      state.effect = action.payload;
      if (state.atPoke.name.includes('オーガポン(')) {
        state.effect = 'タイプ強化系';
      }
    },
    setSkill: (state, action: PayloadAction<SetSkillPayload>) => {
      const { skill, dfPoke } = action.payload;
      state.selectedSkill = skill;

      if (skill.name == 'テラバースト') {
        state.selectClassFlag = true;
        let classification = '物理';
        if (!state.referAt) {
          classification = '特殊';
        } else {
          classification = '物理';
        }
        if (state.atTera !== typeInterface[0]) {
          if(state.atTera === typeInterface[19]){
            state.selectedSkill = {
              name: skill.name,
              power: 100,
              type: typeInterface[19],
              classification: classification
            }
          }else{
            state.selectedSkill = {
              name: 'テラバースト',
              power: 80,
              type: state.atTera,
              classification: classification,
            }
          }
        }
      } else {
        state.selectClassFlag = false;
      }

      if (state.selectedSkill.name === 'テラクラスター' && state.atTera === typeInterface[19]) {
        state.selectedSkill = {
          name: state.selectedSkill.name,
          power: state.selectedSkill.power,
          type: typeInterface[19],
          classification: '特殊',
        };
      }

      if (state.selectedSkill.classification === '物理') {
        state.referAt = true;
        state.baseStat = state.atPoke.attack;
      } else {
        state.referAt = false;
        state.baseStat = state.atPoke.specialAttack;
      }

      if (state.selectedSkill.name === 'すいりゅうれんだ' || state.selectedSkill.name === 'あんこくきょうだ') {
        state.critical = true;
      } else {
        state.critical = false;
      }

      if (state.selectedSkill.name === 'ツタこんぼう') {
        if (state.atPoke.name === 'オーガポン(竈)') {
          state.selectedSkill = {
            name: state.selectedSkill.name,
            power: state.selectedSkill.power,
            type: typeInterface[3],
            classification: state.selectedSkill.classification,
          };
        } else if (state.atPoke.name === 'オーガポン(井戸)') {
          state.selectedSkill = {
            name: state.selectedSkill.name,
            power: state.selectedSkill.power,
            type: typeInterface[2],
            classification: state.selectedSkill.classification,
          };
        } else if (state.atPoke.name === 'オーガポン(礎)') {
          state.selectedSkill = {
            name: state.selectedSkill.name,
            power: state.selectedSkill.power,
            type: typeInterface[6],
            classification: state.selectedSkill.classification,
          };
        } else {
          state.selectedSkill = {
            name: state.selectedSkill.name,
            power: state.selectedSkill.power,
            type: typeInterface[9],
            classification: state.selectedSkill.classification,
          };
        }
      }

      if (state.selectedSkill.name === 'ボディプレス') {
        state.baseStat = state.atPoke.defence;
      }

      if (state.selectedSkill.name === 'くさむすび' || state.selectedSkill.name === 'けたぐり') {
        let power = 20;
        if (dfPoke.weight >= 200) {
          power = 120;
        } else if (dfPoke.weight >= 100 && dfPoke.weight < 200) {
          power = 100;
        } else if (dfPoke.weight >= 50 && dfPoke.weight < 100) {
          power = 80;
        } else if (dfPoke.weight >= 25 && dfPoke.weight < 50) {
          power = 60;
        } else if (dfPoke.weight >= 10 && dfPoke.weight < 25) {
          power = 40;
        } else {
          power = 20;
        }
        state.selectedSkill = {
          name: state.selectedSkill.name,
          power: power,
          type: state.selectedSkill.type,
          classification: state.selectedSkill.classification,
        };
      }
      if (state.selectedSkill.name === 'ヘビーボンバー' || state.selectedSkill.name === 'ヒートスタンプ') {
        let power = 0;
        if (state.atPoke.weight >= dfPoke.weight * 5) {
          power = 120;
        } else if (state.atPoke.weight >= dfPoke.weight * 4) {
          power = 100;
        } else if (state.atPoke.weight >= dfPoke.weight * 3) {
          power = 80;
        } else if (state.atPoke.weight >= dfPoke.weight * 2) {
          power = 60;
        } else {
          power = 40;
        }
        state.selectedSkill = {
          name: state.selectedSkill.name,
          power: power,
          type: state.selectedSkill.type,
          classification: state.selectedSkill.classification,
        };
      }

      if (state.selectedSkill.name === 'テラクラスター') {
        state.atTera === typeInterface[19]
          ? (state.selectedSkill = {
              name: state.selectedSkill.name,
              type: typeInterface[19],
              power: state.selectedSkill.power,
              classification: state.selectedSkill.classification,
            })
          : (state.selectedSkill = {
              name: state.selectedSkill.name,
              type: typeInterface[1],
              power: state.selectedSkill.power,
              classification: state.selectedSkill.classification,
            });
      }
    },
    setAtTera: (state, action: PayloadAction<Type>) => {
      state.atTera = action.payload;

      action.payload === typeInterface[19]
        ? (state.stellaIconSrc = typeInterface[19].typeIconSrc)
        : (state.teraIconSrc = action.payload.typeIconSrc);

      if (state.selectedSkill.name === 'テラバースト') {
        let classification = '物理';
        if (!state.referAt) {
          classification = '特殊';
        } else {
          classification = '物理';
        }
        if (action.payload !== typeInterface[0]) {
          if (action.payload === typeInterface[19]) {
            state.stellaPreeminence = true;
          } else {
            state.stellaPreeminence = false;
          }
          action.payload === typeInterface[19]
            ? (state.selectedSkill = {
                name: 'テラバースト',
                power: 100,
                type: typeInterface[19],
                classification: classification,
              })
            : (state.selectedSkill = {
                name: 'テラバースト',
                power: 80,
                type: state.atTera,
                classification: classification,
              });
        } else {
          state.baseStat = state.atPoke.specialAttack;
          state.referAt = false;
          state.selectedSkill = {
            name: 'テラバースト',
            power: 80,
            type: typeInterface[1],
            classification: '特殊',
          };
        }
      }

      if (state.selectedSkill.name === 'テラクラスター') {
        state.atTera === typeInterface[19]
          ? (state.selectedSkill = {
              name: state.selectedSkill.name,
              type: typeInterface[19],
              power: state.selectedSkill.power,
              classification: state.selectedSkill.classification,
            })
          : (state.selectedSkill = {
              name: state.selectedSkill.name,
              type: typeInterface[1],
              power: state.selectedSkill.power,
              classification: state.selectedSkill.classification,
            });
      }
    },
    setAtStella: (state, action: PayloadAction<boolean>) => {
      state.atStella = action.payload;
      action.payload ? (state.atTera = typeInterface[19]) : (state.atTera = typeInterface[0]);
    },
    setTeraIcon: (state, action: PayloadAction<string>) => {
      state.atTera === typeInterface[19]
        ? (state.teraIconSrc = typeInterface[0].typeIconSrc)
        : (state.teraIconSrc = action.payload);
    },
    setStellaIcon: (state, action: PayloadAction<string>) => {
      state.stellaIconSrc = action.payload;
    },
    setAtActual: (state) => {
      state.atActual = Math.floor(
        Math.floor(
          Math.floor(
            Math.floor((state.baseStat * 2 + state.individualValue + Math.floor(state.effortValue / 4)) * 1) / 2,
          ) + 5,
        ) * state.natureMultiplier,
      );
    },
    setAttackTime: (state, action: PayloadAction<number>) => {
      state.attackTime = action.payload;
    },
    setCritical: (state, action: PayloadAction<boolean>) => {
      state.critical = action.payload;
    },
    setDoublePower: (state, action: PayloadAction<boolean>) => {
      state.doublePower = action.payload;
    },
    setBurn: (state, action: PayloadAction<boolean>) => {
      state.burn = action.payload;
    },
    setThreeQuaters: (state, action: PayloadAction<boolean>) => {
      state.threeQuaters = action.payload;
    },
    setPreeminence: (state, action: PayloadAction<boolean>) => {
      state.stellaPreeminence = action.payload;
    },
  },
});

export const {
  setBaseStat,
  setReferAt,
  setIndividualValue,
  setEffortValue,
  setNatureMultiplier,
  setAtRank,
  setAbility,
  setAbilityChecked,
  setEffect,
  setSkill,
  setAtPoke,
  setAtTera,
  setAtStella,
  setTeraIcon,
  setStellaIcon,
  setAtActual,
  setAttackTime,
  setCritical,
  setDoublePower,
  setBurn,
  setThreeQuaters,
  setPreeminence,
} = statSlice.actions;

const store = configureStore({
  reducer: {
    stats: statSlice.reducer,
    defender: defenderReducer,
    env: envReducer,
    saved: savedReducer,
    fold: foldReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
