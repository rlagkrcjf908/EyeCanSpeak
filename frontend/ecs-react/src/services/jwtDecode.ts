import jwt_decode from "jwt-decode"

export const parseJwt = (token: any) => {
  var decoded = jwt_decode(token)

  console.log(decoded)
  var decodedHeader = jwt_decode(token, { header: true })
  console.log(decodedHeader)
}
