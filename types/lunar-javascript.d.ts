declare module 'lunar-javascript' {
  class Solar {
    static fromYmd(year: number, month: number, day: number): Solar;
    getLunar(): Lunar;
  }
  class Lunar {
    getDayInChinese(): string;
    getMonthInChinese(): string;
    getJieQi(): string;
  }
  export { Solar, Lunar };
}
