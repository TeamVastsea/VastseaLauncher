use tauri::{Runtime, Manager};
// let OAUTH_URL = "https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?client_id={}&response_type=code&redirect_uri=https%3A%2F%2Fmccteam.github.io%2Fredirect.html&scope=XboxLive.signin%20offline_access%20openid%20email&prompt=select_account&response_mode=fragment";
#[tauri::command]
pub fn oauth<R: Runtime>(app: tauri::AppHandle<R>) -> String{
	let client_id:String = String::from("646004c1-0054-4157-b5b5-4cb89f6eaa1a");

	std::thread::spawn(move||{
		let main = app.get_window("main").unwrap();
		let url = format!("https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?client_id={}&response_type=code&redirect_uri=https%3A%2F%2Fmccteam.github.io%2Fredirect.html&scope=XboxLive.signin%20offline_access%20openid%20email&prompt=select_account&response_mode=fragment", client_id).parse().unwrap();
		let win = tauri::WindowBuilder::new(
			&app,
			"oauth",
			tauri::WindowUrl::External(
				url
			)
		);
		win.on_navigation(move |url|{
			let url_str = url.to_string();
			main.emit_to("main", "oauth", url_str).unwrap();
			true
		})
		.build()
		.unwrap()
	});
	format!("Hello World")
}
#[tauri::command]
pub fn destory_oauth_window<R: Runtime>(app: tauri::AppHandle<R>) -> bool {
	let win = app.get_window("oauth");
	if win.is_none() {
		return false;
	}
	win.unwrap().close().expect("Close has some wrong");
	true
}

