import { css, customElement, html, LitElement, property }
	from "lit-element";
import {defaultStyles} from './defaultStyles';

@customElement('whole-page')
/**
 * What it does
 */
export class WholePage extends LitElement {

	static styles = [
		defaultStyles,
		css`
			.container {
				height: 100%;
				padding: 40px;
				background: peachpuff;
			}
		`
	];

	/**
	 * a really good description of a prop
	 */
	@property() name: string = 'Unknown';

	render() {
		return html`
			<div class="container">
				<h1>It's me, your Dad, ${this.name}!</h1>
			</div>
		`;
	}
}
