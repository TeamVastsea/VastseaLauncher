pub mod window;
pub mod credential;

#[derive(Clone, serde::Serialize, serde::Deserialize)]
pub struct Credentials {
	access_token: String,
	refresh_token: String,
	vastsea_token: Option<String>
}