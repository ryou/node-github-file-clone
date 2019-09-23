#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var fs_extra_1 = require("fs-extra");
var projectInfo_1 = require("./projectInfo");
/**
 * envファイルを生成する
 *
 * @param repositoryName
 * @param initialDir
 */
var generateEnvFile = function (repositoryName, initialDir) {
    var content = '';
    content += "repository=" + repositoryName + "\n";
    content += "initialDir=" + initialDir + "\n";
    fs_extra_1.outputFileSync(projectInfo_1.ENV_PATH, content);
};
var main = function () {
    var program = new commander_1.Command();
    program
        .arguments('<repositoryName>')
        .description('generate env file which contains repository information.')
        .option('--initialDir <baseDir>', '')
        .action(function (repositoryName, _a) {
        var _b = _a.initialDir, initialDir = _b === void 0 ? '' : _b;
        generateEnvFile(repositoryName, initialDir);
    });
    program.parse(process.argv);
};
main();
