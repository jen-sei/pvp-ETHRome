use cosmwasm_std::{DepsMut, Env, MessageInfo, StdResult, Response, StdError};

use crate::{helpers::{make_payment, try_option}, generated::state::INSTANCES, instance::{Instance, Outcome}, rng::Pcg64};


    // Ask contract to deal 4 cards to player
pub fn execute_deal( deps : DepsMut,
    env : Env,
    info : MessageInfo,
    bet : u8) -> StdResult<Response> {


        let mut inst  = match try_option(INSTANCES.get(deps.storage, &info.sender.to_string())) {
            Ok(inst) => inst,
            _ => Instance {
                deck: (0..52).collect::<Vec<u8>>(),
                hand: vec![],
                dealt: false,
                rng: Pcg64::from_seed(try_option(env.block.random.clone())?.to_array::<32>()?),
                bet,
                last_outcome: format!("{:?}", Outcome::UNDEFINED),
                last_win: "0".to_string()

            }
        };

        if inst.dealt {
            return Err(StdError::generic_err("already dealt"));
        }

        // the bet will go up to 5 scrt
        make_payment(&env, &info, bet as u128 * 1_000_000, "uscrt".to_string())?;
        inst.deal()?;
        INSTANCES.insert(deps.storage, &info.sender.to_string(), &inst)?;
        
        Ok(Response::new())
    }