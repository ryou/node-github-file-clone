export interface IHttpClient {
    get(path: string, headers: any): Promise<any>;
}
