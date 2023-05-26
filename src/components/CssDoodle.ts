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
			/* todo bg: change this to root (somehow) **/
			:host {
				position: absolute;
				left: var(--pos-x);
				bottom: var(--pos-y);
			}
			.inner {
				position: relative;
			}
			.doodle {
				
			}
			.doodle-inner {
				
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
				<div class="opacity">
					<div class="doodle ${this.data.cssClass}">
						<div class="doodle-inner ${this.data.cssClassInner}"></div>
						<span></span>
					</div>
				</div>
			</div>
		`;
	}

}
