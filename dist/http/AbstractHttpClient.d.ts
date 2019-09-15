export declare abstract class AbstractHttpClient {
    abstract get(path: string, headers: any): Promise<any>;
}
