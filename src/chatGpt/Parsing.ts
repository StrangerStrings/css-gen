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
    {background: 'black', colours: [
      'blue', 'purple', 'green', 'red', 'grey' 
    ]},
    {background: 'grey', colours: [
      'pink', 'black', 'white', 'green', 'orange' 
    ]},
    {background: 'white', colours: [
      'purple', 'green', 'white', 'orange', 'blue' 
    ]},
  ]
}

export function parseCss(chatResponse?: string): string {
  function parseCSS(str) {
    const codeBlockRegex = /```[\w]*([\s\S]*?)```/g;
    const cssRegex = /(\.?\w+\s?(?:\:\w+)?\s?(?:\,\.?\w+\s?(?:\:\w+)?\s?)*\s?\{[^}]+\})/g;
    
    let codeBlockMatch = codeBlockRegex.exec(str);
    
    if (codeBlockMatch) {
        let cssCode = codeBlockMatch[1].match(cssRegex);
        console.log(cssCode);
        
        return cssCode.join('\n');
    } else {
        return str;
    }
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



  else { return parseCSS(mockCss[2])}
}

export function parseCssClass(css: string): string {
  let regex = /(?<![0-9])\.[\w-]+/g;
  let classNames = css.match(regex).map(classWithDot => classWithDot.slice(1));
  let uniqueClasses = [...new Set(classNames)]

  if (uniqueClasses.length == 1) {
    return uniqueClasses[0];
  }
  else {
    console.log('did not parse css as it has '+uniqueClasses.length+' classes.');
    console.log(css);
    return '0or2classes';
  }
}