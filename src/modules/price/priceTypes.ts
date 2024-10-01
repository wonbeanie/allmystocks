export interface priceResData {
    "stck_prpr" : string
}

export interface priceList {
    [key : string] : priceResData
}

export interface usCodeFilesType {
    [key : string] : string
}

export interface usCodeListType {
    [key : string] : usCodeType
}

export interface usCodeType {
    [key : string] : string
}