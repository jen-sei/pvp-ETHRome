use crate::generated::state::VIEWING_KEYS;
use crate::viewing_key;
use cosmwasm_std::{DepsMut, Env, MessageInfo, Response, StdResult};

pub fn execute_set_vk(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    key: String,
) -> StdResult<Response> {
    let new_key = viewing_key::new(&env, info.sender.as_ref(), &key);
    VIEWING_KEYS.insert(deps.storage, &info.sender.into_string(), &new_key)?;
    Ok(Response::new().add_attribute("key", new_key))
}
