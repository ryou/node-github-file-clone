import { AxiosInstance } from 'axios';
import { AbstractHttpClient } from './AbstractHttpClient';
export declare class HttpClient extends AbstractHttpClient {
    protected _client: AxiosInstance;
    constructor();
    get(path: string, headers?: any): Promise<any>;
}
