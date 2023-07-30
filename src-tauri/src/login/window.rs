use simple_log::{debug, error, info};
use tauri::{Runtime, Manager, PhysicalSize, Size, LogicalSize};
use tauri::async_runtime::{block_on, spawn, spawn_blocking};
use tauri::Size::Physical;
use crate::login::credential::auth_credential_get;

#[tauri::command]
pub async fn auth_window_create<R: Runtime>(app: tauri::AppHandle<R>){
	let client_id: String = String::from("646004c1-0054-4157-b5b5-4cb89f6eaa1a");

	let main = app.get_window("main").unwrap();
	let url = format!("https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?client_id={}&response_type=code&redirect_uri=https%3A%2F%2Fmccteam.github.io%2Fredirect.html&scope=XboxLive.signin%20offline_access%20openid%20email&prompt=select_account&response_mode=fragment", client_id).parse().unwrap();
	
	let win = tauri::WindowBuilder::new(
		&app.app_handle(),
		"login",
		tauri::WindowUrl::External(
			url
		),
	).on_navigation(move |url|{
		let url_str = url.to_string();
		if url_str.contains("https://mccteam.github.io/redirect.html#code=") {
			let code = url_str.replace("https://mccteam.github.io/redirect.html#code=", "");
			auth_window_destroy(app.app_handle());
			let main_window = app.get_window("main");
			match block_on(auth_credential_get(code)) {
				Ok(res)=> {
					main_window.unwrap().emit("auth_success", res).unwrap();
					true
				},
				Err(err) => {
					main_window.unwrap().emit("auth_fail", err).unwrap();
					true
				}
			};
			// debug!("{}", serde_json::to_string(&credit).unwrap());
		}
		true
	}).build().unwrap();
	
	win.set_maximizable(false).unwrap();
	win.set_minimizable(false).unwrap();
	win.set_resizable(false).unwrap();
	win.set_title("请登陆您的微软账号").unwrap();
	win.set_size(Physical(PhysicalSize{
		width: 400,
		height: 600,
	})).unwrap();
}

#[tauri::command]
pub fn auth_window_destroy<R: Runtime>(app: tauri::AppHandle<R>) -> bool {
	let win = app.get_window("login");
	if win.is_none() {
		error!("Cannot destroy window!");
		return false;
	}
	info!("Login window destroyed.");
	win.unwrap().close().expect("Cannot destroy window.");
	true
}

