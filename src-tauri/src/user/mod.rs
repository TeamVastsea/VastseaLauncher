use serde::{Deserialize, Serialize};


pub mod microsoft;
pub mod minecraft;
pub mod setting;

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