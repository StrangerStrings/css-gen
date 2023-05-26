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
		// return 'st';
		try {
			const response = await this._openai.createChatCompletion({
				model: "gpt-3.5-turbo",
				messages: [{role: "user", content: chat}],
			});
			return response.data.choices[0].message.content;
		} catch {}
		return 'empty string'
	} 
}