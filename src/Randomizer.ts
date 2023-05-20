export const Random = (
  low: number,
  high: number,
  /** Optional property that adds a random +/- number to returned random number,
      making it more spread out but still concentrating possible values in the original range */
  extraSpread?: number
): number => {
  const range = high - low;

  const random = Math.random();
  const multiplied = random * range;
  let shifted = multiplied + low;

  if (extraSpread) {
    /** Random betwen -1 and 1 */
    const random = (Math.random() - 0.5) * 2;
    const multiplied = random * extraSpread;
    shifted += multiplied;
  }

  return parseFloat(shifted.toPrecision(3));
}

export const RandomInt = (
  low: number,
  high: number,
  extraSpread?: number, 
): number => {
  const random = Random(low, high, extraSpread)
  return Math.round(random);
}

/** Pick a random element from an array */
export function RandomElement<T> (
  array: T[]
): T {
  const l = array.length
  const idx = RandomInt(0, l-1)
  return array[idx]
}