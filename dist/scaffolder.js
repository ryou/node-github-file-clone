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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var GitHubEntryDao_1 = require("./dao/GitHubEntryDao");
var prompts_1 = __importDefault(require("prompts"));
var HttpClient_1 = require("./http/HttpClient");
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var Entry_1 = require("./Entry");
var makeEntries = function (path, dao) { return __awaiter(void 0, void 0, void 0, function () {
    var entries;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dao.fetchEntries(path)];
            case 1:
                entries = (_a.sent()).map(function (entry) {
                    return Entry_1.generateEntry(entry.name, path, entry.type);
                });
                if (path.length > 0) {
                    entries = __spreadArrays([new Entry_1.PopEntry('..', path)], entries);
                }
                return [2 /*return*/, entries];
        }
    });
}); };
var selectEntry = function (path, dao) { return __awaiter(void 0, void 0, void 0, function () {
    var entries, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, makeEntries(path, dao)];
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
var selectFile = function (baseDirectory, dao) { return __awaiter(void 0, void 0, void 0, function () {
    var path, entry, entryPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                path = baseDirectory;
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
exports.generateFileFromGitHub = function (outputFileName) { return __awaiter(void 0, void 0, void 0, function () {
    var repositoryName, baseDir, httpClient, dao, filePath, fileContent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (process.env.repository === undefined) {
                    throw new Error('env variable repository is required');
                }
                if (process.env.baseDir === undefined) {
                    throw new Error('env variable baseDir is required');
                }
                repositoryName = process.env.repository;
                baseDir = process.env.baseDir;
                httpClient = new HttpClient_1.HttpClient();
                dao = new GitHubEntryDao_1.GitHubEntryDao(repositoryName, httpClient);
                return [4 /*yield*/, selectFile(baseDir, dao)];
            case 1:
                filePath = _a.sent();
                return [4 /*yield*/, dao.fetchFile(filePath)];
            case 2:
                fileContent = _a.sent();
                fs_extra_1.outputFileSync(outputFileName, fileContent);
                return [2 /*return*/];
        }
    });
}); };
exports.generateEnvFile = function (repositoryName, baseDir) {
    var content = '';
    content += "repository=" + repositoryName + "\n";
    content += "baseDir=" + baseDir + "\n";
    fs_extra_1.outputFileSync(path_1.resolve(__dirname, '../.env'), content);
};
