/**
 * Password
 *
 * Password Authentication
 */

import crypto from "crypto";

const SALT_SIZE = 32;

/**
 * Generate a random salt for hash password.
 *
 * @param {number} saltSize - The size of the salt in bytes.
 * @returns {string} The generated salt.
 */
function generateSalt({
  saltSize = SALT_SIZE,
}: {
  saltSize?: number;
} = {}): string {
  return crypto.randomBytes(saltSize).toString("hex").normalize();
}

/**
 * Hash a password with a salt using the `crypto` module `scrypt` Key
 * Derivation Function (KDF) algorithm.
 *
 * @param {string} password The password to hash in plain text.
 * @param {string} salt The salt to use for hashing.
 * @returns {Promise<string>} A promise resolve to the hash password.
 */
function hashPassword(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(
      password.normalize(),
      salt,
      64,
      (error, derivedKey) => {
        if (error) reject(error);
        resolve(derivedKey.toString("hex").normalize());
      }
    );
  });
}

export {
  generateSalt,
  hashPassword
};
