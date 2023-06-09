import { Configuration, OpenAIApi } from "openai";
import { CssBits, Doodle, Palette } from "../types";
import { coloursRequest, cssRequestTemplate as cssRequest } from "./Requests";
import { parseAnimationTiming, parseColours, parseCss, parseCssClass } from "./Parsing";
import { Random, RandomElement } from "../Randomizer";

/** Used to talk to chatGpt, specifically for requesting poems */
export class ChatGpt {
	_openai: OpenAIApi;

	constructor(key: string	) {
		const configuration = new Configuration({
				apiKey: key,
		});
		this._openai = new OpenAIApi(configuration);
	}

	/** Send message to chatgpt and return it's response */
  async chat(chat: string): Promise<string> {
		try {
			const response = await this._openai.createChatCompletion({
				model: "gpt-3.5-turbo",
				messages: [{role: "user", content: chat}]
			});
			return response.data.choices[0].message.content;
		} catch {}
		return 'empty string'
	} 

	async getColours(amount: number = 3): Promise<Palette[]> {
		const palettes: Palette[] = [];

		const promises = [];
		for (let i = 0; i < amount; i++) {
			
			const promise = new Promise(async (resolve) => {
				// stagger api calls by waiting
				await new Promise((resolve) => setTimeout(resolve, i*500));
				
				const dark = i%2 == 0;
				const request = coloursRequest(dark);
				const response = await this.chat(request);
				const colours = parseColours(response);

				palettes.push(colours);
				resolve(null);
			});
			promises.push(promise);
		}
		
		await Promise.all(promises);
		return palettes;
	}

	async getDoodles(allColours: string[], count: number = 4): Promise<CssBits[]> {
		const promises = [];
		const cssBits: CssBits[] = [];
		for (let i = 0; i < count; i++) {
			const promise = new Promise(async (resolve) => {
				await new Promise((resolve) => setTimeout(resolve, i*200));
				
				const colours = [
					RandomElement(allColours),
					RandomElement(allColours),
					RandomElement(allColours)
				];
				const inspiration = 'a fox'
				const css = await this._generateCss(colours);
				if (css) {
					cssBits.push(css);
				}
				resolve(null);
			});
			promises.push(promise)
		}
		await Promise.all(promises);
		return cssBits;
	}

	async _generateCss(
		colours: string[], inspiration?: string
	): Promise<CssBits|undefined> {
		try {
			const request = cssRequest(colours, inspiration);
			const response = await this.chat(request);

			const css = parseCss(response);
			const [cssClass, cssClassInner] = parseCssClass(css);
			const timing = parseAnimationTiming(css);

			return {rawCss: response, css, cssClass, cssClassInner, timing};
		} catch {
			return;
		}
	}

	_computeCoordinates(letter: string): [number, number] {
		// upside down layout - so 0 index is at bottom of screen
		const keyboard = [
			['z','x','c','v','b','n','m',''],
			['a','s','d','f','g','h','j','k','l'],
			['q','w','e','r','t','y','u','i','o','p']
		];

		for (let rowIdx = 0; rowIdx < keyboard.length; rowIdx++) {
			const row = keyboard[rowIdx];
			const keyIdx = row.indexOf(letter);
			if (keyIdx !== -1) {
				const y = (rowIdx+1)/(keyboard.length+0.5);
				const x = (keyIdx+1)/(row.length+0.5);
				return [x*100, y*100];
			}
		}
		//should never reach here
		return [Random(0,100), Random(0,100)];
	}

	tempCreateDoodle(cssBits: CssBits[]): Doodle[] {

		const doodles: Doodle[] = [];
		const letters = [
			'a','b','c','d','e','f','g','h','i','j','k','l','m'
			,'n','o','p','q','r','s','t','u','v','w','x','y','z'
		];
		for (let i = 0; i < letters.length; i++) {
			const letter = letters[i];
			let css: CssBits;
			if (cssBits[i]) {
				console.log(letter, ' has itself in cssbits');
				
				css = cssBits[i]
			} else {
				console.log(letter, ' going for random');
				css = RandomElement(cssBits);
			}
			const [x, y] = this._computeCoordinates(letter);
			
			doodles.push({letter, ...css,
				 x, xInitial: x, y, yInitial: y});
		}

		// for (const letter of letters) {
		// 	const css = RandomElement(cssBits);
		// 	const [x, y] = this._computeCoordinates(letter);
			
		// 	doodles.push({letter, ...css,
		// 		 x, xInitial: x, y, yInitial: y});
		// }

		return doodles;
	}
}