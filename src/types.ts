export type Palette = {
	background: string;
	colours: string[];
}

export type Output = {
	background: string;
	keys: Doodle[];
}

export type Doodle = {
	letter: string;
	css: string;
	cssClass: string;
	cssClassInner?: string;
	x: number;
	y: number;
	xInitial: number;
	yInitial: number;
	speedModifier? :number;
}
