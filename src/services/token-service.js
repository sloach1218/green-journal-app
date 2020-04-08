import config from '../config'

const TokenService ={
    saveAuthToken(token){
        window.localStorage.setItem(config.TOKEN_KEY, token)
    },
    clearAuthToken(){
        window.localStorage.removeItem(config.TOKEN_KEY)
    },
    makeBasicAuthToken(userName, password){
        return window.btoa(`${userName}:${password}`)
    },
}
export default TokenService