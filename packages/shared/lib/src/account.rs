use crate::types::transaction::Transaction;
use namada::types::{
    address::Address,
    key::{
        self,
        common::{PublicKey, SecretKey},
        RefTo,
    },
    transaction::InitAccount,
};
use borsh::BorshSerialize;
use serde::{Deserialize, Serialize};
use std::str::FromStr;
use gloo_utils::format::JsValueSerdeExt;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Serialize,Deserialize)]
pub struct Account {
    tx_data: Vec<u8>,
}

#[wasm_bindgen]
impl Account {
    /// Initialize an account on the Ledger
    #[wasm_bindgen(constructor)]
    pub fn new(
        secret: String,
        vp_code: Vec<u8>,
    ) -> Self {
        let signing_key = SecretKey::Ed25519(key::ed25519::SecretKey::from_str(&secret).unwrap());

        // TODO: Fix the following conversion
        #[allow(clippy::useless_conversion)]
        let public_key = PublicKey::from(signing_key.ref_to());

        let tx_data = InitAccount {
            public_key,
            vp_code,
        }.try_to_vec().expect("Encoding tx data shouldn't fail");

        Self {
            tx_data,
        }
    }

    pub fn to_tx(
        &self,
        secret: String,
        token: String,
        epoch: u32,
        fee_amount: u32,
        gas_limit: u32,
        tx_code: Vec<u8>,
    ) -> Result<JsValue, JsValue> {
        let token = Address::from_str(&token).unwrap();
        let tx_data = self.tx_data.clone();

        let transaction =
            match Transaction::new(secret, token, epoch, fee_amount, gas_limit, tx_code, tx_data) {
                Ok(transaction) => transaction,
                Err(error) => return Err(error),
            };

        // Return serialized Transaction
        Ok(JsValue::from_serde(&transaction).unwrap())
    }
}
