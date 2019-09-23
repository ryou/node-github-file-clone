"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
/**
 * プロジェクトのルートパス（プロジェクトのpackage.jsonが存在するディレクトリ）
 */
exports.PROJECT_ROOT_PATH = path_1.resolve(__dirname, '../');
/**
 * .envファイルが生成されるパス
 */
exports.ENV_PATH = path_1.resolve(exports.PROJECT_ROOT_PATH, '.env');
