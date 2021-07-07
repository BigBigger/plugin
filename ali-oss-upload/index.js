/*
 * @Description  : auto upload to ali oss
 * @Author       : BigBigger
 * @Date         : 2021-07-06 10:24:34
 * @LastEditTime : 2021-07-07 11:23:52
 * @LastEditors  : BigBigger
 */
'use strict';

const { URL } = require('url');
const globby = require('globby');
const OSS = require('ali-oss');
const chalk = require('chalk');
const path = require('path');

class AliOSSUpload {
	constructor(options = {}, putOption = {}) {
		const { from, ...ossConfig } = options;
		this.config = { from };
		this.client = new OSS(ossConfig);
		this.getPutOption = function (filepath) {
			if (typeof putOption === "function") {
				const filename = path.basename(filepath);
				putOption(filename, filepath);
			}
			return putOption;
		}
	}

	async upload({compilation: { compiler }}) {
		// get oss path prefix form public path
		let pathname = '';
		try {
			const {
				protocol,
				hostname,
				pathname: _pathname,
			} = new URL(compiler.options.output.publicPath);
			if (!protocol || !hostname) {
				throw new Error(
					'[output.publicPath]: must to be domain name, eq: https://xxx.oss-cn-hangzhou.aliyuncs.com/path',
				);
			}
			pathname = _pathname.endsWith('/')
				? _pathname.substring(0, _pathname.length - 1)
				: _pathname;
		} catch (error) {
			// not url
			throw new Error(error);
		}
		const { from = compiler.options.output.path } = this.config;
		const files = await globby(from);
		// no file
		if (!files.length)
			return console.log(chalk.yellow('no file to upload\n'));
		try {
			// remove public path prefix
			const replaceArr = []
				.concat(from)
				.filter((i) => !i.includes('!'))
				.map((i) => path.posix.resolve(i).split('/*').shift());
			// upload file
			for (let filePath of files) {
				const ossFilePath =
					pathname +
					replaceArr.reduce(
						(pre, cur) => pre.replace(cur, ''),
						path.posix.resolve(filePath),
					);
				const result = await this.client.put(
					ossFilePath,
					filePath,
					this.getPutOption(filePath),
				);
				// upload success
				console.log(
					chalk.blue(filePath),
					`upload`,
					chalk.green('success'),
					'url =>',
					chalk.blue(result.url),
				);
			}
		} catch (err) {
			console.log(
				chalk.red(
					`failed to upload: ${err.name}-${err.code}: ${err.message}\n`,
				),
			);
		}
	}

	async apply(compiler) {
		// if modern mode, only run after last build
		if (!process.env.VUE_CLI_MODERN_MODE || process.env.VUE_CLI_MODERN_BUILD)
			compiler.hooks.done.tapPromise('AliOSSUpload', async (compilation) => this.upload(compilation));
	}
}

module.exports = AliOSSUpload;