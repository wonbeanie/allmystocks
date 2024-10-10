//api 사용을 위한 key 모음
class AppKeys {
    private appKey : string = "";
    private appSecret : string = "";

    private APP_KEYS_STROAGE_KEY = "appKeys";

    constructor(){
        this.init();
    }

    init(){
        let data = localStorage.getItem(this.APP_KEYS_STROAGE_KEY) || "{}";

        let appKeys = JSON.parse(data);

        this.appKey = appKeys.appKey || "";
        this.appSecret = appKeys.appSecret || "";
    }

    getKeys(){
        return {
            appKey : this.appKey,
            appSecret : this.appSecret
        }
    }

    setKeys(data : appKeysType){
        this.appKey = data.appKey;
        this.appSecret = data.appSecret;
        localStorage.setItem(this.APP_KEYS_STROAGE_KEY , JSON.stringify(data));
    }
}

export interface appKeysType {
    appKey : string,
    appSecret : string
}

export default new AppKeys();