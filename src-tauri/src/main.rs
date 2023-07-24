// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use simple_log::{info, LogConfigBuilder};
use tauri::generate_context;
use chrono::Local;

mod login;
mod user;
mod log;
mod utils;
mod setup;

static VERSION: &str = "0.0.1-SNAPSHOT";
static SERVER_URL: &str = "http://main.vastsea.cc:9527";

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
	let mut file_name = "./log/".to_owned();
	file_name += &Local::now().format("%Y-%m-%d.%H-%M-%S").to_string();
	file_name += ".log";


	let config = LogConfigBuilder::builder()
		// .path(&file_name)
		.size(1 * 100)
		.roll_count(10)
		.time_format("%Y-%m-%d %H:%M:%S.%f") //E.g:%H:%M:%S.%f
		.level("debug")
		.output_file()
		.output_console()
		.build();
	simple_log::new(config).expect("Cannot init logger");

	info!("Loading...");
	tauri::Builder::default()
		.setup(setup::setup)
        .invoke_handler(tauri::generate_handler![
			greet,
			login::window::auth_window_create,
			login::window::auth_window_destroy,
			login::credential::auth_credential_get,
			log::log_debug,
			log::log_info,
			log::log_error,
			user::setting::get_setting,
		])
		
        .run(generate_context!())
        .expect("error while running tauri application");
}
