import { calculator } from "./stock/stockTypes";

export function calStringToNumber(first : string, second : string, type : calculator = calculator.PLUS){
    let result = 0;
    let f = Number(delComma(first));
    let s = Number(delComma(second));

    switch (type) {
        case calculator.PLUS:
            result = f + s;
            break;
        case calculator.MINUS:
            result = f - s;
            break;
        case calculator.DIVISION:
            result = f / s;
            break;
        case calculator.MULTIPLICATION:
            result = f * s;
            break;
    }

    return formatComma(Math.floor(result));
}

export function calDiffDate(start ?: string, end ?: string){
    let s = formatDate(start);
    let e = formatDate(end);
    let result = "";
    let diffDays = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
    let diffMonths = 0;
    let diffYears = 0;

    if(diffDays > 31){
        diffYears = Math.abs(e.getFullYear() - s.getFullYear());

        if(e.getDate() > s.getDate()){
            diffMonths = Math.abs(
                (e.getFullYear() - s.getFullYear())*12 + 
                (e.getMonth() - s.getMonth()));
        }
        else if(e.getDate() < s.getDate()) {
            diffMonths = Math.abs(
                (e.getFullYear() - s.getFullYear())*12 + 
                (e.getMonth() - s.getMonth())) - 1;
        }
        else {
            diffMonths = Math.abs(
                (e.getFullYear() - s.getFullYear())*12 + 
                (e.getMonth() - s.getMonth())) ;
        }

        if(diffYears > 0){
            if(diffMonths === 0){
                result = `${diffYears}년`;
            }
            else {
                diffMonths -= diffYears * 12;
                result = `${diffYears}년 ${diffMonths}개월`;
            }
        }
        else {
            result = `${diffMonths}개월`;
        }
    }
    else {
        result = `${diffDays}일`;
    }

    return result;
}

export function formatDate(date ?: string){
    return date ? new Date(date.replace(/[()]/gi,"")) : new Date();
}

export function dateToString(date : Date){
    let offset = date.getTimezoneOffset() * 60000;
    let result = new Date(date.getTime() - offset);
    return result.toISOString().replace("T", " ").split(".")[0].replace(/-/gi, ".");
}

function delComma(str : string){
    return str.replace(/,/gi,"");
}

function formatComma(str : number){
    return str.toLocaleString();
}