use serde::{Deserialize, Serialize};
use crate::utils;

#[derive(Serialize, Deserialize)]
pub struct Java {
	pub path: String,
	pub exe: String,
	pub version: String
}

#[derive(Serialize, Deserialize)]
pub struct Setting {
    pub java: Vec<Java>,
	pub used_java: String,
	pub memory: i64,
	pub max_memory: i64,
	pub width: i64,
	pub height: i64,
	pub full_screen: bool
}

#[tauri::command]
pub fn get_setting() -> Result<Setting, String>{
	let exists = match utils::fs::file_exists(".cache", "config.json") {
		Ok(is_exists) => is_exists,
		Err(e) => {return Err(e)}
	};
	if !exists{
		return Err(utils::error::FILE_NOT_EXISTS.to_string());
	}
	let setting_raw = match std::fs::read(".cache/config.json"){
		Ok(raw) => raw,
		Err(e) => {return Err(e.to_string())}
	};
	let setting:Setting = match serde_json::from_slice(&setting_raw) {
		Ok(json) => json,
		Err(e) => {return Err(e.to_string())}
	};
	Ok(setting)
}

#[tauri::command]
pub fn update_setting(setting: Setting) -> Result<(), String>{
	let exists = match utils::fs::file_exists(".cache", "config.json") {
		Ok(is_exists) => is_exists,
		Err(e) => {return Err(e)}
	};
	if !exists{
		return Err(utils::error::FILE_NOT_EXISTS.to_string());
	}
	let str = match serde_json::to_string(&setting) {
		Ok(res) => res,
		Err(e) => { return Err(e.to_string())}
	};
	match std::fs::write(".cache/config.json", str) {
		Ok(res) => res,
		Err(err) => {return Err(err.to_string())}
	};
	Ok(())
}