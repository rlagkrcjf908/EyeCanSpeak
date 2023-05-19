import jwt_decode from "jwt-decode"

export const parseJwt: any = (token: any) => {
  var decoded = jwt_decode(token)
  return decoded
}
