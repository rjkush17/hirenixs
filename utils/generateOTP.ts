import crypto from 'crypto';

export default function genrateOTP() {

    const cryptoOTP = crypto.randomInt(100000, 999999).toString();

    eturn cryptoOTP;
}
