
import jwt from 'jsonwebtoken';
import uuidv4 from 'uuid/v4';

export function genJwtToken(uid: string, salt:string): string {
  const token = jwt.sign({
    uid,
    ssid: uuidv4(),
  }, salt, {
    expiresIn: 7 * 24 * 3600,
  })
  return token;
}