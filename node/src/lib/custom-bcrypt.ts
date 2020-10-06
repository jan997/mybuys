const md5 = require("md5");

interface bcrypt_options{
    salt?: boolean,
    rounds?: number
}

/**
   *
   *
   * @param { string } rawPass - the password to be hashed
   * @param { object } [options={}] - object containing salt and rounds
   * @returns {string} 
*/
export function bcrypt_hash(rawPassword, options:bcrypt_options = {}) {
    /**
     * salt is optional, if not provided it will be set to current timestamp
     */
    const salt = options.salt ? options.salt : new Date().getTime();

    /**
     * rounds is optional, if not provided it will be set to 10
     */
    const rounds = options.rounds ? options.rounds : 10;

    let hashed = md5(rawPassword + salt);
    for (let i = 0; i <= rounds; i++) {
      hashed = md5(hashed);
    }
    return `${salt}$${rounds}$${hashed}`;
  }


/**
 *
 *
 * @param {string} rawPassword - the raw password
 * @param { string } hashedPassword - the hashed password
 * @returns
 */
export function bcrypt_compare(rawPassword, hashedPassword) {
    try {
      const [ salt, rounds ] = hashedPassword.split('$');
      const hashedRawPassword = bcrypt_hash(rawPassword, { salt, rounds });
      return hashedPassword === hashedRawPassword;
    } catch (error) {
      throw Error(error.message);
    }
  }