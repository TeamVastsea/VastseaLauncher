use lazy_static::lazy_static;

lazy_static!{
	pub static ref FILE_NOT_EXISTS:String = String::from("FILE_NOT_EXISTS");
	pub static ref UNKNOWN_ERROR: String = String::from("UNKNOWN_ERROR");
}

pub fn self_panic(message: String) -> !{
	println!("Ooooops");
	println!("Something happened.");
	println!("Output: {}", message);
	println!("Please take output open issue on https://github.com/TeamVastsea/VastseaLauncher");
	#[warn(unreachable_code)]
	if cfg!(target_os = "windows"){
		std::process::exit(0x100);
	} else {
		std::process::exit(0)
	}
}