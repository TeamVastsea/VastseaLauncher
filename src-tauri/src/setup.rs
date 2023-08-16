use crate::{utils, user::setting::{Setting, Java}, log};
use sysinfo::{System, SystemExt};
use serde_json;
use tauri::{App, Manager};
use regex::Regex;

pub fn setup(app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>>{
	#[cfg(debug_assertions)]
    {
      let window = app.get_window("main").unwrap();
      window.open_devtools();
    }
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
		let mut exe: String = String::from("");
		let mut sep = "\\";
		if !utils::os_check::is_window(){
			sep = "/";
		}
		let mut collect:Vec<&str> = java_home.split(
			sep
		).collect();
		if java_home.contains(".exe"){
			exe += &String::from(collect[collect.len() - 1]);
			exe += ".exe";
			collect.pop();
		} else {
			exe += "javaw.exe";
		}
		let regex = Regex::new(r"(?m)(jdk|jre)\-(?<version>\d+\.\d+\.\d+)").unwrap();
		log::log_info(java_home.clone());
		if let Some(capture) = regex.captures(&java_home) {
			log::log_info(String::from(capture.name("version").unwrap().as_str().clone()));
			let version = capture.name("version").unwrap().as_str();
			let java:Java = Java{
				path: collect.join(sep).clone(),
				exe: exe,
				version: String::from(version)
			};
			let max_memory: i64 = (sys.total_memory() / 1024 / 1024).try_into().unwrap();
			let json = Setting{
				java: vec![java],
				used_java: collect.join(sep).clone(),
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
	}
	Ok(())
}