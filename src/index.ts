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
        .option('--initialDir <baseDir>', '')
        .action(async (repositoryName, { initialDir = '' }) => {
            generateEnvFile(repositoryName, initialDir)
        })

    program
        .command('generate <ouputFileName>')
        .description('copy file from github')
        .action(async outputFileName => {
            if (process.env.repository === undefined) {
                throw new Error('env variable repository is required')
            }
            if (process.env.initialDir === undefined) {
                throw new Error('env variable initialDir is required')
            }
            const repository = process.env.repository
            const initialDir = process.env.initialDir

            await generateFileFromGitHub(repository, initialDir, outputFileName)
        })

    program.parse(process.argv)
}

main()
