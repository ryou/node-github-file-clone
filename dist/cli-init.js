#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var githubFileClone_1 = require("./githubFileClone");
var main = function () {
    var program = new commander_1.Command();
    program
        .arguments('<repositoryName>')
        .description('generate env file which contains repository information.')
        .option('--initialDir <baseDir>', '')
        .action(function (repositoryName, _a) {
        var _b = _a.initialDir, initialDir = _b === void 0 ? '' : _b;
        githubFileClone_1.generateEnvFile(repositoryName, initialDir);
    });
    program.parse(process.argv);
};
main();
