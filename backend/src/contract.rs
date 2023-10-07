use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdError, StdResult,
};

use crate::execute;
use crate::execute::ExecuteMsg;

use crate::instantiate::{InstantiateMsg, MigrateMsg};
use crate::query;
use crate::query::QueryMsg;


#[entry_point]
pub fn migrate(_deps: DepsMut, _env: Env, msg: MigrateMsg) -> StdResult<Response> {
    match msg {
        MigrateMsg::Migrate {} => Ok(Response::default()),
        MigrateMsg::StdError {} => Err(StdError::generic_err("this is an std error")),
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: InstantiateMsg,
) -> StdResult<Response> {


    Ok(Response::default())
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(deps: DepsMut, env: Env, info: MessageInfo, msg: ExecuteMsg) -> StdResult<Response> {
    match msg {
        ExecuteMsg::Deal{
            bet
        } => execute::deal::execute_deal(
            deps,
            env,
            info,
            bet,
        ),
        ExecuteMsg::Draw {
            held
        } => execute::draw::execute_draw(
            deps,
            info,
            held,
        ),
        ExecuteMsg::SetViewingKey { 
            key 
        } => execute::set_vk::execute_set_vk(deps, env, info, key),
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::InstanceState {
            sender_addr,
            sender_key,
        } => to_binary(&query::instance_state::query_instance_state(
            deps,
            sender_addr,
            sender_key,
        )?),
    }
}

#[cfg(test)]
mod tests{
    // TODO
}