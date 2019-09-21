import { IHttpClient } from '../http/IHttpClient'

const baseUrl = 'https://api.github.com/repos'

export class GitHubEntryDao {
    protected _repository: string
    protected _httpClient: IHttpClient

    constructor(repository: string, httpClient: IHttpClient) {
        this._repository = repository
        this._httpClient = httpClient
    }

    /**
     * リポジトリの引数に渡されたディレクトリ内のエントリ一覧を返却する
     *
     * @param directory
     */
    async fetchEntries(directory: string): Promise<any[]> {
        const url = `${baseUrl}/${this._repository}/contents/${directory}`
        // TODO: headers省略できんか？
        const data = this._httpClient.get(url, {})

        return data
    }

    /**
     * リポジトリのfilePathのファイルの内容を返却する
     *
     * @param filePath
     */
    async fetchFile(filePath: string): Promise<string> {
        const url = `${baseUrl}/${this._repository}/contents/${filePath}?ref=master`
        const data = this._httpClient.get(url, {
            Accept: 'application/vnd.github.v3.raw+json',
        })

        return data
    }
}
