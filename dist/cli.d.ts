#!/usr/bin/env node
/**
 * リポジトリ（repositoryName）からユーザーにファイルを選択させ、そのファイルを
 * ローカル端末の任意の場所に生成する
 *
 * @param repositoryName
 * @param initialDir
 */
export declare const cloneFileFromGitHub: (repositoryName: string, initialDir: string) => Promise<void>;
