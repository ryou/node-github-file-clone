export abstract class AbstractHttpClient {
    // TODO: headersのanyをやめたい
    abstract get(path: string, headers: any): Promise<any>
}
