export const coloursRequest = `
  Get me some clours pls
`.trim();

export function cssRequestTemplate(colours: string[], inspiration?: string): string {
  let request = `
    ${colours.join(', ')}
  `.trim();
  
  if (inspiration) {
    request += `/n Use ${inspiration} as inspiration.`;
  }
  return request
}