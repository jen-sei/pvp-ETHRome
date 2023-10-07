pub mod instance_state;
use cosmwasm_std::Storage;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use crate::generated::state::VIEWING_KEYS;


/******************************************************************************
 alias query obj
*******************************************************************************/
#[derive(Serialize, Deserialize, Clone, Debug, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct AliasOf {
    pub alias_of: String,
}

/******************************************************************************
 instance query obj
*******************************************************************************/
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct InstanceState {
    pub hand: Vec<u8>,
    pub bet: u8,
    pub dealt: bool,
    pub last_outcome: String,
    pub last_win: String
}

pub fn querier_is_auth(store: &dyn Storage, sender_addr: &String, sender_key: &str) -> bool {
    VIEWING_KEYS.get(store, sender_addr) == Some(sender_key.to_owned())
}

#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {

    /******************************************************************************
     instance state info
    *******************************************************************************/
    InstanceState{
        sender_addr: String,
        sender_key: String
    },
}
