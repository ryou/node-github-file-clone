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
Object.defineProperty(exports, "__esModule", { value: true });
var Entry = /** @class */ (function () {
    function Entry(name, currentDirectory) {
        this.name = name;
        this.currentDirectory = currentDirectory;
    }
    return Entry;
}());
exports.Entry = Entry;
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
        console.log(pathArray);
        pathArray.pop();
        return pathArray.join('/');
    };
    return PopEntry;
}(Entry));
exports.PopEntry = PopEntry;
exports.generateEntry = function (name, currentDirectory, type) {
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
