import { AbstractHttpClient } from '../http/AbstractHttpClient';
export declare class GitHubEntryDao {
    protected _repository: string;
    protected _httpClient: AbstractHttpClient;
    constructor(repository: string, httpClient: AbstractHttpClient);
    fetchEntries(directory: string): Promise<any[]>;
    fetchFile(filePath: string): Promise<any>;
}
