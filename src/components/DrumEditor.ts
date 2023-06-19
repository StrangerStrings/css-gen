import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { Drum, DrumPattern, pattern1 } from "../DrumMachine";
import { defaultStyles } from "../defaultStyles";
import { styleMap } from 'lit-html/directives/style-map';
import { RandomElement } from "../Randomizer";

const letters = [
  'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
];

/**
 * a full screen loading page with randomly generated letters
 * that fade in and out, like a wave
 */
@customElement("drum-editor")
export class DrumEditor extends LitElement{
	
	static styles = [
		defaultStyles,
		css`
		:host {
			height: 100%;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			opacity: 0.7;
      color: white;
		}
    mwc-icon {
      cursor: pointer
    }
    .form {
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding: 100px;
    }
    .elem {
      display: flex;
      align-items: center;
      gap: 7px;
    }
    select {
      width: 70px;
      text-align: center;
      font-size: 100%;
    }
    .elem .mwc-icon {

    }

		`
	];

	@property() drum: Drum;

	_changeLetter(ev: Event) {
    const select = ev.target as HTMLSelectElement;
    const idx = Number(select.getAttribute('data-idx'));
    this.drum[idx].letter = select.value;

		this.dispatchEvent(new CustomEvent<Drum>(
							'drum-changed', {detail: this.drum}));
	}

  _addNew() {
    this.drum.push({letter: RandomElement(letters)})
    this.drum = [...this.drum]

		this.dispatchEvent(new CustomEvent<Drum>(
      'drum-changed', {detail: this.drum}));
  }

  _removePad(idx: number) {
    this.drum = this.drum.splice(idx, 1);
  }

  _back() {
    this.dispatchEvent(new Event('back'));
  }

	render() {


    const existingDrums = this.drum.map((drum, idx) => 
      html`<div class='elem'>
        <select @change=${this._changeLetter} data-idx=${idx}>
          ${letters.map(l => html`<option .value=${l} ?selected=${l == drum.letter}>${l}</option>`)}
        </select>
        <mwc-icon @click=${() => this._removePad(idx)}>close</mwc-icon>
      </div>`
    )

		return html`
			<div class='form'>
        <mwc-icon @click=${this._back}>keyboard_backspace</mwc-icon>
        ${existingDrums}
        <mwc-icon @click=${this._addNew}>add</mwc-icon>
			</div>
		`;
	}
}
