import axios, { AxiosInstance } from 'axios'
import { AbstractHttpClient } from './AbstractHttpClient'

export class HttpClient extends AbstractHttpClient {
    protected _client: AxiosInstance

    constructor() {
        super()
        this._client = axios.create()

        this._client.defaults.headers.common['User-Agent'] =
            'node-github-scaffolder'
    }

    // TODO: headersのanyをやめたい
    async get(path: string, headers: any = {}): Promise<any> {
        const { data } = await this._client.get(path, { headers })

        return data
    }
}
