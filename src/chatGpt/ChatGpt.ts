import { Configuration, OpenAIApi } from "openai";
import { Doodle, Palette } from "../types";
import { coloursRequest, cssRequestTemplate as cssRequest } from "./Requests";
import { parseColours, parseCss, parseCssClass } from "./Parsing";
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

	async getDoodles(allColours: string[], count: number = 26): Promise<Doodle[]> {
		const doodles: Doodle[] = [];

		const letters = [
			'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
		];

		const promises = [];
		for (let i = 0; i < count; i++) {
			const promise = new Promise(async (resolve) => {
				const colours = [
					RandomElement(allColours),
					RandomElement(allColours),
					RandomElement(allColours)
				];
				// const inspiration = this._inspiration[idx]
				const letter = letters[i];
				const doodle = await this._generateDoodle(letter, colours);
				doodles.push(doodle);
				resolve(null);
			});
			promises.push(promise)
		}

		await Promise.all(promises);
		return doodles;
	}

	async _generateDoodle(
		letter: string, colours: string[], inspiration?: string
	): Promise<Doodle> {
		const request = cssRequest(colours, inspiration);
		const response = await this.chat(request);
		const css = parseCss(response);
		const cssClass = parseCssClass(css);

		const [x, y] = this._computeCoordinates();
		
		return {
			letter, css, cssClass, x, y
		};
	}

	_computeCoordinates(): [number, number] {
		return [Random(10,90), Random(10,90)];
	}
}