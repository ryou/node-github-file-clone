#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var projectInfo_1 = require("./projectInfo");
var GitHubEntryDao_1 = require("./dao/GitHubEntryDao");
var Entry_1 = require("./Entry");
var prompts_1 = __importDefault(require("prompts"));
var HttpClient_1 = require("./http/HttpClient");
var fs_extra_1 = require("fs-extra");
require('dotenv').config({ path: projectInfo_1.ENV_PATH });
/**
 * ユーザーにリポジトリのpathのエントリ一覧から一つエントリを選択させる
 *
 * @param path
 * @param dao
 */
var selectEntry = function (path, dao) { return __awaiter(void 0, void 0, void 0, function () {
    var entries, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Entry_1.makeEntries(path, dao)];
            case 1:
                entries = _a.sent();
                return [4 /*yield*/, prompts_1.default({
                        type: 'select',
                        name: 'index',
                        message: 'select file',
                        choices: entries.map(function (entry, index) {
                            return {
                                title: entry.getDisplayName(),
                                value: String(index),
                            };
                        }),
                    })];
            case 2:
                result = _a.sent();
                return [2 /*return*/, entries[result.index]];
        }
    });
}); };
/**
 * ユーザーにGitHubのリポジトリから生成するファイルを一つ選択させる
 *
 * @param initialDir
 * @param dao
 */
var selectFile = function (initialDir, dao) { return __awaiter(void 0, void 0, void 0, function () {
    var path, entry, entryPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                path = initialDir;
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 3];
                return [4 /*yield*/, selectEntry(path, dao)];
            case 2:
                entry = _a.sent();
                entryPath = entry.getEntryPath();
                if (entry instanceof Entry_1.FileEntry) {
                    return [2 /*return*/, entryPath];
                }
                path = entryPath;
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * ユーザーに出力するファイル名を尋ねる
 */
var askOutputFileName = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prompts_1.default({
                    type: 'text',
                    name: 'outputFileName',
                    message: 'output file name',
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result.outputFileName];
        }
    });
}); };
/**
 * リポジトリ（repositoryName）からユーザーにファイルを選択させ、そのファイルを
 * ローカル端末の任意の場所に生成する
 *
 * @param repositoryName
 * @param initialDir
 */
exports.cloneFileFromGitHub = function (repositoryName, initialDir) { return __awaiter(void 0, void 0, void 0, function () {
    var httpClient, dao, filePath, outputFileName, fileContent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                httpClient = new HttpClient_1.HttpClient();
                dao = new GitHubEntryDao_1.GitHubEntryDao(repositoryName, httpClient);
                return [4 /*yield*/, selectFile(initialDir, dao)];
            case 1:
                filePath = _a.sent();
                return [4 /*yield*/, askOutputFileName()];
            case 2:
                outputFileName = _a.sent();
                return [4 /*yield*/, dao.fetchFile(filePath)];
            case 3:
                fileContent = _a.sent();
                fs_extra_1.outputFileSync(outputFileName, fileContent);
                return [2 /*return*/];
        }
    });
}); };
var main = function () {
    var program = new commander_1.Command();
    program.description('clone file from github').action(function () { return __awaiter(void 0, void 0, void 0, function () {
        var repository, initialDir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (process.env.repository === undefined) {
                        throw new Error('env variable repository is required');
                    }
                    if (process.env.initialDir === undefined) {
                        throw new Error('env variable initialDir is required');
                    }
                    repository = process.env.repository;
                    initialDir = process.env.initialDir;
                    return [4 /*yield*/, exports.cloneFileFromGitHub(repository, initialDir)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    program.parse(process.argv);
};
main();
