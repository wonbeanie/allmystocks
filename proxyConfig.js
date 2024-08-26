module.exports = [
    {
        context: ['/token'],
        target: "https://openapivts.koreainvestment.com:29443",
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {"^/token" : "/oauth2/tokenP"}
    },
]