import { Palette } from "../types";
import { colourResponses } from "./mockColours";
import { mockCss } from "./mockCss";

export function parseColours(chatResponse?: string): Palette[] {
  function parsePalettes(text) {
    let paletteBlocks = text.split("\n\n");
    paletteBlocks = paletteBlocks.filter(i => i.includes('#'))
    console.log(paletteBlocks.length);
    
    let palettes = paletteBlocks.map(block => {
        let lines = block.split("\n");
        let background = lines[1].match(/#[0-9A-Fa-f]{6}/)[0];
        let colours = lines.slice(2).map(line => line.match(/#[0-9A-Fa-f]{6}/)[0]);
        return { background, colours };
    });
    return palettes;
  }
  
  return parsePalettes(colourResponses[0]);

  return [
    {background: 'grey', colours: [
      'pink', 'black', 'white', 'green', 'orange' 
    ]},
    {background: 'black', colours: [
      'blue', 'purple', 'green', 'red', 'grey' 
    ]},
    {background: 'white', colours: [
      'purple', 'green', 'grey', 'orange', 'blue' 
    ]},
  ]
}

export function parseCss(chatResponse?: string): string {
  function parseCSS(str: string) {
    // quick replace :after with ::after - sometimes gpt gets it wrong
    let newStr = str.replace(/([a-z]):(before|after)/g, "$1::$2");

    console.log(str);
    
    // pulls out any css blocks that are div, span or .any-class followed by { some:Css; }
    // and separately any @keyframes { 0%{stuff} 100%{stuff} } blocks
    const regex = /((div|span|\.[\w-]+(::before|::after)?)(,\s*(div|span|\.[\w-]+(::before|::after)?))*\s*\{[^}]*?\})|(@keyframes\s+[\w-]+\s*\{(\s*\d+%?\s*\{[^}]*\}\s*)*\})/gs;
    const matches = newStr.match(regex);
    
    console.log(matches.join('\n'));
    return matches.join(' \n ');
  }


  if (chatResponse == 'a') {
    return parseCSS(mockCss[0])
  } 
  if (chatResponse == 'b') {
    return parseCSS(mockCss[1])
  } 
  if (chatResponse == 'c') {
    return parseCSS(mockCss[2])
  } 
  if (chatResponse == 'd') {
    return parseCSS(mockCss[3])
  } 
  if (chatResponse == 'e') {
    return parseCSS(mockCss[4])
  } 
  if (chatResponse == 'f') {
    return parseCSS(mockCss[5])
  } 



  else { return parseCSS(mockCss[6])}
}

export function parseCssClass(css: string): string {
  try {
    let regex = /(?<![0-9])\.[\w-]+/g;
    let classNames = css.match(regex).map(classWithDot => classWithDot.slice(1));
    let uniqueClasses = [...new Set(classNames)]
    if (uniqueClasses.length == 1) {
      console.log(uniqueClasses[0]);
      
      return uniqueClasses[0];
    }
  } catch  (err) {
    console.error(err.message);
    console.log(css);
  }

  // else {
  //   console.log('did not parse css as it has '+uniqueClasses.length+' classes.');
  //   console.log(css);
  //   return '0or2classes';
  // }
}