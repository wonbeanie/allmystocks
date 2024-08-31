export default function (f : any){
    if(!f){
        return;
    }

    let r = new FileReader();

    r.onload = function(e : any) {
        let contents = e.target.result;
        let lines = contents.split("\r\n")
        let output = [];
        let result : any[] = [];
    
        lines = lines.reduce((prev : any, cur : any)=>{
            prev.push(cur.split("\t"));
            return prev;
        },[])
    
        for(let i = 0; i < lines.length/2; i += 2){
            let temp = [...lines[i]];
            let abc = lines[i+1].slice(4, lines[i+1].length-1);
    
            temp.push(...abc);
    
            output.push(temp);
        }
    
        let header = output[0];
        output = output.slice(1,output.length);
    
        output.forEach((data)=>{
            let temp : any[] = [];
            data.forEach((obj,i)=>{
                temp.push([header[i], obj]);
            })
    
            result.push(Object.fromEntries(temp));
        })

        console.log("result",result);
    }

    r.readAsText(f);
}