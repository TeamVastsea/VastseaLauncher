use crate::{utils, user::setting::Setting, log};
use sysinfo::{System, SystemExt};
use serde_json;
use tauri::App;

pub fn setup(app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>>{
	let cache_exists = match utils::fs::fold_exists(".", ".cache") {
		Ok(status) => status,
		Err(e) => {
			utils::error::self_panic(e);
		}
	};
	if !cache_exists{
		match utils::fs::create_fold(".", ".cache") {
			Ok(res) => res,
			Err(e) => {
				utils::error::self_panic(e);
			}
		};
		log::log_info("create cache success".to_string());
	}
	let setting_exists = match utils::fs::file_exists(".cache", "config.json") {
		Ok(state) => state,
		Err(e) => {
			utils::error::self_panic(e)
		}
	};
	if !setting_exists{
		let sys = System::new_all();
		let java_home = match std::env::var_os("JAVA_HOME") {
			Some(value) => value.into_string().unwrap(),
			None => String::from("")
		};
		let max_memory: i64 = (sys.total_memory() / 1024 / 1024).try_into().unwrap();
		let json = Setting {
			java_home,
			memory: 4096,
			max_memory,
			width: 800,
			height: 600,
			full_screen: false,
		};
		let raw = serde_json::to_string(&json).unwrap();
		match utils::fs::create_file(".cache/config.json", &raw) {
			Ok(res) => res,
			Err(err) => utils::error::self_panic(err)
		};
		log::log_info("create setting success".to_string());
	}
	Ok(())
}