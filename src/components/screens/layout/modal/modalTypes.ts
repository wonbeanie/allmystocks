export const FILES_KEY = "files";

export interface dataSetStateType extends dataConfigType {
    [FILES_KEY] : File[];
}

type dataConfigType = {
    [key in dataConfigEnum]: string;
}

export const enum dataConfigEnum {
    APPKEY = "appKey",
    APPSECRET = "appSecret",
    DEPOSITS_RATE = "depositsRate",
    INSTALLMENT_SAVEING_RATE = "installmentSavingRate",
    EXCHANGE_US_RATE = "exchangeUSRate"
}

export interface fileListType {
    [key : string] : number
}