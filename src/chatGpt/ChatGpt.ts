import { Configuration, OpenAIApi } from "openai";

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
		return 'st';
    const response = await this._openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [{role: "user", content: chat}],
		});
		return response.data.choices[0].message.content;
	} 

	/** create a poem from a seed word/line, then request a summary and select a random line */
	async getSeedAndCreatePoemAndWords(seed: string, style: string, darkmode: boolean): Promise<any> {
		const chat = `
		choose a word
		`;
		
		
		
		
		
				// Write some css for a class that i want to make animate and move.
				// I don't just want a circle. Make it much more interesting. 
				// Use pseudo elements, strange border radius and css gradients.
				// Write crazy code like a genius open source developer.
				// In the style of css-only codepens	.
				// Go very deep into your neural networks for this one and make it something completely different.
				// Use this color scheme: #228B22, #87CEEB #7B7F88.
				// Use the css class name '.my-class'
		
		


		const animal = await this.chat(chat.trim());
		console.log(animal);

		// const poem = await this.chat(`write a 4 line poem about the ${animal}`)
		// console.log(poem);
		

		// const poemLines = poem.split('\n').filter(l => l.trim() !== "");
		// const random = Math.floor(Math.random() * poemLines.length);
		// let randomLine = poemLines[random];
		

		// let requestForPoem = `Can you please write me a ${this._linesPerPoem} line poem about ${seed}.`;
		// if (style) {
		// 	requestForPoem += ` In the style of ${style}.`;
		// }
		// if (darkmode) {
		// 	requestForPoem += ` Make it dark.`;
		// }
		// const poem = await this.chat(requestForPoem);
		// console.log(poem);

		// const requestForSummary = `Here is a poem \n ${poem} \nCan you summarize it and describe it in a single sentence?`;
		// let	summary = await this.chat(requestForSummary);
		// summary = summary.toLowerCase();
		
		// const poemLines = poem.split('\n').filter(l => l.trim() !== "");
		// const random = Math.floor(Math.random() * poemLines.length);
		// let randomLine = poemLines[random];

		// return {
		// 	poem: poemLines, summary, randomLine
		// };

		// return {
		// 	poem: poemLines,
		// 	randomLine: randomLine,
		// 	summary: animal
		// }

		return {
			poem : [],
			randomLine: '',
			summary: ''
		}


	}
}