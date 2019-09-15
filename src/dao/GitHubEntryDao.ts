import { AbstractHttpClient } from '../http/AbstractHttpClient'

export class GitHubEntryDao {
    protected _repository: string
    protected _httpClient: AbstractHttpClient

    constructor(repository: string, httpClient: AbstractHttpClient) {
        this._repository = repository
        this._httpClient = httpClient
    }

    async fetchEntries(directory: string) {
        const url = `https://api.github.com/repos/${this._repository}/contents/${directory}`
        // TODO: headers省略できんか？
        const data = this._httpClient.get(url, {})

        return data
    }

    async fetchFile(filePath: string) {
        const url = `https://api.github.com/repos/${this._repository}/contents/${filePath}?ref=master`
        const data = this._httpClient.get(url, {
            Accept: 'application/vnd.github.v3.raw+json',
        })

        return data
    }
}
