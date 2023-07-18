use simple_log::error;
use tauri::{Runtime, Manager};

#[tauri::command]
pub async fn auth_window_create<R: Runtime>(app: tauri::AppHandle<R>){
	let client_id: String = String::from("646004c1-0054-4157-b5b5-4cb89f6eaa1a");

	let main = app.get_window("main").unwrap();
	let url = format!("https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?client_id={}&response_type=code&redirect_uri=https%3A%2F%2Fmccteam.github.io%2Fredirect.html&scope=XboxLive.signin%20offline_access%20openid%20email&prompt=select_account&response_mode=fragment", client_id).parse().unwrap();
	let win = tauri::WindowBuilder::new(
		&app,
		"login",
		tauri::WindowUrl::External(
			url
		),
	).on_navigation(move |url|{
		let url_str = url.to_string();
		main.emit_to("main", "oauth", url_str).unwrap();
		true
	}).build().unwrap();
}

#[tauri::command]
pub fn auth_window_destroy<R: Runtime>(app: tauri::AppHandle<R>) -> bool {
	let win = app.get_window("oauth");
	if win.is_none() {
		return false;
	}
	error!("Cannot destroy window!");
	win.unwrap().close().expect("Cannot destroy window.");
	true
}

