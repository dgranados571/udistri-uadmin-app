import axios from 'axios'
import { UtilUrl } from './utilUrl';

export class AuthServices {

    requestPost(body: any, indexUrl: number): Promise<any> {
        const { url, apiLambda } = UtilUrl();
        console.log('URL component --> ', url[indexUrl].pathLambda)
        console.log('Body request --> ', body)
        let urlRq: string;
        let headers: any;
        const f = new FormData();
        if (apiLambda) {
            headers = {
                'Content-Type': 'multipart/form-data'
            }            
            f.append('urlPath', `${url[indexUrl].urlDominioServidor}${url[indexUrl].pathLambda}`)
            f.append('body', JSON.stringify(body))
            urlRq = `${url[indexUrl].urlEntornoLambda}`;
        } else {
            headers = {
                'Content-Type': 'application/json'
            }
            urlRq = `${url[indexUrl].urlEntornoLocal}${url[indexUrl].pathLambda}`;
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