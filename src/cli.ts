#!/usr/bin/env node
import { Command } from 'commander'
import { ENV_PATH } from './projectInfo'
import { GitHubEntryDao } from './dao/GitHubEntryDao'
import { Entry, FileEntry, makeEntries } from './Entry'
import prompts from 'prompts'
import { HttpClient } from './http/HttpClient'
import { outputFileSync } from 'fs-extra'
require('dotenv').config({ path: ENV_PATH })

/**
 * ユーザーにリポジトリのpathのエントリ一覧から一つエントリを選択させる
 *
 * @param path
 * @param dao
 */
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

/**
 * ユーザーにGitHubのリポジトリから生成するファイルを一つ選択させる
 *
 * @param initialDir
 * @param dao
 */
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

/**
 * ユーザーに出力するファイル名を尋ねる
 */
const askOutputFileName = async (): Promise<string> => {
    const result = await prompts({
        type: 'text',
        name: 'outputFileName',
        message: 'output file name',
    })

    return result.outputFileName
}

/**
 * リポジトリ（repositoryName）からユーザーにファイルを選択させ、そのファイルを
 * ローカル端末の任意の場所に生成する
 *
 * @param repositoryName
 * @param initialDir
 */
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

const main = () => {
    const program = new Command()

    program.description('clone file from github').action(async () => {
        if (process.env.repository === undefined) {
            throw new Error('env variable repository is required')
        }
        if (process.env.initialDir === undefined) {
            throw new Error('env variable initialDir is required')
        }
        const repository = process.env.repository
        const initialDir = process.env.initialDir

        await cloneFileFromGitHub(repository, initialDir)
    })

    program.parse(process.argv)
}

main()
