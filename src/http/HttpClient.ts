import axios, { AxiosInstance } from 'axios'
import { IHttpClient } from './IHttpClient'

export class HttpClient implements IHttpClient {
    protected _client: AxiosInstance

    constructor() {
        this._client = axios.create()

        this._client.defaults.headers.common['User-Agent'] =
            'node-github-scaffolder'
    }

    async get(path: string, headers: any = {}): Promise<any> {
        const { data } = await this._client.get(path, { headers })

        return data
    }
}
