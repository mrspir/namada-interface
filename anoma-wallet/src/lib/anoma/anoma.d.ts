/* tslint:disable */
/* eslint-disable */
/**
* @param {number} size
* @returns {string}
*/
export function generate_mnemonic(size: number): string;
/**
* @param {any} serialized_keypair
* @param {Uint8Array} data
* @returns {Uint8Array}
*/
export function sign(serialized_keypair: any, data: Uint8Array): Uint8Array;
/**
* @param {PublicKey} pk
* @param {Uint8Array} data
* @param {Uint8Array} signature_bytes
*/
export function verify_signature(pk: PublicKey, data: Uint8Array, signature_bytes: Uint8Array): void;
/**
*/
export function run(): void;
/**
*/
export enum PhraseSize {
  N12,
  N24,
}
/**
*/
export class Address {
  free(): void;
/**
* @param {Keypair} keypair
* @returns {Address}
*/
  static from_keypair(keypair: Keypair): Address;
/**
* @param {string} encoded
* @returns {Address}
*/
  static decode(encoded: string): Address;
/**
* @returns {string}
*/
  readonly encoded: string;
}
/**
*/
export class Keypair {
  free(): void;
/**
* @param {string} mnemonic
* @param {number} iterations
* @returns {Keypair}
*/
  static from_mnemonic(mnemonic: string, iterations: number): Keypair;
/**
* @returns {any}
*/
  serialize(): any;
/**
* @param {any} js_data
* @returns {Keypair}
*/
  static deserialize(js_data: any): Keypair;
/**
* @returns {Uint8Array}
*/
  to_bytes(): Uint8Array;
}
/**
*/
export class PublicKey {
  free(): void;
}
/**
*/
export class Signature {
  free(): void;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} encoded
* @returns {Signature}
*/
  static deserialize(encoded: Uint8Array): Signature;
}
/**
*/
export class Transfer {
  free(): void;
/**
* @param {any} serialized_keypair
* @param {string} encoded_source
* @param {string} encoded_target
* @param {string} token
* @param {number} amount
* @param {number} epoch
* @param {number} fee_amount
* @param {number} gas_limit
* @param {Uint8Array} tx_code
* @returns {any}
*/
  static new(serialized_keypair: any, encoded_source: string, encoded_target: string, token: string, amount: number, epoch: number, fee_amount: number, gas_limit: number, tx_code: Uint8Array): any;
}
/**
*/
export class Tx {
  free(): void;
}
/**
*/
export class WrapperTx {
  free(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_publickey_free: (a: number) => void;
  readonly __wbg_keypair_free: (a: number) => void;
  readonly generate_mnemonic: (a: number, b: number) => void;
  readonly keypair_from_mnemonic: (a: number, b: number, c: number) => number;
  readonly keypair_serialize: (a: number) => number;
  readonly keypair_deserialize: (a: number, b: number) => void;
  readonly keypair_to_bytes: (a: number, b: number) => void;
  readonly __wbg_signature_free: (a: number) => void;
  readonly signature_serialize: (a: number, b: number) => void;
  readonly signature_deserialize: (a: number, b: number, c: number) => void;
  readonly sign: (a: number, b: number, c: number, d: number) => void;
  readonly verify_signature: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly __wbg_tx_free: (a: number) => void;
  readonly __wbg_wrappertx_free: (a: number) => void;
  readonly run: () => void;
  readonly __wbg_transfer_free: (a: number) => void;
  readonly transfer_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number) => void;
  readonly __wbg_address_free: (a: number) => void;
  readonly address_encoded: (a: number, b: number) => void;
  readonly address_from_keypair: (a: number) => number;
  readonly address_decode: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_start: () => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;