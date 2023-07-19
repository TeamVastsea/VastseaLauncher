use std::collections::HashMap;
use simple_log::{debug, info};
use crate::login::Credentials;
use crate::SERVER_URL;
use crate::user::microsoft::{LoginResponse, refresh_access_token, request_access_token};

#[tauri::command]
pub async fn auth_credential_get(code: String) -> Result<Credentials, String> {
	let response = match request_access_token(code).await {
		Ok(a) => a,
		Err(err) => { return Err(err); }
	};
	
	let backend_response = match reqwest::get(SERVER_URL.to_string() + "/users?atoken=" + response.access_token.clone().unwrap().as_str() + "&token=true").await {
		Ok(a) => { a }
		Err(err) => { return Err(err.to_string()); }
	};
	
	if backend_response.status() != 200 {
		return Err("Backend error: ".to_string() + backend_response.text().await.unwrap().as_str());
	}
	
	let backend_response = backend_response.json::<HashMap<String, String>>().await.unwrap();
	
	println!("{:?}", backend_response);
	
	let credentials = Credentials {
		access_token: response.access_token.unwrap().to_string(),
		refresh_token: response.refresh_token.unwrap().to_string(),
		vastsea_token: None,
	};

	return Ok(credentials);
}