import { IHttpClient } from '../http/IHttpClient';
export declare class GitHubEntryDao {
    protected _repository: string;
    protected _httpClient: IHttpClient;
    constructor(repository: string, httpClient: IHttpClient);
    /**
     * リポジトリの引数に渡されたディレクトリ内のエントリ一覧を返却する
     *
     * @param directory
     */
    fetchEntries(directory: string): Promise<any[]>;
    /**
     * リポジトリのfilePathのファイルの内容を返却する
     *
     * @param filePath
     */
    fetchFile(filePath: string): Promise<string>;
}
