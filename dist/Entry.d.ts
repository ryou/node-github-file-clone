import { GitHubEntryDao } from './dao/GitHubEntryDao';
export declare abstract class Entry {
    readonly name: string;
    readonly currentDirectory: string;
    constructor(name: string, currentDirectory: string);
    abstract getDisplayName(): string;
    abstract getEntryPath(): string;
}
/**
 * ファイル
 */
export declare class FileEntry extends Entry {
    getDisplayName(): string;
    getEntryPath(): string;
}
/**
 * ディレクトリ
 */
export declare class DirectoryEntry extends Entry {
    getDisplayName(): string;
    getEntryPath(): string;
}
/**
 * １階層上に上がるエントリ
 * （エントリかは微妙だが、ファイル、ディレクトリと並列に扱いたかったのでエントリに含めた）
 */
export declare class PopEntry extends Entry {
    getDisplayName(): string;
    getEntryPath(): string;
}
/**
 * typeに応じたEntryを生成し返却
 *
 * @param name
 * @param currentDirectory
 * @param type
 */
export declare const makeEntry: (name: string, currentDirectory: string, type: string) => Entry;
/**
 * リポジトリのpathのエントリ一覧からEntry配列を生成し返却する
 *
 * @param path
 * @param dao
 */
export declare const makeEntries: (path: string, dao: GitHubEntryDao) => Promise<Entry[]>;
