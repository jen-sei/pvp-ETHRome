use cosmwasm_std::{StdResult, StdError, MessageInfo, DepsMut, Response, CosmosMsg, BankMsg, Coin};

use crate::{generated::state::INSTANCES, helpers::try_option};

// Ask contract to deal 4 cards to player
pub fn execute_draw(
    deps : DepsMut,
    info : MessageInfo,
    unheld : Vec<u8>) -> StdResult<Response> {
    
        let mut inst = try_option(INSTANCES.get(deps.storage, &info.sender.to_string()))?;
        if !inst.dealt { return Err(StdError::generic_err("Not yet dealt!")) }

        // reset dealt flag so that after draw result can play again.
        inst.dealt = false;
        let value = inst.draw(unheld)?;

        // return the cards from the hand to the deck.
        for _ in 0..5 {
            inst.deck.push(inst.hand.pop().unwrap());
        }

        // if value is non-zero its a win! Send the corresponding token value
        if value != 0 {

            let prize : u128 = value as u128 * inst.bet as u128 * 1_000_000;
            let msg = CosmosMsg::Bank(BankMsg::Send {
                to_address: info.sender.to_string().clone(),
                amount: vec![Coin::new(prize, "uscrt")],
            });

            inst.last_win = prize.to_string();
            INSTANCES.insert(deps.storage, &info.sender.to_string(), &inst)?;
            return Ok(Response::new().add_message(msg))

        }

        // return all unheld cards from hand to deck, reshuffle and refill hand.
        INSTANCES.insert(deps.storage, &info.sender.to_string(), &inst)?;
        Ok(Response::new())
    }