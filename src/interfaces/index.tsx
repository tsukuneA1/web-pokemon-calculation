export interface Type {
  name: string;
  typeTagSrc: string;
  typeIconSrc: string;
  num: number;
}

export const attackAbilities: string[] = [
  //at
  'なし',
  'ARシステム',
  'アナライズ',
  'いろめがね',
  'いわはこび',
  'うるおいボイス',
  'エレキスキン',
  'おやこあい',
  'かがくへんかガス',
  'かたいツメ',
  'かたやぶり',
  'がんじょうあご',
  'きもったま',
  'きれあじ',
  'クォークチャージ',
  'げきりゅう',
  'こだいかっせい',
  'ごりむちゅう',
  'こんじょう',
  'サンパワー',
  'しんがん',
  'しんりょく',
  'すいほう',
  'スカイスキン',
  'すてみ',
  'スナイパー',
  'すなのちから',
  'すりぬけ',
  'スロースタート',
  'そうだいしょう',
  'ダークオーラ',
  'ターボブレイズ',
  'ちからずく',
  'ちからもち',
  'てきおうりょく',
  'テクニシャン',
  'てつのこぶし',
  'テラボルテージ',
  'とうそうしん',
  'どくぼうそう',
  'トランジスタ',
  'ねつぼうそう',
  'ノーマルスキン',
  'はがねつかい',
  'はがねのせいしん',
  'バッテリー',
  'ハドロンエンジン',
  'はりきり',
  'はりこみ',
  'パワースポット',
  'パンクロック',
  'ばんけん',
  'フェアリーオーラ',
  'フェアリースキン',
  'プラス',
  'フラワーギフト',
  'フリーズスキン',
  'ブレインフォース',
  'ヘヴィメタル',
  'マイナス',
  'むしのしらせ',
  'メガランチャー',
  'もうか',
  'もらいび',
  'ヨガパワー',
  'よわき',
  'ライトメタル',
  'りゅうのあぎと',
  'わざわいのうつわ',
  'わざわいのおふだ',
  'わざわいのたま',
  'わざわいのつるぎ',
];

export const defenceAbilities: string[] = [
  //df
  'なし',
  'あついしぼう',
  'オーラブレイク',
  'カブトアーマー',
  'かんそうはだ',
  'きよめのしお',
  'クォークチャージ',
  'くさのけがわ',
  'こおりのりんぷん',
  'こだいかっせい',
  'シェルアーマー',
  'すいほう',
  'たいねつ',
  'テラスシェル',
  'てんねん',
  'ハードロック',
  'パンクロック',
  'ファーコート',
  'ファントムガード',
  'フィルター',
  'ふしぎなうろこ',
  'ふゆう',
  'フラワーギフト',
  'プリズムアーマー',
  'フレンドガード',
  'ヘヴィメタル',
  'ぼうじん',
  'マルチスケイル',
  'もふもふ',
  'ライトメタル',
  'わざわいのうつわ',
  'わざわいのおふだ',
  'わざわいのたま',
  'わざわいのつるぎ',
];

export const typeInterface: Type[] = [
  { name: '非選択', typeTagSrc: '/images/types/not_selected.png', typeIconSrc: '/images/types/bef_teras.png', num: 0 },
  { name: 'ノーマル', typeTagSrc: '/images/types/nomaru_tag.png', typeIconSrc: '/images/types/noma_tera.png', num: 1 },
  { name: 'みず', typeTagSrc: '/images/types/mizu_tag.png', typeIconSrc: '/images/types/mizu_tera.png', num: 2 },
  { name: 'ほのお', typeTagSrc: '/images/types/hono_tag.png', typeIconSrc: '/images/types/hono_tera.png', num: 3 },
  {
    name: 'かくとう',
    typeTagSrc: '/images/types/kakuto_tag.png',
    typeIconSrc: '/images/types/kakuto_tera.png',
    num: 4,
  },
  { name: 'ひこう', typeTagSrc: '/images/types/hiko_tag.png', typeIconSrc: '/images/types/hiko_tera.png', num: 5 },
  { name: 'いわ', typeTagSrc: '/images/types/iwa_tag.png', typeIconSrc: '/images/types/iwa_tera.png', num: 6 },
  { name: 'じめん', typeTagSrc: '/images/types/jimen_tag.png', typeIconSrc: '/images/types/jimen_tera.png', num: 7 },
  { name: 'こおり', typeTagSrc: '/images/types/kori_tag.png', typeIconSrc: '/images/types/kori_tera.png', num: 8 },
  { name: 'くさ', typeTagSrc: '/images/types/kusa_tag.png', typeIconSrc: '/images/types/kusa_tera.png', num: 9 },
  { name: 'むし', typeTagSrc: '/images/types/mushi_tag.png', typeIconSrc: '/images/types/mushi_tera.png', num: 10 },
  { name: 'エスパー', typeTagSrc: '/images/types/esupa_tag.png', typeIconSrc: '/images/types/esupa_tera.png', num: 11 },
  { name: 'どく', typeTagSrc: '/images/types/doku_tag.png', typeIconSrc: '/images/types/doku_tera.png', num: 12 },
  { name: 'でんき', typeTagSrc: '/images/types/denki_tag.png', typeIconSrc: '/images/types/denki_tera.png', num: 13 },
  { name: 'あく', typeTagSrc: '/images/types/aku_tag.png', typeIconSrc: '/images/types/aku_tera.png', num: 14 },
  { name: 'はがね', typeTagSrc: '/images/types/hagane_tag.png', typeIconSrc: '/images/types/hagane_tera.png', num: 15 },
  {
    name: 'ドラゴン',
    typeTagSrc: '/images/types/doragon_tag.png',
    typeIconSrc: '/images/types/doragon_tera.png',
    num: 16,
  },
  {
    name: 'ゴースト',
    typeTagSrc: '/images/types/gosuto_tag.png',
    typeIconSrc: '/images/types/gosuto_tera.png',
    num: 17,
  },
  {
    name: 'フェアリー',
    typeTagSrc: '/images/types/feari_tag.png',
    typeIconSrc: '/images/types/feari_tera.png',
    num: 18,
  },
  { name: 'ステラ', typeTagSrc: '/images/types/stella_tag.png', typeIconSrc: '/images/types/stcheck.png', num: 19 },
];

export interface Poke {
  id: number;
  name: string;
  src: string;
  types: Type[];
  hp: number;
  attack: number;
  defence: number;
  specialAttack: number;
  specialDefence: number;
  speed: number;
  abilities: string[];
  weight: number;
  anotherName: string;
  rank: number;
  skill1: string;
  skill2: string;
  skill3: string;
  skill4: string;
  skill5: string;
}

export const pokes: Poke[] = [
  {
    id: 149,
    name: 'カイリュー',
    src: '/images/poke_image/poke0149.png',
    types: [typeInterface[5], typeInterface[16]],
    hp: 91,
    attack: 134,
    defence: 95,
    specialAttack: 100,
    specialDefence: 100,
    speed: 80,
    abilities: ['マルチスケイル'],
    weight: 210,
    anotherName: 'かいりゅー',
    rank: 1000,
    skill1: 'しんそく',
    skill2: 'じしん',
    skill3: 'テラバースト',
    skill4: 'スケイルショット',
    skill5: 'げきりん',
  },
  {
    id: 1000,
    name: 'サーフゴー',
    src: '/images/poke_image/poke01000.png',
    types: [typeInterface[15], typeInterface[17]],
    hp: 87,
    attack: 60,
    defence: 95,
    specialAttack: 133,
    specialDefence: 91,
    speed: 84,
    abilities: ['おうごんのからだ'],
    weight: 30.0,
    anotherName: 'さーふごー',
    rank: 1000,
    skill1: 'シャドーボール',
    skill2: 'ゴールドラッシュ',
    skill3: 'たたりめ',
    skill4: '１０まんボルト',
    skill5: 'テラバースト',
  },
];
