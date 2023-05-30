import { css, customElement, html, LitElement } from "lit-element";
import { defaultStyles } from "../defaultStyles";

/** Input for a openai api key */
@customElement("api-input")
export class ApiInput extends LitElement{
	static styles = [
		defaultStyles,
		css`
			:host {
			height: 100%;
			width: 100%;
			overflow: hidden;
			}

		 .title {
				position: absolute;
				bottom: 57%;
				left: 50%;
				transform: translate(-50%, 50%);
				width: 100%;
				opacity: 0.2;
				font-size: 13rem;
				color: var(--color);
				text-align: center;
				user-select: none;
			}

			input {
				position: absolute;
				bottom: 55%;
				left: 50%;
				transform: translate(-50%, 50%);
				height: 40px;
				width: 200px;
				text-align: center;
			}
		`
	];

	_onInputKeyUp(ev: KeyboardEvent) {
		const input = ev.target as HTMLInputElement;
		const apiKey = input.value.trim();
		
		if (apiKey.length > 15 && apiKey.startsWith('sk-')) {
			this.dispatchEvent(new CustomEvent<string>('api-key', {detail: apiKey}));
		}
	}

	render() {
		return html`
			<h3 class="title">Css Generation</h3>
			<input 
				type="text" 
				placeholder="Paste OpenAI Key" 
				id="api-key" 
				@input=${this._onInputKeyUp}/>
		`;
	}
}
