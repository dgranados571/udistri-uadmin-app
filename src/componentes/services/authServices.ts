import axios from 'axios'
import { UtilUrl } from './utilUrl';

export class AuthServices {

    requestPost(body: any, indexUrl: number): Promise<any> {
        const { url, apiLambda } = UtilUrl();
        console.log('URL component --> ', url[indexUrl].pathLambda)
        console.log('Body request --> ', body)
        let urlRq: string;
        const f = new FormData();
        if (apiLambda) {
            f.append('urlPath', `${url[indexUrl].urlDominioServidor}${url[indexUrl].pathLambda}`)
            f.append('body', JSON.stringify(body))
            urlRq = `${url[indexUrl].urlEntornoLambda}`;
        } else {
            urlRq = `${url[indexUrl].urlEntornoLocal}${url[indexUrl].pathLambda}`;
        }
        const headers = {
            'Content-Type': 'application/json'
        }
        const rqBody = apiLambda ? f : body;
        return new Promise((resolve, reject) => {
            axios.post(urlRq, rqBody, {
                headers
            }).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    requestPostFile(fileBase64: string, fileName: string): Promise<any> {
        const { url } = UtilUrl();
        const f = new FormData();
        f.append('file', fileBase64)
        f.append('fileName', fileName)
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        const urlService = url[1].urlEntornoLambda;
        console.log('Data request --> ', urlService, f)
        return new Promise((resolve, reject) => {
            axios.post(urlService, f, {
                headers
            }).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }

}