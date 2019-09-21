#!/usr/bin/env node
import { Command } from 'commander'
import { cloneFileFromGitHub } from './githubFileClone'
import { ENV_PATH } from './projectInfo'
require('dotenv').config({ path: ENV_PATH })

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
