export interface IHttpClient {
    // TODO: headersのanyをやめたい
    get(path: string, headers: any): Promise<any>
}
