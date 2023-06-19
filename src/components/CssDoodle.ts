import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles } from "../defaultStyles";
import { Doodle } from "../types";

/**
 * a blank element that takes a generated css string
 * and displays the css picture/pattern/doodle
 */
@customElement("css-doodle")
export class CssDoodle extends LitElement{
	static styles = [
		defaultStyles,
		css`
			:host {
				position: absolute;
				left: var(--pos-x);
				bottom: var(--pos-y);
				transform: translate(-50%, 50%);

				animation-name: wave;
				animation-duration: var(--timing);
				animation-iteration-count: 1;
				animation-fill-mode: forwards;
				opacity: 0;
			}

			@keyframes wave {
				0% {
					opacity: 0;
				}
				5% {
					opacity: 1;
				}
				30% {
					opacity: 1;
				}
				50% {
					opacity: 0.9;
				}
				75% {
					opacity: 0.7;
				}
				100% {
					opacity: 0;
				}
				100% {
					// display: none;
				}
			}
		`
	];

	@property({type: Object}) data: Doodle;

	connectedCallback(): void {
		super.connectedCallback();
		this._applyDoodleCss();
		this._setCssVariables();
	}

	_applyDoodleCss() {
		const doodleCss = new CSSStyleSheet();
		doodleCss.replaceSync(this.data.css);
		this.shadowRoot.adoptedStyleSheets
			.push(...this.shadowRoot.adoptedStyleSheets, doodleCss);
	}

	_setCssVariables() {
    this.style.setProperty('--pos-x', `${this.data.x}%`);
    this.style.setProperty('--pos-y', `${this.data.y}%`);
    this.style.setProperty('--timing', `${this.data.timing[0]*0.6}s`);
		
		for (const variablePair of this.data.cssVariables) {
			const key = variablePair[0];
			const value = variablePair[1];
			this.style.setProperty(key, value);
		}
	}

	render() {
		return html`
			<div class="doodle ${this.data.cssClass}">
				<div class="doodle-inner ${this.data.cssClassInner}"></div>
				<span></span>
			</div>
		`;
	}

}
