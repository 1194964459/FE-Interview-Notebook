/**
 * 基于Babel提取模块间的依赖关系
 */

const fs = require('fs').promises;
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

/**
 * 读取文件并提取其依赖关系
 * @param {string} filePath - 要分析的文件路径
 * @returns {Promise<{file: string, dependencies: string[]}>} - 包含文件路径和依赖数组的对象
 */
async function extractDependencies(filePath) {
    try {
        // 确保文件路径是绝对路径
        const absolutePath = path.resolve(filePath);

        // 读取文件内容
        const code = await fs.readFile(absolutePath, 'utf8');

        // 解析代码生成AST
        const ast = parser.parse(code, {
            sourceType: 'module', // 支持ES模块
            plugins: [  // 支持下面的语法：
                'jsx',          // 支持JSX
                'typescript',   // 支持TypeScript
                'classProperties', // 支持类属性
                'dynamicImport' // 支持动态导入
            ]
        });

        // 存储依赖的数组
        const dependencies = [];
        const fileDir = path.dirname(absolutePath);
        // 遍历AST寻找依赖
        traverse(ast, {
            // 处理ES6 import语句
            ImportDeclaration(p) {
                const sourcePath = p.node.source.value;
                // 解析相对路径为绝对路径
                const resolvedPath = path.resolve(fileDir, sourcePath);
                dependencies.push(resolvedPath);
            },

            // 处理require()调用
            CallExpression(p) {
                // TODO:函数调用的类型/名称、参数个数及类型
                if (
                    p.node.callee.type === 'Identifier' &&
                    p.node.callee.name === 'require' &&
                    p.node.arguments.length > 0 &&
                    p.node.arguments[0].type === 'StringLiteral'
                ) {
                    const sourcePath = p.node.arguments[0].value;

                    // 解析相对路径为绝对路径
                    const resolvedPath = path.resolve(fileDir, sourcePath);
                    dependencies.push(resolvedPath);
                }
            },

            // 处理动态import()
            Import(p) {
                if (
                    p.node.source &&
                    p.node.source.type === 'StringLiteral'
                ) {
                    const sourcePath = p.node.source.value;
                    // 解析相对路径为绝对路径
                    const resolvedPath = path.resolve(fileDir, sourcePath);
                    dependencies.push(resolvedPath);
                }
            }
        });


        // 返回去重后的依赖数组
        const uniqueDependencies = [...new Set(dependencies)];

        return {
            file: absolutePath,
            dependencies: uniqueDependencies
        };
    } catch (error) {
        console.error(`提取依赖时出错 (${filePath}):`, error.message);
        throw error; // 重新抛出错误，让调用者可以处理
    }
}

module.exports = { extractDependencies };
