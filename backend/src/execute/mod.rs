use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

pub mod deal;
pub mod draw;
pub mod set_vk;

#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {

    /******************************************************************************
     start / restart a game instance by deailing cards
    *******************************************************************************/
    Deal {
        bet: u8
    },

    /******************************************************************************
     execute set ok list
    *******************************************************************************/
    Draw {
        held: Vec<u8>, // cards to hold
    },

    /******************************************************************************
     execute set viewing key
    *******************************************************************************/
    SetViewingKey {
        key: String,
    },

}
