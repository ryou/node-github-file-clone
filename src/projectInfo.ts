import { resolve } from 'path'

/**
 * プロジェクトのルートパス（プロジェクトのpackage.jsonが存在するディレクトリ）
 */
export const PROJECT_ROOT_PATH = resolve(__dirname, '../')

/**
 * .envファイルが生成されるパス
 */
export const ENV_PATH = resolve(PROJECT_ROOT_PATH, '.env')
