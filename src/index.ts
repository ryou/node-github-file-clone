#!/usr/bin/env node
import { Command } from 'commander'
import { generateEnvFile, generateFileFromGitHub } from './scaffolder'
require('dotenv').config()

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
