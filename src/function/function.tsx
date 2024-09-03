import { Poke } from '@/interfaces';
import { Skill } from '@/app/store';

export function actualCalc(
  baseStat: number,
  individualVal: number,
  effortVal: number,
  natureMultiplier: number,
): number {
  return Math.floor((Math.floor((baseStat * 2 + individualVal) * 0.5) + 5) * 1.1);
}

const panchSkill: string[] = [
  'アイスハンマー',
  'アームハンマー',
  'かみなりパンチ',
  'きあいパンチ',
  'グロウパンチ',
  'コメットパンチ',
  'シャドーパンチ',
  'スカイアッパー',
  'ドレインパンチ',
  'ばくれつパンチ',
  'バレットパンチ',
  'ピヨピヨパンチ',
  'プラズマフィスト',
  'ほのおのパンチ',
  'マッハパンチ',
  'メガトンパンチ',
  'れいとうパンチ',
  'れんぞくパンチ',
  'ダブルパンツァー',
  'あんこくきょうだ',
  'すいりゅうれんだ',
  'ぶちかまし',
  'ジェットパンチ',
  'ふんどのこぶし',
];
const riskSkill: string[] = [
  'アフロブレイク',
  'ウッドハンマー',
  'じごくぐるま',
  'すてみタックル',
  'とっしん',
  'とびげり',
  'とびひざげり',
  'もろはのずつき',
  'フレアドライブ',
  'ブレイブバード',
  'ボルテッカー',
  'ワイルドボルト',
  'ウェーブタックル',
  'かかとおとし',
  'サンダーダイブ',
];
const noiseSkill: string[] = [
  'いびき',
  'うたかたのアリア',
  'エコーボイス',
  'さわぐ',
  'スケイルノイズ',
  'チャームボイス',
  'バークアウト',
  'ハイパーボイス',
  'ばくおんぱ',
  'むしのさざめき',
  'りんしょう',
  'オーバードライブ',
  'ぶきみなじゅもん',
  'フレアソング',
  'みわくのボイス',
  'サイコノイズ',
];
const cutSkill: string[] = [
  'アクアカッター',
  'いあいぎり',
  'エアカッター',
  'エアスラッシュ',
  'がんせきアックス',
  'きょじゅうざん',
  'きりさく',
  'クロスポイズン',
  'サイコカッター',
  'サイコブレイド',
  'シェルブレード',
  'シザークロス',
  'しんぴのつるぎ',
  'せいなるつるぎ',
  'ソーラーブレード',
  'つじぎり',
  'つばめがえし',
  'ドゲザン',
  'ネズミざん',
  'はっぱカッター',
  'ひけん・ちえなみ',
  'むねんのつるぎ',
  'リーフブレード',
  'れんぞくぎり',
];
const chinSkill: string[] = [
  'かみつく',
  'かみくだく',
  'ひっさつまえば',
  'ほのおのキバ',
  'かみなりのキバ',
  'こおりのキバ',
  'どくどくのキバ',
  'サイコファング',
  'エラがみ',
  'くらいつく',
];
const waveSkill: string[] = [
  'あくのはどう',
  'はどうだん',
  'りゅうのはどう',
  'みずのはどう',
  'だいちのはどう',
  'こんげんのはどう',
];
const catastoropheAbilities: string[] = ['わざわいのつるぎ', 'わざわいのたま', 'わざわいのおふだ', 'わざわいのうつわ'];

export function strCalc(damage: number, hp: number): number {
  var count = 1;
  if (damage !== 0) {
    while (damage * count < hp) {
      count++;
    }
  } else {
    count = 0;
  }

  return count;
}

export function damageStrCalc(
  minCount: number,
  maxCount: number,
  hp: number,
  maxDamage: number,
  minMax: number[],
): string {
  var retStr = '';
  if (minCount == maxCount) {
    retStr = `確定${minCount}発`;
  } else if (maxCount == 0) {
  } else {
    retStr = `乱数${maxCount}発`;
    var i = 0;
    while (minMax[i] * maxCount < hp) {
      i++;
    }
    var retRand = 100 - (i / 16) * 100;
    retStr += `${retRand}%`;
  }
  return retStr;
}

export function finalAtActualCalc(
  atPoke: Poke,
  dfPoke: Poke,
  atActual: number,
  atAbility: string,
  dfAbility: string,
  skill: Skill,
  rankPos: number,
  atEffect: string,
): number {
  let retActual = atActual;

  switch (atAbility) {
    case 'スロースタート':
      if (skill.classification === '物理') retActual *= 0.5;
      break;
    case 'よわき':
      retActual *= 0.5;
      break;
    case 'トランジスタ':
      if (skill.type.name === 'でんき') {
        retActual *= 5325 / 4096;
      }
      break;
    case 'クォークチャージ':
    case 'こだいかっせい':
      retActual = (atActual * 5325) / 4096;
      break;
    case 'ハドロンエンジン':
    case 'ひひいろのこどう':
      retActual = (atActual * 5461) / 4096;
      break;
    case 'フラワーギフト':
    case 'こんじょう':
      retActual *= 1.5;
      break;
    case 'しんりょく':
      if (skill.type.name === 'くさ') retActual *= 1.5;
      break;
    case 'もうか':
      if (skill.type.name === 'ほのお') retActual *= 1.5;
      break;
    case 'げきりゅう':
      if (skill.type.name === 'みず') retActual *= 1.5;
      break;
    case 'むしのしらせ':
      if (skill.type.name === 'むし') retActual *= 1.5;
      break;
    case 'もらいび':
      if (skill.type.name === 'ほのお') retActual *= 1.5;
      break;
    case 'サンパワー':
      if (skill.classification === '特殊') retActual *= 1.5;
      break;
    case 'プラス':
    case 'マイナス':
      retActual *= 1.5;
      break;
    case 'いわはこび':
      if (skill.type.name === 'いわ') retActual *= 1.5;
      break;
    case 'はがねつかい':
      if (skill.type.name === 'はがね') retActual *= 1.5;
      break;
    case 'りゅうのあぎと':
      if (skill.type.name === 'ドラゴン') retActual *= 1.5;
      break;
    case 'ごりむちゅう':
      if (skill.classification === '物理') retActual *= 1.5;
      break;
    case 'ちからもち':
    case 'ヨガパワー':
      if (skill.classification === '物理') retActual *= 2.0;
      break;
    case 'すいほう':
      if (skill.type.name === 'みず') retActual *= 2.0;
      break;
    case 'はりこみ':
      retActual *= 2.0;
      break;
  }

  retActual = Math.round(retActual);

  switch (atEffect) {
    case 'こだわりハチマキ':
      if (skill.classification === '物理') retActual *= 1.5;
      break;
    case 'こだわりメガネ':
      if (skill.classification === '特殊') retActual *= 6144 / 4096;
      break;
    case 'ふといホネ':
      if (['ガラガラ', 'カラカラ', 'ガラガラ(アローラ)'].includes(atPoke.name)) {
        if (skill.classification === '物理') retActual *= 2.0;
      }
      break;
    case 'でんきだま':
      if (atPoke.name === 'ピカチュウ') retActual *= 2.0;
      break;
  }

  retActual = Math.round(retActual);

  switch (dfAbility) {
    case 'わざわいのうつわ':
      if (skill.classification === '特殊') {
        if (!catastoropheAbilities.includes(atAbility)) {
          retActual *= 3 / 4;
        }
      }
      break;
    case 'わざわいのおふだ':
      if (skill.classification === '物理') {
        if (!catastoropheAbilities.includes(atAbility)) {
          retActual *= 3 / 4;
        }
      }
      break;
    case 'あついしぼう':
      if (skill.type.name === 'ほのお' || skill.type.name === 'こおり') retActual *= 0.5;
      break;
    case 'たいねつ':
      if (skill.type.name === 'ほのお') retActual *= 0.5;
      break;
    case 'きよめのしお':
      if (skill.type.name === 'ゴースト') retActual *= 0.5;
      break;
    case 'すいほう':
      if (skill.type.name === 'ほのお') retActual *= 0.5;
      break;
  }

  retActual = Math.round(retActual);

  if (rankPos <= 6) {
    retActual *= (8 - rankPos) / 2;
  } else {
    retActual *= 2 / (rankPos - 4);
  }

  return Math.round(retActual);
}

export function finalDfActualCalc(
  dfActual: number,
  atAbility: string,
  dfAbility: string,
  dfEffect: string,
  rankPos: number,
  skill: Skill,
  dfType1: string,
  dfType2: string,
  weather: string,
): number {
  let retAct = dfActual;

  if (rankPos <= 6) {
    retAct *= (8 - rankPos) / 2;
  } else {
    retAct *= 2 / (rankPos - 4);
  }
  retAct = Math.floor(retAct);

  switch (weather) {
    case 'すなあらし':
      if (dfType1 === 'いわ' || dfType2 === 'いわ') {
        if (skill.classification === '特殊') {
          retAct *= 6144 / 4096;
        }
      }
      break;
    case 'あられ':
      if (dfType1 === 'こおり' || dfType2 === 'こおり') {
        if (skill.classification === '物理') {
          retAct *= 6144 / 4096;
        }
      }
      break;
  }
  retAct = Math.floor(retAct);

  switch (atAbility) {
    case 'わざわいのつるぎ':
      if (skill.classification === '物理') {
        if (!catastoropheAbilities.includes(dfAbility)) {
          retAct *= 3 / 4;
        }
      }
      break;
    case 'わざわいのたま':
      if (skill.classification === '特殊') {
        if (!catastoropheAbilities.includes(dfAbility)) {
          retAct *= 3 / 4;
        }
      }
      break;
  }

  switch (dfAbility) {
    case 'クォークチャージ':
    case 'こだいかっせい':
      retAct *= 1.3;
      break;
    case 'ふしぎなうろこ':
    case 'くさのけがわ':
      if (skill.classification === '物理') {
        retAct *= 1.5;
      }
      break;
    case 'ファーコート':
      if (skill.classification === '物理') {
        retAct *= 2.0;
      }
      break;
    case 'フラワーギフト':
      if (skill.classification === '特殊') {
        retAct *= 1.5;
      }
      break;
  }

  switch (dfEffect) {
    case 'しんかのきせき':
      retAct *= 1.5;
      break;
    case 'とつげきチョッキ':
      if (skill.classification === '特殊') {
        retAct *= 1.5;
      }
      break;
  }

  retAct = Math.floor(retAct);

  return retAct;
}

export function finalSkillPowerCalc(
  atPoke: Poke,
  skill: Skill,
  atSpCh: string,
  atEffect: string,
  field: string,
): number {
  let skillPower = skill.power;

  // Effect-based modification
  switch (atEffect) {
    case 'パンチグローブ':
      if (panchSkill.includes(skill.name)) {
        skillPower *= 1.1;
      }
      break;
    case 'タイプ強化系':
    case 'お面':
      skillPower *= 1.2;
      break;
    case 'ちからのハチマキ':
      if (skill.classification === '物理') {
        skillPower *= 1.1;
      }
      break;
    case 'ものしりメガネ':
      if (skill.classification === '特殊') {
        skillPower *= 1.1;
      }
      break;
    case 'こんごうだま':
      if (atPoke.name === 'ディアルガ') {
        if (skill.type.name === 'ドラゴン' || skill.type.name === 'はがね') {
          skillPower *= 4915 / 4096;
        }
      }
      break;
    case 'しらたま':
      if (atPoke.name === 'パルキア') {
        if (skill.type.name === 'ドラゴン' || skill.type.name === 'みず') {
          skillPower *= 4915 / 4096;
        }
      }
      break;
    case 'はっきんだま':
      if (atPoke.name === 'ギラティナ') {
        if (skill.type.name === 'ドラゴン' || skill.type.name === 'ゴースト') {
          skillPower *= 4915 / 4096;
        }
      }
      break;
    case 'こころのしずく':
      if (atPoke.name === 'ラティアス' || atPoke.name === 'ラティオス') {
        if (skill.type.name === 'ドラゴン' || skill.type.name === 'エスパー') {
          skillPower *= 4915 / 4096;
        }
      }
      break;
    case 'ノーマルジュエル':
      if (skill.type.name === 'ノーマル') {
        skillPower *= 5325 / 4096;
      }
      break;
  }

  // Field-based modification
  switch (field) {
    case 'エレキフィールド':
      if (skill.type.name === 'でんき') {
        skillPower *= 5325 / 4096;
        if (skill.name === 'ライジングボルト') {
          skillPower *= 2;
        }
      }
      break;
    case 'グラスフィールド':
      if (skill.type.name === 'くさ') {
        skillPower *= 5325 / 4096;
      }
      if (skill.name === 'じしん') {
        skillPower *= 0.5;
      }
      break;
    case 'サイコフィールド':
      if (skill.type.name === 'エスパー') {
        skillPower *= 5325 / 4096;
        if (skill.name === 'サイコブレイド' || skill.name === 'ワイドフォース') {
          skillPower *= 6144 / 4096;
        }
      }
      break;
    case 'ミストフィールド':
      if (skill.type.name === 'ドラゴン') {
        skillPower *= 0.5;
      }
      break;
  }

  // At-spec-ch-based modification
  switch (atSpCh) {
    case 'エレキスキン':
    case 'スカイスキン':
    case 'フェアリースキン':
    case 'フリーズスキン':
      if (skill.type.name === 'ノーマル') {
        skillPower *= 4915 / 4096;
      }
      break;
    case 'てつのこぶし':
      if (panchSkill.includes(skill.name)) {
        skillPower *= 4915 / 4096;
      }
      break;
    case 'すてみ':
      if (riskSkill.includes(skill.name)) {
        skillPower *= 4915 / 4096;
      }
      break;
    case 'とうそうしん':
      skillPower *= 5120 / 4096;
      break;
    case 'ちからずく':
      skillPower *= 5325 / 4096;
      break;
    case 'すなのちから':
      if (skill.type.name === 'いわ' || skill.type.name === 'じめん' || skill.type.name === 'はがね') {
        skillPower *= 5325 / 4096;
      }
      break;
    case 'アナライズ':
      skillPower *= 5325 / 4096;
      break;
    case 'かたいつめ':
      if (skill.classification === '物理') {
        skillPower *= 5325 / 4096;
      }
      break;
    case 'パンクロック':
      if (noiseSkill.includes(skill.name)) {
        skillPower *= 5325 / 4096;
      }
      break;
    case 'きれあじ':
      if (cutSkill.includes(skill.name)) {
        skillPower *= 6144 / 4096;
      }
      break;
    case 'テクニシャン':
      if (skill.power <= 60) {
        skillPower *= 6144 / 4096;
      }
      break;
    case 'ねつぼうそう':
      if (skill.classification === '特殊') {
        skillPower *= 6144 / 4096;
      }
      break;
    case 'どくぼうそう':
      if (skill.classification === '物理') {
        skillPower *= 6144 / 4096;
      }
      break;
    case 'がんじょうあご':
      if (chinSkill.includes(skill.name)) {
        skillPower *= 6144 / 4096;
      }
      break;
    case 'メガランチャー':
      if (waveSkill.includes(skill.name)) {
        skillPower *= 6144 / 4096;
      }
      break;
    case 'はがねのせいしん':
      if (skill.type.name === 'はがね') {
        skillPower *= 6144 / 4096;
      }
      break;
  }

  return Math.floor(skillPower);
}

export function finalDamageMagnification(
  atPoke: Poke,
  dfPoke: Poke,
  skill: Skill,
  reflect: boolean,
  lightScreen: boolean,
  atAbility: string,
  atEffect: string,
  dfAbility: string,
  dfEffect: string,
  typeMag: number,
): number {
  let retDamage = 1;
  if (reflect) {
    if (skill.classification === '物理') {
      retDamage *= 0.5;
    }
  }
  if (lightScreen) {
    if (skill.classification === '特殊') {
      retDamage *= 0.5;
    }
  }

  switch (skill.name) {
    case 'アクセルブレイク':
    case 'イナズマドライブ':
      if (typeMag >= 2.0) {
        retDamage *= 5461 / 4096;
      }
  }

  switch (atEffect) {
    case '命の珠':
      retDamage *= 5324 / 4096;
    case 'たつじんのおび':
      retDamage *= 4915 / 4096;
  }

  switch (dfAbility) {
    case 'マルチスケイル':
    case 'ファントムガード':
      retDamage *= 0.5;
      break;
    case 'もふもふ':
      if (skill.type.name === 'ほのお') {
        retDamage *= 2.0;
      }
      break;
    case 'パンクロック':
      if (noiseSkill.includes(skill.name)) {
        retDamage *= 0.5;
      }
      break;
    case 'こおりのりんぷん':
      if (skill.classification === '特殊') {
        retDamage *= 0.5;
      }
      break;
    case 'プリズムアーマー' || 'ハードロック' || 'フィルター':
      if (typeMag >= 2.0) {
        retDamage *= 3072 / 4096;
      }
      break;
  }

  switch (dfEffect) {
    case '半減きのみ':
      retDamage *= 0.5;
  }
  return retDamage;
}
