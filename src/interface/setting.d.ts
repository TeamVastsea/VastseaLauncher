declare interface Java {
	path: string;
	exe: string;
	version: string;
}
declare interface Setting {
	java: Java[];
	used_java: string;
	full_screen: boolean;
	height: number;
	max_memory: number;
	memory: number;
	width: number;
}