/**
 * 通过瀚海Api调用获取的Profile
 */
declare interface VastseaProfile {
	_id: string,
	display_name: string,
	enabled: boolean,
	group: string[],
	bind_qq: number;
	ban_reason?: string
}
/**
 * 通过MojangApi获取的profile
 */
declare interface MojangProfile {
	uuid: string;
	user_name: string;
}

declare interface Profile {
	mojang: MojangProfile;
	vastsea: VastseaProfile
}