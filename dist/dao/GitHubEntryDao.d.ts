import { IHttpClient } from '../http/IHttpClient';
export declare class GitHubEntryDao {
    protected _repository: string;
    protected _httpClient: IHttpClient;
    constructor(repository: string, httpClient: IHttpClient);
    fetchEntries(directory: string): Promise<any[]>;
    fetchFile(filePath: string): Promise<any>;
}
