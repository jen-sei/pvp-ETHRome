
use cosmwasm_std::{Deps, StdError, StdResult};

use crate::{helpers::try_option, generated::state::INSTANCES};

use super::querier_is_auth;


pub fn query_instance_state(
    deps: Deps,
    sender_addr: String,
    sender_key: String,
) -> StdResult<super::InstanceState> {
    
    if !querier_is_auth(deps.storage, &sender_addr, &sender_key) {
        return Err(StdError::generic_err("Unauthorised!"));
    }

    let inst = try_option(INSTANCES.get(deps.storage, &sender_addr))?;
    
    Ok(super::InstanceState { 
        hand: inst.hand, 
        bet: inst.bet, 
        dealt: inst.dealt,})
}