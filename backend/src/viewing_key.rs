use cosmwasm_std::Env;
use sha2::{Digest, Sha256};

pub const VIEWING_KEY_PREFIX: &str = "vk_";

pub fn new(env: &Env, address: &str, key: &str) -> String {
    let mut sha256 = Sha256::new();
    sha256.update(address.as_bytes());
    sha256.update(env.block.height.to_le_bytes());
    sha256.update(env.block.time.seconds().to_le_bytes());
    sha256.update(key.as_bytes());
    let hash = sha256.finalize();

    VIEWING_KEY_PREFIX.to_string() + &base64::encode(hash)
}
