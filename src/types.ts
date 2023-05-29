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
}