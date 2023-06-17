import { Configuration, OpenAIApi } from "openai";
import { CssBits, Palette } from "../types";
import { coloursRequest, cssRequestTemplate as cssRequest } from "./Requests";
import { parseAnimationTiming, parseColours, parseCss, parseCssClass, parseCssVariables } from "./Parsing";
import { RandomElement } from "../Randomizer";
import { mockResponses } from "./mockResponses";

/** Used to talk to chatGpt and return types  */
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

	async generateColours(amount: number = 3): Promise<Palette[]> {
		const palettes: Palette[] = [];

		const promises = [];
		for (let i = 0; i < amount; i++) {
			const promise = new Promise(async (resolve) => {
				// stagger api calls by waiting
				await new Promise((resolve) => setTimeout(resolve, i*200));
				try {
					const dark = i%2 == 0;
					const request = coloursRequest(dark);
					const response = await this.chat(request);
					const colours = parseColours(response);
	
					palettes.push(colours);
				} catch {}
				resolve(null);
			});
			promises.push(promise);
		}
		
		await Promise.all(promises);
		return palettes;
	}

	async generateCss(allColours: string[] = ['a'], count: number = 4): Promise<CssBits[]> {
		const cssBits: CssBits[] = [];

		const promises = [];

		count = mockResponses.length;
		for (let i = 0; i < count; i++) {
			const promise = new Promise(async (resolve) => {
				// stagger api calls by waiting
				await new Promise((resolve) => setTimeout(resolve, i*500));
				
				const colours = [
					RandomElement(allColours),
					RandomElement(allColours),
					RandomElement(allColours)
				];
				const inspiration = 'a fox'
				const css = await this._generateOneCss(colours, i);
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

	async _generateOneCss(colours: string[], i?: number, inspiration?: string): Promise<CssBits|undefined> {
		try {
			const request = cssRequest(colours, inspiration);
			const response = mockResponses[i]
			// const response = await this.chat(request);

			const css = parseCss(response);
			const [cssClass, cssClassInner] = parseCssClass(css);
			const timing = parseAnimationTiming(css);
			const cssVariables = parseCssVariables(response);

			return {rawCss: response, css, cssClass, cssClassInner, timing, cssVariables};
		} catch {}
	}
}