"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var Entry = /** @class */ (function () {
    function Entry(name, currentDirectory) {
        this.name = name;
        this.currentDirectory = currentDirectory;
    }
    return Entry;
}());
exports.Entry = Entry;
/**
 * ファイル
 */
var FileEntry = /** @class */ (function (_super) {
    __extends(FileEntry, _super);
    function FileEntry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileEntry.prototype.getDisplayName = function () {
        return this.name;
    };
    FileEntry.prototype.getEntryPath = function () {
        return this.currentDirectory + "/" + this.name;
    };
    return FileEntry;
}(Entry));
exports.FileEntry = FileEntry;
/**
 * ディレクトリ
 */
var DirectoryEntry = /** @class */ (function (_super) {
    __extends(DirectoryEntry, _super);
    function DirectoryEntry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DirectoryEntry.prototype.getDisplayName = function () {
        return this.name + "/";
    };
    DirectoryEntry.prototype.getEntryPath = function () {
        return this.currentDirectory + "/" + this.name;
    };
    return DirectoryEntry;
}(Entry));
exports.DirectoryEntry = DirectoryEntry;
/**
 * １階層上に上がるエントリ
 * （エントリかは微妙だが、ファイル、ディレクトリと並列に扱いたかったのでエントリに含めた）
 */
var PopEntry = /** @class */ (function (_super) {
    __extends(PopEntry, _super);
    function PopEntry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PopEntry.prototype.getDisplayName = function () {
        return this.name;
    };
    PopEntry.prototype.getEntryPath = function () {
        var pathArray = this.currentDirectory.split('/');
        pathArray.pop();
        return pathArray.join('/');
    };
    return PopEntry;
}(Entry));
exports.PopEntry = PopEntry;
/**
 * typeに応じたEntryを生成し返却
 *
 * @param name
 * @param currentDirectory
 * @param type
 */
exports.makeEntry = function (name, currentDirectory, type) {
    if (type === 'file') {
        return new FileEntry(name, currentDirectory);
    }
    if (type === 'dir') {
        return new DirectoryEntry(name, currentDirectory);
    }
    if (type === 'pop') {
        return new PopEntry(name, currentDirectory);
    }
    throw new Error("unknown type " + type + ".");
};
/**
 * リポジトリのpathのエントリ一覧からEntry配列を生成し返却する
 *
 * @param path
 * @param dao
 */
exports.makeEntries = function (path, dao) { return __awaiter(void 0, void 0, void 0, function () {
    var entryObjects;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dao.fetchEntries(path)
                // 親の階層がある際には、親の階層へ行く選択肢を追加
            ];
            case 1:
                entryObjects = _a.sent();
                // 親の階層がある際には、親の階層へ行く選択肢を追加
                if (path.length > 0) {
                    entryObjects.unshift({
                        name: '..',
                        type: 'pop',
                    });
                }
                return [2 /*return*/, entryObjects.map(function (entry) {
                        return exports.makeEntry(entry.name, path, entry.type);
                    })];
        }
    });
}); };
