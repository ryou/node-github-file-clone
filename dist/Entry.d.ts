export declare abstract class Entry {
    readonly name: string;
    readonly currentDirectory: string;
    constructor(name: string, currentDirectory: string);
    abstract getDisplayName(): string;
    abstract getEntryPath(): string;
}
export declare class FileEntry extends Entry {
    getDisplayName(): string;
    getEntryPath(): string;
}
export declare class DirectoryEntry extends Entry {
    getDisplayName(): string;
    getEntryPath(): string;
}
export declare class PopEntry extends Entry {
    getDisplayName(): string;
    getEntryPath(): string;
}
export declare const generateEntry: (name: string, currentDirectory: string, type: string) => Entry;
