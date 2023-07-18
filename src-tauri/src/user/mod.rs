use std::borrow::Cow;

use serde::{Deserialize, Serialize};
use serde_json::Value;


pub mod microsoft;
pub mod minecraft;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct UserInfo {//_id: mc uuid
    pub _id: String,
    pub display_name: String,
    pub enabled: bool,
    pub group: Vec<String>,
    pub bind_qq: Option<i64>,
    pub ban_reason: Option<String>
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct UserMCProfile {
    pub uuid: String,
    pub user_name: String,
}