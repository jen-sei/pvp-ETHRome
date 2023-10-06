use crate::generated::state::ALIASES;
use cosmwasm_std::{DepsMut, MessageInfo, Response, StdResult};

pub fn execute_set_alias(deps: DepsMut, info: MessageInfo, alias: String) -> StdResult<Response> {
    ALIASES.insert(deps.storage, &alias, &info.sender.to_string())?;
    Ok(Response::new().add_attribute("action", "set alias"))
}
