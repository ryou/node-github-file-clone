import { GitHubEntryDao } from './dao/GitHubEntryDao'

export abstract class Entry {
    readonly name: string
    readonly currentDirectory: string

    constructor(name: string, currentDirectory: string) {
        this.name = name
        this.currentDirectory = currentDirectory
    }

    abstract getDisplayName(): string
    abstract getEntryPath(): string
}

export class FileEntry extends Entry {
    getDisplayName(): string {
        return this.name
    }

    getEntryPath(): string {
        return `${this.currentDirectory}/${this.name}`
    }
}

export class DirectoryEntry extends Entry {
    getDisplayName(): string {
        return `${this.name}/`
    }

    getEntryPath(): string {
        return `${this.currentDirectory}/${this.name}`
    }
}

export class PopEntry extends Entry {
    getDisplayName(): string {
        return this.name
    }

    getEntryPath(): string {
        const pathArray = this.currentDirectory.split('/')
        pathArray.pop()

        return pathArray.join('/')
    }
}

export const generateEntry = (
    name: string,
    currentDirectory: string,
    type: string
): Entry => {
    if (type === 'file') {
        return new FileEntry(name, currentDirectory)
    }
    if (type === 'dir') {
        return new DirectoryEntry(name, currentDirectory)
    }
    if (type === 'pop') {
        return new PopEntry(name, currentDirectory)
    }

    throw new Error(`unknown type ${type}.`)
}

export const makeEntries = async (
    path: string,
    dao: GitHubEntryDao
): Promise<Entry[]> => {
    const entryObjects = await dao.fetchEntries(path)

    // 親の階層がある際には、親の階層へ行く選択肢を追加
    if (path.includes('/')) {
        entryObjects.unshift({
            name: '..',
            type: 'pop',
        })
    }

    return entryObjects.map(
        (entry: any): Entry => {
            return generateEntry(entry.name, path, entry.type)
        }
    )
}
