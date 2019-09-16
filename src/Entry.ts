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
        console.log(pathArray)
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
