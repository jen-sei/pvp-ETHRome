
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use crate::{rng::Pcg64, helpers::translate_card};
use cosmwasm_std::StdResult;

#[derive(Serialize, Debug, Deserialize, Clone, JsonSchema)]
pub struct Instance {
    pub deck: Vec<u8>,
    pub hand: Vec<u8>,
    pub rng: Pcg64,
    pub dealt: bool,
    pub bet: u8,
    pub last_outcome: String,
    pub last_win: String
}

#[derive(Debug)]
pub enum Outcome {
    Undefined,
    Lose,
    TwoPair,
    JacksOrBetter,
    Flush,
    FullHouse,
    Straight,
    ThreeOfAKind,
    FourOfAKind,
    StraightFlush,
    RoyalFlush,

}

impl Outcome {
    fn value(&self) -> u8 {
        match *self {
            Outcome::Lose | Outcome::Undefined => 0,
            Outcome::JacksOrBetter => 1,
            Outcome::TwoPair => 2,
            Outcome::ThreeOfAKind => 3,
            Outcome::Straight => 4,
            Outcome::Flush => 6,
            Outcome::FullHouse => 9,
            Outcome::FourOfAKind => 25,
            Outcome::StraightFlush => 50,
            Outcome::RoyalFlush => 250,
        }
    }
}

impl Instance {

    pub fn deal (&mut self) -> StdResult<()> {

        // do tidy up from previous game if 
        // present
        if !self.hand.is_empty() {
            let mut hand_cpy = self.hand.clone();
            self.deck.append(&mut hand_cpy);
            self.hand.clear();
        }

        self.shuffle_deck(2);

        // deal out five cards
        for _ in 0..5 {
            self.hand.push(self.deck.pop().unwrap());
        }
        self.dealt = true;

        Ok(())
    }

    pub fn draw (&mut self, held : & Vec<u8> ) -> StdResult<u8> {
 
 
        // to retain their positions set a temporarilt flag
        // we use a sentinel value of 255, to flag as an unheld card
        // returned to the deck.

        for i in self.hand.iter_mut() {
            if !held.iter().any(|&j|j == *i) {
                // this card is not flagged for hold
                // set it temporarily to 255.
                self.deck.push(*i);
                *i = 255;
            }
            
        }

        // reshuffle cards
        Self::internal_shuffle_deck(&mut self.deck, 2, &mut self.rng);

        // draw more cards
        for i in self.hand.iter_mut()  {
            if *i == 255 {
                *i = self.deck.pop().unwrap();
            }
        }

        // we determine the outcome and return the 
        // value of the draw here
        let outcome = self.get_outcome();
        self.last_outcome = format!("{:?}", outcome);
        Ok(outcome.value())
    }

    pub fn shuffle_deck(&mut self, times: u8) {
        Self::internal_shuffle_deck(&mut self.deck, times, &mut self.rng);
    }

    fn get_outcome (&self) -> Outcome {

        // in order of best to worst
        if self.is_royal_flush() { return Outcome::RoyalFlush; }
        if self.is_straight_flush() { return Outcome::StraightFlush; }
        if self.is_four_of_a_kind() { return Outcome::FourOfAKind; }
        if self.is_full_house() { return Outcome::FullHouse; }
        if self.is_flush() { return Outcome::Flush; }
        if self.is_straight() { return Outcome::Straight; }
        if self.is_three_of_a_kind() { return Outcome::ThreeOfAKind; }
        if self.is_two_pair() { return Outcome::TwoPair; }
        if self.is_jacks_or_better() { return Outcome::JacksOrBetter; }

        Outcome::Lose
    }

    fn is_full_house (&self) -> bool {
         
         // check for two pair then check remaining three
         // are

         let has_three_of_kind = self.is_three_of_a_kind();
         let has_two_of_kind = 
         self.hand.iter().filter(|&n| translate_card(*n).1 == translate_card(self.hand[0]).1).count() == 2 ||
         self.hand.iter().filter(|&n| translate_card(*n).1 == translate_card(self.hand[1]).1).count() == 2 ||
         self.hand.iter().filter(|&n| translate_card(*n).1 == translate_card(self.hand[2]).1).count() == 2 ||
         self.hand.iter().filter(|&n| translate_card(*n).1 == translate_card(self.hand[3]).1).count() == 2 ;


         has_three_of_kind && has_two_of_kind

    }

    fn is_four_of_a_kind (&self) -> bool {

        // count first 2 since there are 5 (n-3)
        self.hand.iter().filter(|&n| translate_card(*n).1 == translate_card(self.hand[0]).1).count() == 4 ||
        self.hand.iter().filter(|&n| translate_card(*n).1 == translate_card(self.hand[1]).1).count() == 4 
    } 

    fn is_three_of_a_kind (&self) -> bool {

        // count first 3 since there are 5 (n-2)
        self.hand.iter().filter(|&n| translate_card(*n).1 == translate_card(self.hand[0]).1).count() == 3 ||
        self.hand.iter().filter(|&n| translate_card(*n).1 == translate_card(self.hand[1]).1).count() == 3 ||
        self.hand.iter().filter(|&n| translate_card(*n).1 == translate_card(self.hand[2]).1).count() == 3
    } 

    fn is_jacks_or_better (&self) -> bool {

        self.hand.iter().filter(|&n| translate_card(*n).1 == 10 /*Jack*/).count() == 2 ||
        self.hand.iter().filter(|&n| translate_card(*n).1 == 11 /*Queen*/).count() == 2 ||
        self.hand.iter().filter(|&n| translate_card(*n).1 == 12 /*Jack*/).count() == 2 ||
        self.hand.iter().filter(|&n| translate_card(*n).1 == 0 /*Ace*/).count() == 2
    }

    // TODO need to find two SEPERATE PAIRS
    fn is_two_pair (&self) -> bool {

        // count first 4 since there are 5 (n-1)
        let mut num_two_pairs = 0;
        let mut last_two_pair_rank = 255;

        let first_card_rank = translate_card(self.hand[0]).1;
        if self.hand.iter().filter(|&n| translate_card(*n).1 == first_card_rank).count() == 2 {
            // found a two-pair
            num_two_pairs += 1;
            last_two_pair_rank = first_card_rank;

        }

        let second_card_rank = translate_card(self.hand[1]).1;
        if self.hand.iter().filter(|&n| translate_card(*n).1 == translate_card(self.hand[1]).1).count() == 2 &&
            last_two_pair_rank != second_card_rank {
            
            // found a two pair. At this point check the last_two_pair_rank is
            // not 255 else fill it.
            num_two_pairs += 1;
            if num_two_pairs == 2 { return true }

            if last_two_pair_rank == 255 {
                last_two_pair_rank = second_card_rank;
            }


        }

        let third_card_rank = translate_card(self.hand[2]).1;
        if self.hand.iter().filter(|&n| translate_card(*n).1 == third_card_rank).count() == 2 &&
        last_two_pair_rank != third_card_rank
        {

            // found a two pair. At this point check the last_two_pair_rank is
            // not 255 else fill it.
            num_two_pairs += 1;
            if num_two_pairs == 2 { return true }


            if last_two_pair_rank == 255 {
                last_two_pair_rank = third_card_rank;
            }
        }

        let fourth_card_rank = translate_card(self.hand[3]).1;
        if self.hand.iter().filter(|&n| translate_card(*n).1 == fourth_card_rank).count() == 2 &&
        last_two_pair_rank != fourth_card_rank
        {
            // found a two pair. At this point theres nothing left to check
            num_two_pairs += 1;
            if num_two_pairs == 2 { return true }

        }

        return num_two_pairs == 2;
        
    }

    fn is_royal_flush(&self) -> bool {

        let suit_of_single = translate_card(self.hand[0]).0;
        let all_same_suit = self.hand.iter().all(|i| { translate_card(*i).0 == suit_of_single });

        let is_consecutive_from_ace = 
        self.hand.iter().any(|i|  translate_card(*i).1 == 0 /*Ace*/) &&
        self.hand.iter().any(|i|  translate_card(*i).1 == 12 /*King*/) &&
        self.hand.iter().any(|i|  translate_card(*i).1 == 11 /*Queen*/) &&
        self.hand.iter().any(|i|  translate_card(*i).1 == 10 /*Jack*/) &&
        self.hand.iter().any(|i|  translate_card(*i).1 == 9 /*10*/);

        all_same_suit && is_consecutive_from_ace
    }

    fn is_straight_flush(&self) -> bool {

        // we only need to check here that the hand when sorted are
        // consecutive numbers.
        let mut sorted_hand = self.hand.clone();
        sorted_hand.sort();
        let mut is_consecutive = true;

        for i in 1..5 /*len of hand*/ {
            if sorted_hand[i] - sorted_hand[i-1] != 1 { is_consecutive = false}
        }

        is_consecutive
    }

    fn is_straight(&self) -> bool {

        // we need to extract the numbers only and check 
        // they are consecutive.
        let mut nums_only : Vec<u8> = vec![]; 

        for i in self.hand.iter() /* len of hand */ {
            nums_only.push(translate_card(*i).1);
        }

        let mut sorted_hand = nums_only.clone();
        sorted_hand.sort();
        let mut is_consecutive = true;

        for i in 1..5 /*len of hand*/ {
            if sorted_hand[i] - sorted_hand[i-1] != 1 { is_consecutive = false}
        }

        is_consecutive

    }


    fn is_flush(&self) -> bool {

        let suit_of_single = translate_card(self.hand[0]).0;
        let all_same_suit = self.hand.iter().all(|i| { translate_card(*i).0 == suit_of_single }); //duplicate

        all_same_suit
    }


    fn internal_shuffle_deck(deck: &mut Vec<u8>, times: u8, rng: &mut Pcg64) {
        for _ in 0..times {
            for i in 0..deck.len() {
                let swap = rng.next_u64() as usize % deck.len();
                deck.swap(i, swap);
            }
        }
    }

}

#[cfg(test)]
mod test_instance {
    // TODO

    use super::*;

    fn mock_inst() -> Instance {
        Instance {
            deck: (0..52).collect::<Vec<u8>>(),
            hand: vec![],
            dealt: false,
            rng: Pcg64::from_seed([0u8; 32]),
            bet: 1,
            last_outcome: format!("{:?}", Outcome::Undefined),
            last_win: "0".to_string()

        }
    }

    #[test]
    fn test_identify_royal_flush() {

        let mut inst = mock_inst();

        // clubs a 10 j q k
        inst.hand = vec![0, 9, 10, 11, 12];
        inst.dealt = true;
        assert_eq!(inst.draw(&inst.hand.clone()).unwrap(), Outcome::RoyalFlush.value()); 

        // diamonds a 10 j q k
        inst.hand = vec![13, 22, 23, 24, 25];
        inst.dealt = true;
        assert_eq!(inst.draw(&inst.hand.clone()).unwrap(), Outcome::RoyalFlush.value()); 

        // spades a 10 j q k
        inst.hand = vec![26, 35, 36, 37, 38];
        inst.dealt = true;
        assert_eq!(inst.draw(&inst.hand.clone()).unwrap(), Outcome::RoyalFlush.value());

        // hearts a 10 j q k
        inst.hand = vec![39, 48, 49, 50, 51];
        inst.dealt = true;
        assert_eq!(inst.draw(&inst.hand.clone()).unwrap(), Outcome::RoyalFlush.value());

    }

    #[test]
    fn test_identify_straight_flush() {

        let mut inst = mock_inst();

        // clubs 2 3 4 5 6
        inst.hand = vec![1,2,3,4,5];
        inst.dealt = true;
        assert_eq!(inst.draw(&inst.hand.clone()).unwrap(), Outcome::StraightFlush.value()); 

        // diamonds 2 3 4 5 6
        inst.hand = vec![14, 15, 16, 17, 18];
        inst.dealt = true;
        assert_eq!(inst.draw(&inst.hand.clone()).unwrap(), Outcome::StraightFlush.value()); 

        // spades 2 3 4 5 6
        inst.hand = vec![27, 28, 29, 30, 31];
        inst.dealt = true;
        assert_eq!(inst.draw(&inst.hand.clone()).unwrap(), Outcome::StraightFlush.value());

        // hearts 2 3 4 5 6
        inst.hand = vec![40, 41, 42, 43, 44];
        inst.dealt = true;
        assert_eq!(inst.draw(&inst.hand.clone()).unwrap(), Outcome::StraightFlush.value());

    }


    # [test]
    fn test_identify_four_of_a_kind() {


        let mut inst = mock_inst();

        // 4 5s
        inst.hand = vec![6, 19, 32, 45, 15];
        inst.dealt = true;
        assert_eq!(inst.draw(&inst.hand.clone()).unwrap(), Outcome::FourOfAKind.value()); 

        // 4 9s
        inst.hand = vec![8, 21, 34, 18, 47];
        inst.dealt = true;
        assert_eq!(inst.draw(&inst.hand.clone()).unwrap(), Outcome::FourOfAKind.value()); 

        // 4 4s
        inst.hand = vec![3, 42, 16, 2, 29];
        inst.dealt = true;
        assert_eq!(inst.draw(&inst.hand.clone()).unwrap(), Outcome::FourOfAKind.value()); 


    }

    #[test]
    fn test_identify_three_of_a_kind() {

        let mut inst = mock_inst();

        // 3 5s
        inst.hand = vec![6, 19, 32, 12, 15];
        inst.dealt = true;
        assert_eq!(inst.draw(&inst.hand.clone()).unwrap(), Outcome::ThreeOfAKind.value()); 

        // 3 9s
        inst.hand = vec![8, 21, 34, 18, 2];
        inst.dealt = true;
        assert_eq!(inst.draw(&inst.hand.clone()).unwrap(), Outcome::ThreeOfAKind.value()); 

        // 3 4s
        inst.hand = vec![3, 5, 16, 2, 29];
        inst.dealt = true;
        assert_eq!(inst.draw(&inst.hand.clone()).unwrap(), Outcome::ThreeOfAKind.value()); 
    }

    #[test]
    fn test_identify_full_house() {

        let mut inst = mock_inst();

        inst.hand = vec![0, 13, 26, 1, 14];
        inst.dealt = true;
        assert_eq!(inst.draw(&inst.hand.clone()).unwrap(), Outcome::FullHouse.value()); 

        inst.hand = vec![27, 13, 26, 1, 14];
        inst.dealt = true;
        assert_eq!(inst.draw(&inst.hand.clone()).unwrap(), Outcome::FullHouse.value()); 

    }

    #[test]
    fn test_identify_two_pair() {

        let mut inst = mock_inst();

        // two queens two 2s
        inst.hand = vec![11, 50, 2, 1, 14];
        inst.dealt = true;
        assert_eq!(inst.draw(&inst.hand.clone()).unwrap(), Outcome::TwoPair.value()); 

        // two 7s two kings
        inst.hand = vec![6, 50, 32, 38, 51];
        inst.dealt = true;
        assert_eq!(inst.draw(&inst.hand.clone()).unwrap(), Outcome::TwoPair.value()); 

        // two aces two 4s
        inst.hand = vec![39, 50, 16, 3, 0];
        inst.dealt = true;
        assert_eq!(inst.draw(&inst.hand.clone()).unwrap(), Outcome::TwoPair.value()); 

    }

    #[test]
    fn test_identify_jacks_or_better() {

        let mut inst = mock_inst();

        // two jacks
        inst.hand = vec![10, 23, 2, 1, 3];
        inst.dealt = true;
        assert_eq!(inst.draw(&inst.hand.clone()).unwrap(), Outcome::JacksOrBetter.value()); 

        // two aces
        inst.hand = vec![0, 23, 2, 13, 3];
        inst.dealt = true;
        assert_eq!(inst.draw(&inst.hand.clone()).unwrap(), Outcome::JacksOrBetter.value());

        // two kings
        inst.hand = vec![12, 23, 25, 13, 3];
        inst.dealt = true;
        assert_eq!(inst.draw(&inst.hand.clone()).unwrap(), Outcome::JacksOrBetter.value()); 

        // two queens
        inst.hand = vec![11, 23, 50, 13, 3];
        inst.dealt = true;
        assert_eq!(inst.draw(&inst.hand.clone()).unwrap(), Outcome::JacksOrBetter.value()); 
    }

    #[test]
    fn test_deal() {

        let mut inst = mock_inst();
        let _ = inst.deal();
        assert_eq!(inst.deck.len(), 47);
        assert!(inst.dealt);
    }

    #[test]
    fn test_flag_unheld() {
        // two jacks

        let mut inst = mock_inst();
        let _ = inst.deal();
        assert_eq!(inst.deck.len(), 47);


        // hold cards at indices cards 0 and 3
        let at_0 = inst.hand[0];
        let at_3 = inst.hand[3];

        let _ = inst.draw(&vec![at_0, at_3]);

        assert_eq!(inst.hand.len(), 5);
        assert_eq!(inst.deck.len(), 47);
        assert_eq!(inst.hand[0], at_0);
        assert_eq!(inst.hand[3], at_3);


        let mut inst2 = mock_inst();
        let _ = inst2.deal();
        assert_eq!(inst2.deck.len(), 47);


        // hold cards at indices cards 2 and 4
        let at_2 = inst.hand[2];
        let at_4 = inst.hand[4];

        let _ = inst2.draw(&vec![at_2, at_4]);

        assert_eq!(inst.hand.len(), 5);
        assert_eq!(inst.deck.len(), 47);
        assert_eq!(inst.hand[2], at_2);
        assert_eq!(inst.hand[4], at_4);
    }

}
