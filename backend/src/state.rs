type Addr = String;
type ViewingKey = String;

use crate::instance::Instance;
use cosmwasm_std::Timestamp;
use serde::{Deserialize, Serialize};
use secret_toolkit::serialization::Json;
use secret_toolkit::storage::{Item, Keymap, KeymapBuilder, WithoutIter };

/******************************************************************************
 Globals
*******************************************************************************/

// loss limit
pub static LOSS_THRESHOLD: Item<u8, Json> = Item::new(b"loss_threshold");

// net losses since last timeout
pub static LOSS_TRACKER: Keymap<Addr, String, Json, WithoutIter> =
KeymapBuilder::new(b"allocations").without_iter().build();

// addresses on timeout with timestamp
pub static ON_TIMEOUT: Keymap<Addr, Timestamp, Json, WithoutIter> =
KeymapBuilder::new(b"timeout").without_iter().build();

// game instances
pub static INSTANCES: Keymap<Addr, Instance, Json, WithoutIter> =
    KeymapBuilder::new(b"allocations").without_iter().build();

// viewing keys
pub static VIEWING_KEYS: Keymap<Addr, ViewingKey, Json, WithoutIter> =
    KeymapBuilder::new(b"viewing_keys").without_iter().build();
