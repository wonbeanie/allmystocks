import { sortType } from "./modulesType";
import { calculator, history } from "./stock/stockTypes";

export function calStringToNumber(
    first : string | number, second : string | number,
    type : calculator = calculator.PLUS, comma : boolean = true
){
    let result = 0;
    let f = typeof first === "string" ? Number(delComma(first)) : first;
    let s = typeof second === "string" ? Number(delComma(second)) : second;

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

    return comma ? formatComma(result) : result.toString();
}

export function cutPoint(num : string | number, digits : number = 0){
    let n = typeof num === "string" ? Number(delComma(num)) : num;
    return formatComma(Math.floor(n * (10**digits)) / (10**digits));
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
            diffMonths -= diffYears * 12;
            if(diffMonths === 0){
                result = `${diffYears}년`;
            }
            else {
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

export function delComma(str : string){
    return str.replace(/,/gi,"");
}

export function formatComma(str : number){
    return str.toLocaleString();
}

export function historySort(type : sortType = sortType.asc){
    let fDataNum = 1;
    let nDataNum = -1;
    if(type === sortType.asc){
        fDataNum = -1;
        nDataNum = 1;
    }

    return (f : history, s : history) : number => {
        let fTime = formatDate(f.conclusionDate).getTime();
        let sTime = formatDate(s.conclusionDate).getTime();
        if(fTime < sTime) return fDataNum;
        if(fTime > sTime) return nDataNum;
        
        return 0;
    }
}