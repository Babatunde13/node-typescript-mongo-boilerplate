import validator from 'validator'

export const isEmail = (email: string) => {
  return validator.isEmail(email)
}

export const isUUID = (uuid: string) => {
  return validator.isUUID(uuid)
}

export const isObjectId = (objectId: string) => {
    return validator.isMongoId(objectId)
}

export const isAlphanumeric = (str: string) => {
    return validator.isAlphanumeric(str)
}

export const isJwt = (jwt: string) => {
    return validator.isJWT(jwt)
}

export const isUrl = (url: string) => {
    return validator.isURL(url)
}

export const isAlpha = (str: string) => {
    return validator.isAlpha(str)
}

export const isNumeric = (str: string) => {
    return validator.isNumeric(str)
}

export const isBoolean = (str: string) => {
    return validator.isBoolean(str)
}

export const isFloat = (str: string) => {
    return validator.isFloat(str)
}

export const isInt = (str: string) => {
    return validator.isInt(str)
}

export const isCreditCard = (str: string) => {
    return validator.isCreditCard(str)
}
