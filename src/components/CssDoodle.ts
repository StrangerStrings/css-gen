import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles } from "../defaultStyles";
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
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
				animation-duration: 2s;
				animation-iteration-count: 1;
				animation-fill-mode: forwards;
				opacity: 0;
			}
			.doodle {
			}

			@keyframes wave {
				0% {
					opacity: 0;
				}
				5% {
					opacity: 1;
				}
				15% {
					opacity: 0.9;
				}
				60% {
					opacity: 0.2;
				}
				100% {
					opacity: 0;
				}
			}
		`
	];

	@property({type: Object}) data: Doodle;

	connectedCallback(): void {
		super.connectedCallback();
    this.style.setProperty('--pos-x', `${this.data.x}%`);
    this.style.setProperty('--pos-y', `${this.data.y}%`);
	}

	render() {
		const doodleCss = new CSSStyleSheet();
		doodleCss.replaceSync(this.data.css);
		this.shadowRoot.adoptedStyleSheets
			.push(...this.shadowRoot.adoptedStyleSheets, doodleCss);

		return html`
			<div class="doodle ${this.data.cssClass}">
				<div class="doodle-inner ${this.data.cssClassInner}"></div>
				<span></span>
			</div>
		`;
	}

}
