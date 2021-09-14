export interface Data {
  title: string;
  timeframes: Timeframes;
}

export interface Timeframes {
  daily: Time;
  weekly: Time;
  monthly: Time;
}

export interface Time {
  current: number;
  previous: number;
}
