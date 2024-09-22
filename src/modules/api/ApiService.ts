import axios from 'axios';
import { appKeysType } from './apitype';
import { getUsStockInfo } from '../price/price';

class ApiService {
    private accessToken = "";
    private appKey = "";
    private appSecret = "";

    constructor(){
        let appKeys = localStorage.getItem("appKeys");
        if(appKeys){
            let {appKey, appSecret, accessToken} = JSON.parse(appKeys);
            this.accessToken = accessToken;
            this.appKey = appKey;
            this.appSecret = appSecret;
        }

        console.log(this);
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
        console.log(this);
        return axios.post(`/token`,{
            "grant_type" : "client_credentials",
            "appkey" : this.appKey,
            "appsecret" : this.appSecret
        });
    }

    async getStockPrice(stockId : string) {
        if(!this.accessToken){
            try {
                let res = await this.getStockApiAccessToken();
                if(res.data.access_token){
                    let {access_token, token_type} = res.data;
                    let accessToken = `${token_type} ${access_token}`
                    this.setAccessToken(accessToken);
                }
            } catch (err) {
                console.log(err);
            }
        }

        return this.getStock(stockId);
    }

    getStock(stockId : string){
        return axios.get(`/stock?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=${stockId}`,{
            headers: {
                Authorization : this.accessToken,
                appkey : this.appKey,
                tr_id : "FHKST01010100",
                appsecret : this.appSecret
            }
        });
    }

    getUsStock(stockName : string){
        let {SYMB, EXCD} = getUsStockInfo(stockName);
        return axios.get(`/us-stock?EXCD=${EXCD}&SYMB=${SYMB}`,{
            headers: {
                Authorization : this.accessToken,
                appkey : this.appKey,
                tr_id : "HHDFS00000300",
                appsecret : this.appSecret
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