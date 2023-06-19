export type DrumPattern = boolean[][];


export type Pad = {
  letter: string;
}
export type Drum = Pad[]

export const pattern1 = [
  [true, false, false],
  [true, true, false],
  [true, false, false],
  [true, false, false],
  [true, false, false],
  [true, true, true],
  [true, false, false],
  [true, false, false],
  [true, false, false],
  [true, true, false],
  [true, false, false],
  [true, false, false],
  [true, false, false],
  [true, true, true],
  [true, false, false],
  [true, false, false],
  [true, false, false],
  [true, true, false],
  [true, false, false],
  [true, false, false],
  [true, false, false],
  [true, true, true],
  [true, false, false],
  [true, false, false],
  [true, false, false],
  [true, true, false],
  [true, false, false],
  [true, false, false],
  [true, false, false],
  [true, true, true],
  [true, false, false],
  [true, false, false]
]

export const drums1 = [
  [{letter: 'g'},{letter: 'c'}],
  [{letter: 'b'}],
  [{letter: 'j'}]
]

export class DrumMachine {
  pattern: DrumPattern;
  drums: Drum[] = []

  constructor(pattern?: DrumPattern, drums?: Drum[]) {
    this.pattern = pattern
    this.drums = drums

    this.pattern = pattern1;
    this.drums = drums1;
  }
  
  onthebeat(beat: number): Pad[] {
    const thisBeat = this.pattern[beat];
    
    const drumsToPlay: Pad[] = [];
    for (let i = 0; i < this.drums.length; i++) {
      const drumOn = thisBeat[i];
      if (drumOn) {
        drumsToPlay.push(...this.drums[i]);
      }
    }
    return drumsToPlay;
  }

  updateDrums(drums: Drum[]) {
    this.drums = drums
  }

  updatePattern(pattern: DrumPattern) {
    this.pattern = pattern
  }

  doublePatternLength() {
    this.pattern = [...this.pattern, ...this.pattern]
  }

  halfPatternLength() {
    this.pattern = this.pattern.slice(0, this.pattern.length / 2)
  }
}
