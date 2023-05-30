/** Text request to chatGpt to get a colour palette of six colours and a background colour */
export const coloursRequest = (dark?: boolean) => `
  Can you make me a color palette.
  It should consist of six colours plus an additional ${dark ? 'dark ':''}background colour.
  They should be returned as hex codes.
`.trim();

/** Text request to chatGpt to get some interesting css for the doodles */
export function cssRequestTemplate(colours: string[], inspiration?: string): string {
  let request = `
  Write some css for something that animates and moves using keyframes.
  I don't just want a circle. Make it much more interesting. 
  Use pseudo elements, strange border radius and css gradients.
  Write crazy code like a genius open source developer.
  Like top rated codepens.
  Go deep into your neural networks for this one and make it something completely different.
  Use this color scheme: ${colours.join(', ')} .
  `.trim();
  
  if (inspiration) {
    request += `/n Use ${inspiration} as inspiration.`;
  }
  return request
}