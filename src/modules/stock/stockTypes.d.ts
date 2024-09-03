export interface tradeHistoryData {
    "거래일자": string;
    "거래유형": string;
    "상세내용": string;
    "종목명": string;
    "수량": string;
    "거래금액": string;
    "잔고": string;
    "이율": string;
    "수수료": string;
    "연체료": string;
    "받는통장표시내용": string;
    "투자위험도": string;
    "실거래일": string;
    "단가": string;
    "정산금액": string;
    "잔고금액": string;
    "이자": string;
    "세금": string;
    "변제금": string;
    "거래내역메모": string;
    "비고": string;
}

export const enum filterTradeType {
    "입금" = "입금",
    "매수" = "매수",
    "매도" = "매도"
}

export const enum filterDetailContext {
    "외화증권매수" = "외화증권매수",
    "외화증권매도" = "외화증권매도",
    "코스피매수" = "코스피매수",
    "코스피매도" = "코스피매도",
    "ETF분배금입금" = "ETF분배금입금",
    "배당금" = "배당금",
    "KOSDAQ매수" = "KOSDAQ매수",
    "KOSDAQ매도" = "KOSDAQ매도"
}

export interface stocksData {
    stockName : string;
    stockHistory : stockHistory;
    financial : financial;
    stockState : stockState;
}

export interface stockHistory {
    totalPricePercent : string;
    totalReturn : string;
    currentPrice : string;
    history : history[];
}

export interface history {
    conclusionAmount : string;
    historyProfit : string;
    conclusionDate : string;
    unitPrice : string;
    tradeType : string;
    detailContext : string;
    quantity : string;
}

export interface financial {
    totalPrice : string;
    buyFirstTime : string;
    installmentSavingRate : string;
    depositsRate : string;
    totalReturn : string;
    totalDividend : string;
}

export interface stockState {
    totalPrice : string;
    profit : string;
    flatPrice : string;
    retentionTime : string;
    amount : string;
    buyFirstTime : string;
    currentPrice : string;
}

export interface basicInfo {
    totalInputAmount : string;
    totalReturnRate : string;
    currentReturn : string;
    installmentSavingRate : string;
    depositsRate : string;
}

export const enum calculator {
    PLUS = "+",
    MINUS = "-",
    DIVISION = "/",
    MULTIPLICATION = "*"
}

export interface stocksDataList {
    [key : string] : stocksData 
}