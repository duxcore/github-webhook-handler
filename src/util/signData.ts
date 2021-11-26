import crypto from 'crypto'

export const sign = (data, secret) => {
  return `sha1=${crypto.createHmac('sha1', secret).update(data).digest('hex')}`
}