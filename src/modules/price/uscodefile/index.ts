import { usCodeFilesType } from "../priceTypes";

function getDataFile(address : string){
    return new Promise((res, rej)=>{
        try{
            fetch(address)
            .then(response => response.text())
            .then(text => res(text));
        }
        catch(err){
            rej(err);
        }
    });
}

function setStorage(data: object){
    sessionStorage.setItem('usCodeFiles', JSON.stringify(data));
}

function getStroage(){
    return sessionStorage.getItem("usCodeFiles");
}

class usCodeFile {
    data : usCodeFilesType = {};

    constructor(){
        let storage = getStroage();
        if(storage){
            this.data = JSON.parse(storage);
            return;
        }

        Promise.all([
            getDataFile('./data/ams_code.txt'),
            getDataFile('./data/nas_code.txt'),
            getDataFile('./data/nys_code.txt')
        ]).then((res : any)=>{
            this.data = {
                "AMS" : res[0],
                "NAS" : res[1],
                "NYS" : res[2]
            };

            setStorage(this.data);
        })
    }

    getData(){
        return this.data;
    }

};

export default usCodeFile;