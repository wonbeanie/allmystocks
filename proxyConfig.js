module.exports = [
    {
        context: ['/token', '/stock', '/us-stock'],
        target: "https://openapivts.koreainvestment.com:29443",
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/token" : "/oauth2/tokenP",
            "^/stock" : "/uapi/domestic-stock/v1/quotations/inquire-price",
            "^/us-stock" : "/uapi/overseas-price/v1/quotations/price"
        }
    },
]