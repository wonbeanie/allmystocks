import { tradeHistoryData } from "./stock/stockTypes";

function importFiles(f : any) : Promise<tradeHistoryData[]>{
    //데이터 파일은 비동기로 이루어지기 때문에 Promise을 이용해서 변환 완료 확인
    return new Promise((res, rej)=>{
        let r = new FileReader();

        let fileDataList: any[] = [];
        
        //로드가 완료된 파일 개수
        let n = 0;

        //파일 로드가 됐을때
        r.onload = function(e : any) {
            let contents = e.target.result;
            let lines = contents.split("\r\n")
            let output = [];
            let result : any[] = [];
        
            //tsv -> 탭으로 분리
            lines = lines.reduce((prev : any, cur : any)=>{
                prev.push(cur.split("\t"));
                return prev;
            },[])
        
            //원본 파일이 2줄을 특정 유형은 병합하여 한줄처럼 사용하였기 때문에
            //tsv에서 변환시 i, i+1으로 분리되어 보이는 문제가 있다.
            //실질적으로 한줄이기 때문에 문제를 수정하는 기능
            for(let i = 0; i < lines.length/2; i += 2){
                let temp = [...lines[i]];

                //i+1 데이터에서 문제가 되는 데이터 제거
                let afterData = lines[i+1].slice(4, lines[i+1].length-1);

                //i, i+1 병합
                temp.push(...afterData);
        
                output.push(temp);
            }
        
            //첫번째 줄은 속성값이기 때문에 따로 저장
            let header = output[0];
            //속성값 제거
            output = output.slice(1,output.length);
        
            output.forEach((data)=>{
                let temp : any[] = [];
                data.forEach((obj,i)=>{
                    //fromEntries을 이용해 json으로 변환할것이기 때문에
                    //[key, value]로 저장
                    temp.push([header[i], obj]);
                })
        
                //json형식으로 데이터 저장
                result.push(Object.fromEntries(temp));
            })
    
            //파일이 여러개 일수 있기 때문에 배열에 저장
            fileDataList.push(result)
        }

        //onload가 완료 됐을때
        r.onloadend = function(e : any) {
            //마지막 파일을 완료 했을때
            if(n == f.length - 1){
                let result: tradeHistoryData[] = [];

                //데이터 추출 기능에서는 하나의 데이터 배열을 통해 데이터를 계산하기 때문에
                //현재까지의 데이터들을 하나의 배열로 변환
                fileDataList.forEach((list : any[])=>{
                    list.forEach((data)=>{
                        result.push(data);
                    })
                })

                res(result);
                return;
            }


            //로드된 파일 개수 증가
            n += 1;

            //다음 파일 읽기
            r.readAsText(f[n]);
        }

        r.readAsText(f[n]);
    })
}


export default function (f : any){
    if(!f){
        return;
    }

    return importFiles(f);
}