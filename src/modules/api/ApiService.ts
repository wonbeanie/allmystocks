import axios, { Axios } from 'axios';
import { appKeysType } from './apitype';
import { getUsStockInfo } from '../price/price';

class ApiService {
    private accessToken = "";
    private appKey = "";
    private appSecret = "";

    private apiService = axios.create();

    constructor(){
        let appKeys = localStorage.getItem("appKeys");
        if(appKeys){
            let {appKey, appSecret, accessToken} = JSON.parse(appKeys);
            this.accessToken = accessToken;
            this.appKey = appKey;
            this.appSecret = appSecret;
        }

        this.apiInterceptorsSetting();

        console.log(this);
    }

    //api 공통 로직 설정
    apiInterceptorsSetting(){
        this.apiService.interceptors.request.use(
            (config)=>{
                config = this.requestConfingSetting(config);

                return config;
            },
            (error)=>{
                return Promise.reject(error);
            }
        )

        this.apiService.interceptors.response.use(
            (config)=>{
                return config;
            },
            (error)=>{
                let res = this.tokenCheck(error);
                
                if(res){
                    return res;
                }

                return Promise.reject(error);
            }
        )
    }

    requestConfingSetting(config : any){
        //토큰 발급시 param 설정
        if(config.url === "/token"){
            config.data = {
                ...config.data,
                "appkey" : this.appKey,
                "appsecret" : this.appSecret,
            }
        }
        //headers appkey, appsecret 설정
        else {
            config.headers.set("appkey",this.appKey);
            config.headers.set("appsecret",this.appSecret);
        }

        return config;
    }

    async tokenCheck({status, response : {data}, ...error} : any){
        switch(status){
            case 500:
                //만료된 토큰 : EGW00123
                //올바르지 않은 토큰 : EGW00205
                //유효하지 않는 토큰 : EGW00121
                if(
                    data.msg_cd === "EGW00123" || data.msg_cd === "EGW00205" ||
                    data.msg_cd === "EGW00121"
                ){
                    let token = await this.checkAccessToken();

                    error.config.headers.set("Authorization",token);
                    return this.apiService(error.config);
                }

                
                break;
                
            default:
                break;
        }

        return false;
    }

    setKeys({appKey, appSecret} : appKeysType) {
        this.setStorage({
            appKey,
            appSecret
        });
        this.appKey = appKey;
        this.appSecret = appSecret;
    }

    setAccessToken(accessToken : string){
        this.setStorage({
            accessToken
        });
        this.accessToken = accessToken;
    }

    getStockApiAccessToken() {
        return this.apiService.post(`/token`,{
            "grant_type" : "client_credentials",
        });
    }

    async checkAccessToken(){
        try {
            let res = await this.getStockApiAccessToken();
            if(res.data.access_token){
                let {access_token, token_type} = res.data;
                let accessToken = `${token_type} ${access_token}`
                this.setAccessToken(accessToken);
                return accessToken;
            }
        } catch (err) {
            console.log(err);
        }
    }

    getStockPrice(stockId : string) {
        return this.getStock(stockId);
    }

    getStock(stockId : string){
        return this.apiService.get(`/stock?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=${stockId}`,{
            headers: {
                Authorization : this.accessToken,
                tr_id : "FHKST01010100",
            }
        });
    }

    getUsStock(stockName : string){
        let {SYMB, EXCD} = getUsStockInfo(stockName);
        return this.apiService.get(`/us-stock?AUTH&EXCD=${EXCD}&SYMB=${SYMB}`,{
            headers: {
                Authorization : this.accessToken,
                tr_id : "HHDFS00000300",
            }
        });
    }

    setStorage(data : any){
        let temp = localStorage.getItem("appKeys") || "{}";
        localStorage.setItem("appKeys", JSON.stringify({
            ...JSON.parse(temp),
            ...data
        }))
    }
}

export default new ApiService;