import { sign } from "./signData"
import crypto from "crypto"

export const verify = (signature, data, options) => {
  const sig = Buffer.from(signature)
  const signed = Buffer.from(sign(data, options.secret))
  if (sig.length !== signed.length) {
    return false
  }
  return crypto.timingSafeEqual(sig, signed)
}