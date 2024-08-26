import axios from 'axios';
import { appKeysType } from './apitype';

class ApiService {
    getStockApiAccessToken({appKey, appSecret} : appKeysType) {
        return axios.post(`/token`,{
            "grant_type" : "client_credentials",
            "appkey" : appKey,
            "appsecret" : appSecret
        });
    }
}

export default new ApiService;