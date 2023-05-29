import { css, customElement, html, LitElement, property } from "lit-element";
import { defaultStyles } from "../defaultStyles";

/** Input for a openai api key */
@customElement("api-input")
export class ApiInput extends LitElement{
	static styles = [
		defaultStyles,
		css`
     :host {
			display: flex;
			height: 40px;
			gap: 20px;
		 }

		 input {
			flex: 1;
			text-align: center;
		 }
		`
	];

	_onInputKeyUp(ev: KeyboardEvent) {
		const input = ev.target as HTMLInputElement;
		const apiKey = input.value;
		if (apiKey.length > 15) {
			this.dispatchEvent(new CustomEvent<string>('api-key', {detail: apiKey}));
		}
	}

	render() {
		return html`
			<input 
				type="text" 
				placeholder="Paste OpenAI Key" 
				id="api-key" 
				@input=${this._onInputKeyUp}/>
		`;
	}
}
