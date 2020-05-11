import axios from 'axios'

const httpClient = axios.create({
    baseURL: 'https://myfinancesapi.herokuapp.com'
})

class ApiService{

    constructor(apiUrl){
        this.apiUrl = apiUrl;
    }

    post(url, objeto){
        return httpClient.post(this.getUrl(this.upiUrl, url), objeto);
    }

    put(url, objeto){
        return httpClient.put(this.getUrl(this.upiUrl, url), objeto);
    }

    delete(url, objeto){
        return httpClient.delete(this.getUrl(this.upiUrl, url))
    }

    get(url){
        return httpClient.get(this.getUrl(this.upiUrl, url))
    }

    getUrl(upiUrl, url){
        return `${this.apiUrl}${url}`
    }

}

export default ApiService;