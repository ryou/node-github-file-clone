import { GitHubEntryDao } from './dao/GitHubEntryDao'
import prompts from 'prompts'
import { HttpClient } from './http/HttpClient'
import { outputFileSync } from 'fs-extra'
import { Entry, FileEntry, makeEntries } from './Entry'
import { ENV_PATH } from './projectInfo'

const selectEntry = async (
    path: string,
    dao: GitHubEntryDao
): Promise<Entry> => {
    const entries = await makeEntries(path, dao)
    const result = await prompts({
        type: 'select',
        name: 'index',
        message: 'select file',
        choices: entries.map((entry, index) => {
            return {
                title: entry.getDisplayName(),
                value: String(index),
            }
        }),
    })

    return entries[result.index]
}

const selectFile = async (initialDir: string, dao: GitHubEntryDao) => {
    let path = initialDir
    while (true) {
        const entry = await selectEntry(path, dao)

        const entryPath = entry.getEntryPath()
        if (entry instanceof FileEntry) {
            return entryPath
        }

        path = entryPath
    }
}

const askOutputFileName = async (): Promise<string> => {
    const result = await prompts({
        type: 'text',
        name: 'outputFileName',
        message: 'output file name',
    })

    return result.outputFileName
}

export const cloneFileFromGitHub = async (
    repositoryName: string,
    initialDir: string
) => {
    const httpClient = new HttpClient()
    const dao = new GitHubEntryDao(repositoryName, httpClient)
    const filePath = await selectFile(initialDir, dao)
    const outputFileName = await askOutputFileName()
    const fileContent = await dao.fetchFile(filePath)
    outputFileSync(outputFileName, fileContent)
}

export const generateEnvFile = (repositoryName: string, initialDir: string) => {
    let content = ''
    content += `repository=${repositoryName}\n`
    content += `initialDir=${initialDir}\n`
    outputFileSync(ENV_PATH, content)
}
