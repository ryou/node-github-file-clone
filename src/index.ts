#!/usr/bin/env node
import prompts from 'prompts'
import { GitHubEntryDao } from './dao/GitHubEntryDao'
import { HttpClient } from './http/HttpClient'
import { outputFileSync } from 'fs-extra'
import { Command } from 'commander'
import { resolve } from 'path'
require('dotenv').config()

const selectEntry = async (path: string, dao: GitHubEntryDao) => {
    let choices = []
    choices = (await dao.fetchEntries(path)).map((entry: any) => {
        return {
            title: entry.name + (entry.type === 'dir' ? '/' : ''),
            value: {
                path: entry.path,
                type: entry.type,
            },
        }
    })
    if (path.length > 0) {
        choices = [
            ...[
                {
                    title: '..',
                    value: {
                        type: 'pop',
                    },
                },
            ],
            ...choices,
        ]
    }

    const result = await prompts({
        type: 'select',
        name: 'data',
        message: 'select file',
        choices,
    })

    return result.data
}

const selectFile = async (baseDirectory: string, dao: GitHubEntryDao) => {
    let path = baseDirectory
    while (true) {
        const entry = await selectEntry(path, dao)

        if (entry.type === 'dir') {
            path = entry.path
        } else if (entry.type === 'file') {
            return entry.path
        } else if (entry.type === 'pop') {
            const pathArray = path.split('/')
            pathArray.pop()
            path = pathArray.join('/')
        } else {
            throw new Error(`unknow entry type ${entry.type}`)
        }
    }
}

const generateFileFromGitHub = async (outputFileName: string) => {
    if (process.env.repository === undefined) {
        throw new Error('env variable repository is required')
    }
    if (process.env.baseDir === undefined) {
        throw new Error('env variable baseDir is required')
    }
    const repositoryName = process.env.repository
    const baseDir = process.env.baseDir
    const httpClient = new HttpClient()
    const dao = new GitHubEntryDao(repositoryName, httpClient)
    const filePath = await selectFile(baseDir, dao)
    const fileContent = await dao.fetchFile(filePath)
    outputFileSync(outputFileName, fileContent)
}

const generateEnvFile = (repositoryName: string, baseDir: string) => {
    let content = ''
    content += `repository=${repositoryName}\n`
    content += `baseDir=${baseDir}\n`
    outputFileSync(resolve(__dirname, '../.env'), content)
}

const main = () => {
    const program = new Command()

    program
        .command('init <repositoryName>')
        .description('set repository')
        // TODO: 説明書く
        .option('-b, --baseDir <baseDir>', '')
        .action(async (repositoryName, { baseDir = '' }) => {
            generateEnvFile(repositoryName, baseDir)
        })

    program
        .command('generate <ouputFileName>')
        .description('copy file from github')
        .action(async outputFileName => {
            await generateFileFromGitHub(outputFileName)
        })

    program.parse(process.argv)
}

main()
