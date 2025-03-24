export const valorantAgent = {
  Brimstone: '브림스톤',
  Viper: '바이퍼',
  Omen: '오멘',
  Killjoy: '킬조이',
  Cypher: '사이퍼',
  Sova: '소바',
  Sage: '세이지',
  Phoenix: '피닉스',
  Jett: '제트',
  Reyna: '레이나',
  Raze: '레이즈',
  Breach: '브리치',
  Skye: '스카이',
  Yoru: '요루',
  Astra: '아스트라',
  KAYO: '케이오',
  Chamber: '체임버',
  Neon: '네온',
  Fade: '페이드',
  Harbor: '하버',
  Gekko: '게코',
  Deadlock: '데드락',
  Iso: '아이소',
  Clove: '클로브',
  Vyse: '바이스',
  Tejo: '테호',
  Waylay: '웨이레이',
} as const

export const matchType = {
  PARTY: '5인큐',
  CUSTOM: '내전',
} as const

export const valorantMap = {
  Ascent: '어센트',
  Fracture: '프렉처',
  Haven: '헤이븐',
  Icebox: '아이스박스',
  Lotus: '로터스',
  Pearl: '펄',
  Split: '스플릿',
  Abyss: '어비스',
  Bind: '바인드',
  Breeze: '브리즈',
  Range: 'Range',
  Sunset: '선셋',
} as const

export function convertAgentName(agent: keyof typeof valorantAgent) {
  return valorantAgent[agent]
}

export function convertMatchType(type: keyof typeof matchType) {
  return matchType[type]
}

export function convertValorantMap(map: keyof typeof valorantMap) {
  return valorantMap[map]
}
