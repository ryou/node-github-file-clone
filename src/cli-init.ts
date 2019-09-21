#!/usr/bin/env node
import { Command } from 'commander'
import { generateEnvFile } from './githubFileClone'

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
