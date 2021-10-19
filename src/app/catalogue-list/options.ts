export enum Options {
  az = 'Alphabet (A - Z)',
  za = 'Alphabet (Z - A)',
  lf = 'Date of Creation (latest first)',
}

export const catalogueSort: Record<string, Options> = {
  az: Options.az,
  za: Options.za,
  lf: Options.lf,
};
