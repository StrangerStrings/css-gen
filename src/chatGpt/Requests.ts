export const coloursRequest = (dark?: boolean) => `
  Can you make me a color palette.
  It should consist of six colours plus an additional ${dark ? 'dark ':''}background colour.
  They should be returned as hex codes.
`.trim();

export const coloursRequestOld = `
  Can you make me some color palettes.
  Each should consist of six colours plus an additional background colour.
  They should be returned as hex codes. 

  Return three palettes in total:
  One palette based on natural colours
  One palette based on muted colours
  One palette based on modern colours
`.trim();

export function cssRequestTemplate(colours: string[], inspiration?: string): string {
  let request = `
  Write some css for a class that i want to make animate and move.
  I don't just want a circle. Make it much more interesting. 
  Use pseudo elements, strange border radius and css gradients.
  Write crazy code like a genius open source developer.
  In the style of css-only codepens	.
  Go very deep into your neural networks for this one and make it something completely different.
  Use this color scheme: ${colours.join(', ')}
  `.trim();
  
  if (inspiration) {
    request += `/n Use ${inspiration} as inspiration.`;
  }
  return request
}