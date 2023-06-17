export type DrumPattern = boolean[][];

type Drum = {
  letter: string;
}

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
  [true, false, false]
]

const drums1 = [
  {letter: 'g'},
  {letter: 'b'},
  {letter: 'j'}
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
  
  onthebeat(beat: number): Drum[] {
    const thisBeat = this.pattern[beat - 1];
    
    const drumsToPlay: Drum[] = [];
    for (let i = 0; i < this.drums.length; i++) {
      const drumOn = thisBeat[i];
      if (drumOn) {
        drumsToPlay.push(this.drums[i]);
      }
    }
    return drumsToPlay;
  }
}
