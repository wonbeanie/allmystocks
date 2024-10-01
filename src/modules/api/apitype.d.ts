export interface appKeysType {
    appKey : string;
    appSecret : string;
}

export interface accessTokenRes {
    access_token : string,
    access_token_token_expired : string,
    token_type : string,
    expires_in : number
}