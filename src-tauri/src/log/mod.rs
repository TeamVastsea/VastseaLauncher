use simple_log::{debug, error, info};

#[tauri::command]
pub fn log_info(message: String) {
	info!("{}", message);
}

#[tauri::command]
pub fn log_debug(message: String) {
	debug!("{}", message);
}

#[tauri::command]
pub fn log_error(message: String) {
	error!("{}", message);
}