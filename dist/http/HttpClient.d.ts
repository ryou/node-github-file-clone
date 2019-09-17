import { AxiosInstance } from 'axios';
import { IHttpClient } from './IHttpClient';
export declare class HttpClient implements IHttpClient {
    protected _client: AxiosInstance;
    constructor();
    get(path: string, headers?: any): Promise<any>;
}
