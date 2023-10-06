use std::convert::TryInto;

use schemars::JsonSchema;
use serde::{Serialize, Deserialize};

/// AKA Lcg128Xsl64
#[derive(Serialize, Debug, Deserialize, Clone, JsonSchema, PartialEq, Eq)]
pub struct Pcg64 {
    state: String,
    increment: String,
}

impl Pcg64 {
    /// We use a single 255-bit seed to initialise the state and select a stream.
    /// One `seed` bit (lowest bit of `seed[8]`) is ignored.
    pub fn from_seed(seed: [u8; 32]) -> Self {
        let mut seed_u64 = [0u64; 4];
        read_u64_into(&seed, &mut seed_u64);
        let state = u128::from(seed_u64[0]) | (u128::from(seed_u64[1]) << 64);
        let incr = u128::from(seed_u64[2]) | (u128::from(seed_u64[3]) << 64);

        // The increment must be odd, hence we discard one bit:
        Pcg64::from_state_incr(state, incr | 1)
    }

    #[inline]
    pub fn next_u64(&mut self) -> u64 {
        self.step();
        output_xsl_rr(self.state.parse::<u128>().unwrap())
    }

    #[inline]
    fn from_state_incr(state: u128, increment: u128) -> Self {
        let mut pcg = Pcg64 { state: state.to_string(), increment: increment.to_string() };
        // Move away from initial value:
        pcg.state = pcg.state.parse::<u128>()
        .unwrap().wrapping_add(increment).to_string();
    
        pcg.step();
        pcg
    }

    #[inline]
    fn step(&mut self) {
        // prepare the LCG for the next round
        self.state = self
            .state.parse::<u128>().unwrap()
            .wrapping_mul(0x2360_ED05_1FC6_5DA4_4385_DF64_9FCC_F645)
            .wrapping_add(self.increment.parse::<u128>().unwrap())
            .to_string();
    }
}

/// Reads unsigned 64 bit integers from `src` into `dst`.
#[inline]
fn read_u64_into(src: &[u8], dst: &mut [u64]) {
    assert!(src.len() >= 8 * dst.len());
    for (out, chunk) in dst.iter_mut().zip(src.chunks_exact(8)) {
        *out = u64::from_le_bytes(chunk.try_into().unwrap());
    }
}

#[inline(always)]
fn output_xsl_rr(state: u128) -> u64 {
    // Output function XSL RR ("xorshift low (bits), random rotation")
    // Constants are for 128-bit state, 64-bit output
    const XSHIFT: u32 = 64; // (128 - 64 + 64) / 2
    const ROTATE: u32 = 122; // 128 - 6

    let rot = (state >> ROTATE) as u32;
    let xsl = ((state >> XSHIFT) as u64) ^ (state as u64);
    xsl.rotate_right(rot)
}
