export type Doodle = {
	letter: string;
	rawCss?: string;
	css: string;
	cssClass: string;
	cssClassInner?: string;
	x: number;
	y: number;
	xInitial: number;
	yInitial: number;
	speedModifier? :number;
	timing: number[];
	cssVariables: string[][];
}

export type Palette = {
	background: string;
	colours: string[];
}

export type CssBits = {
	rawCss?: string;
	css: string;
	cssClass: string;
	cssClassInner?: string;
	timing: number[];
	cssVariables: string[][];
}