#!/usr/bin/env node
import { Command } from 'commander'
import { outputFileSync } from 'fs-extra'
import { ENV_PATH } from './projectInfo'

/**
 * envファイルを生成する
 *
 * @param repositoryName
 * @param initialDir
 */
const generateEnvFile = (repositoryName: string, initialDir: string) => {
    let content = ''
    content += `repository=${repositoryName}\n`
    content += `initialDir=${initialDir}\n`
    outputFileSync(ENV_PATH, content)
}

const main = () => {
    const program = new Command()

    program
        .arguments('<repositoryName>')
        .description('generate env file which contains repository information.')
        .option('--initialDir <baseDir>', '')
        .action((repositoryName, { initialDir = '' }) => {
            generateEnvFile(repositoryName, initialDir)
        })

    program.parse(process.argv)
}

main()
