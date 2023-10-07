
use cosmwasm_std::{
    BankMsg, Coin, CosmosMsg, Env, MessageInfo, Response, StdError, StdResult,

};

// translates a number into a card by its suit and rank
#[inline(always)]
pub fn translate_card(value: u8) -> (u8, u8) {
    let quot = value / 13;
    let rem = value % 13;

    let suit: u8 = match quot {
        0 | 4 | 8 | 12 => 0,
        1 | 5 | 9 | 13 => 1,
        2 | 6 | 10 | 14 => 2,
        3 | 7 | 11 | 15 => 3,
        _ => unreachable!(),
    };

    (suit, rem)
}

pub fn make_payment(env: &Env, info: &MessageInfo, value: u128, denom: String) -> StdResult<()> {
    // check user can pay entry fee
    if let Some(coin) = info
        .funds
        .iter()
        .find(|coin| -> bool { coin.denom == denom })
    {
        if coin.amount < value.into() {
            return Err(StdError::generic_err(format!(
                "Insufficient funds: funds={} entry={}",
                coin.amount, value
            )));
        }
        if coin.amount > value.into() {
            return Err(StdError::generic_err(format!(
                "Excessive funds: funds={} entry={}",
                coin.amount, value
            )));
        }
    } else {
        return Err(StdError::generic_err("No funds".to_string()));
    }

    let _: CosmosMsg<Response> = CosmosMsg::Bank(BankMsg::Send {
        to_address: env.contract.address.clone().into_string(),
        amount: vec![Coin::new(value, denom)],
    });

    Ok(())
}

#[inline(always)]
pub fn try_option<T>(option: Option<T>) -> StdResult<T> {
    if let Some(inner) = option {
        Ok(inner)
    } else {
        Err(StdError::generic_err("Item doesn't exist".to_string()))
    }
}
