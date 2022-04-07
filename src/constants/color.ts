export const MonoColor = {
  MONO_BLACK: '#000000',
  MONO_800: '#222222',
  MONO_700: '#4C4C4C',
  MONO_500: '#737373',
  MONO_400: '#999999',
  MONO_300: '#B3B3B3',
  MONO_200: '#CCCCCC',
  MONO_100: '#F2F2F2',
  MONO_WHITE: '#FFFFFF',
} as const;

export type MonoColorValue = ObjectValue<typeof MonoColor>;

export const PrimaryColor = {
  PRIMARY_900: '#1F3372',
  PRIMARY_800: '#2842A3',
  PRIMARY_700: '#2F4CBC',
  PRIMARY_600: '#3557D5',
  PRIMARY_500: '#3E66FB',
  PRIMARY_400: '#9FB3FD',
  PRIMARY_300: '#CFD9FE',
  PRIMARY_200: '#E2E8FE',
  PRIMARY_100: '#ECF0FF',
} as const;

export type PrimaryColorValue = ObjectValue<typeof PrimaryColor>;

export const SecondaryColor = {
  SECONDARY_900: '#7F471C',
  SECONDARY_800: '#985522',
  SECONDARY_700: '#CA722E',
  SECONDARY_600: '#E48033',
  SECONDARY_500: '#FD8E39',
  SECONDARY_400: '#FEBB88',
  SECONDARY_300: '#FED7BA',
  SECONDARY_200: '#FFE807',
  SECONDARY_100: '#FFF4EB',
} as const;

export type SecondaryColorValue = ObjectValue<typeof SecondaryColor>;

export const GrayColor = {
  GRAY_900: '#616469',
  GRAY_800: '#888D92',
  GRAY_700: '#9BA1A7',
  GRAY_600: '#AFB5BC',
  GRAY_500: '#C2C9D1',
  GRAY_400: '#DADFE3',
  GRAY_300: '#EAECEF',
  GRAY_200: '#F3F4F6',
  GRAY_100: '#F6F7F8',
} as const;

export type GrayColorValue = ObjectValue<typeof GrayColor>;

export const ActionColor = {
  ACTION_GREEN: '#00D200',
  ACTION_BLUE: '#0F6FFF',
  ACTION_RED: '#FF0000',
  ACTION_ORANGE: '#FF8A00',
  ACTION_NAVY: '#2300AF',
} as const;

export type ActionColorValue = ObjectValue<typeof ActionColor>;
